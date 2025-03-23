"use client";

import type React from "react";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { VoiceInput } from "@/src/components/voice-input";
import { LanguageSelector } from "@/src/components/language-selector";
import { AIAnalysisService } from "@/src/components/ai-analysis-service";
import { AIConversationGuide } from "@/src/components/ai-conversation-guide";
import {
  LucideArrowLeft,
  LucideUpload,
  LucideCheck,
  LucideInfo,
  LucideBrain,
  LucideMessageSquare,
} from "lucide-react";
import { ConversationalAI } from "@/src/components/ConversationalAI";
import { useCase } from "@/src/contexts/CaseContext";

export default function NewPatientCase() {
  const router = useRouter();
  const { setCurrentCase } = useCase();
  const [step, setStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);
  const [inputMethod, setInputMethod] = useState<"manual" | "guided">("guided");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const [languageCode, setLanguageCode] = useState("en-US");

  // Form data
  const [primaryConcern, setPrimaryConcern] = useState("");
  const [symptomDuration, setSymptomDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("days");
  const [additionalSymptoms, setAdditionalSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [otherGender, setOtherGender] = useState("");
  const [medications, setMedications] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create the case data
    const caseData = {
      primaryConcern,
      symptomDuration: parseInt(symptomDuration),
      durationUnit,
      additionalSymptoms,
      age: parseInt(age),
      gender,
      otherGender: gender === "other" ? otherGender : null,
      preExistingConditions: conditions.join(", "),
    };

    // Store the case data in the global state
    setCurrentCase(caseData);

    // In a real app, this would submit the form data to the server
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/patient/confirmation");
  };

  const handleAiAnalysis = () => {
    setShowAiAnalysis(true);
  };

  const handleAnalysisComplete = (result: any) => {
    setAiAnalysisResult(result);
    console.log("AI Analysis Result:", result);
  };

  const handleConversationComplete = (responses: Record<string, string>) => {
    console.log("Conversation responses:", responses);

    // Update form with conversation responses
    if (responses.greeting) {
      setPrimaryConcern(responses.greeting);
    }

    if (responses.duration) {
      // Try to extract a number and unit from the duration response
      const durationText = responses.duration.toLowerCase();
      const numberMatch = durationText.match(/\d+/);

      if (numberMatch) {
        setSymptomDuration(numberMatch[0]);

        if (durationText.includes("week")) {
          setDurationUnit("weeks");
        } else if (durationText.includes("month")) {
          setDurationUnit("months");
        } else if (durationText.includes("year")) {
          setDurationUnit("years");
        } else {
          setDurationUnit("days");
        }
      }
    }

    // Combine other responses into additional symptoms
    const otherInfo = [
      responses.severity ? `Severity: ${responses.severity}/10` : "",
      responses.triggers ? `Triggers: ${responses.triggers}` : "",
      responses["previous-treatment"]
        ? `Previous treatments: ${responses["previous-treatment"]}`
        : "",
      responses["medical-history"]
        ? `Medical history: ${responses["medical-history"]}`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    setAdditionalSymptoms(otherInfo);

    // Switch back to manual input to review
    setInputMethod("manual");
  };

  const handleFormComplete = (responses: any) => {
    console.log("Form complete with responses:", responses);
    // Update form fields with responses
    setPrimaryConcern(responses.primaryConcern || "");
    setSymptomDuration(responses.symptomDuration || "");
    setAge(responses.age || "");
    setGender(responses.gender || "");
    setOtherGender(responses.otherGender || "");
    // Handle conditions array properly
    setConditions(
      Array.isArray(responses.preExistingConditions)
        ? responses.preExistingConditions
        : responses.preExistingConditions
        ? responses.preExistingConditions.split(", ")
        : []
    );
    setMedications(responses.medications || "");
    setAllergies(responses.allergies || "");

    // Mark conversation as complete
    setIsConversationComplete(true);
    // Set input method to manual for review
    setInputMethod("manual");
    // Skip step 2 and go directly to step 3 (review)
    setStep(3);
  };

  return (
    <div className="container max-w-4xl py-8 px-4 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm">
          <LucideArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <LanguageSelector
          size="sm"
          className="rounded-full"
          onLanguageChange={setLanguageCode}
        />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">
          Submit Your Health Concern
        </h1>
        <p className="text-muted-foreground mt-2">
          Share your symptoms and concerns to receive guidance from medical
          professionals.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 1 ? <LucideCheck className="h-4 w-4" /> : "1"}
          </div>
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>
            Symptoms
          </span>
        </div>
        <div className="h-px w-12 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 2 ? <LucideCheck className="h-4 w-4" /> : "2"}
          </div>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>
            Medical History
          </span>
        </div>
        <div className="h-px w-12 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 3
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 3 ? <LucideCheck className="h-4 w-4" /> : "3"}
          </div>
          <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>
            Review
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {isSubmitting ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="mb-4">
                  <div className="gemini-stars mb-2">
                    <div className="gemini-star"></div>
                    <div className="gemini-star"></div>
                    <div className="gemini-star"></div>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Processing your information
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Please wait while we process your information...
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Describe Your Symptoms</CardTitle>
                  <CardDescription>
                    Please provide detailed information about your current
                    health concerns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs
                    value={inputMethod}
                    onValueChange={(value) =>
                      setInputMethod(value as "manual" | "guided")
                    }
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger
                        value="guided"
                        className="flex items-center gap-2"
                      >
                        <LucideBrain className="h-4 w-4" />
                        AI-Guided
                      </TabsTrigger>
                      <TabsTrigger
                        value="manual"
                        className="flex items-center gap-2"
                      >
                        <LucideMessageSquare className="h-4 w-4" />
                        Manual Input
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="guided" className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <LucideInfo className="h-4 w-4" />
                          <p>
                            Click the microphone button to start speaking. The
                            AI will guide you through providing your symptoms
                            and medical history.
                          </p>
                        </div>
                        <ConversationalAI
                          languageCode={languageCode}
                          onFormComplete={handleFormComplete}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="manual">
                      <div className="space-y-2">
                        <Label htmlFor="primary-concern">
                          What is your primary health concern?
                        </Label>
                        <VoiceInput
                          id="primary-concern"
                          placeholder="Describe your main symptom or concern"
                          rows={3}
                          value={primaryConcern}
                          onChange={setPrimaryConcern}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="symptom-duration">
                          How long have you been experiencing these symptoms?
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            id="symptom-duration"
                            type="number"
                            placeholder="Duration"
                            min="1"
                            value={symptomDuration}
                            onChange={(e) => setSymptomDuration(e.target.value)}
                            required
                          />
                          <RadioGroup
                            defaultValue="days"
                            className="flex"
                            value={durationUnit}
                            onValueChange={setDurationUnit}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="days" id="days" />
                              <Label htmlFor="days">Days</Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <RadioGroupItem value="weeks" id="weeks" />
                              <Label htmlFor="weeks">Weeks</Label>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                              <RadioGroupItem value="months" id="months" />
                              <Label htmlFor="months">Months</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-symptoms">
                          Do you have any additional symptoms?
                        </Label>
                        <VoiceInput
                          id="additional-symptoms"
                          placeholder="List any other symptoms you're experiencing"
                          rows={3}
                          value={additionalSymptoms}
                          onChange={setAdditionalSymptoms}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label>Upload relevant images (optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <LucideUpload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop images or click to browse
                      </p>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Select Files
                      </Button>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {uploadedImages.map((img, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden"
                          >
                            <img
                              src={
                                URL.createObjectURL(img) || "/placeholder.svg"
                              }
                              alt={`Uploaded image ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {primaryConcern && (
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <LucideBrain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">AI Preliminary Analysis</h3>
                      </div>

                      {!showAiAnalysis ? (
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">
                            Our AI can analyze your symptoms to provide
                            preliminary insights before your case is reviewed by
                            medical professionals.
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAiAnalysis}
                            className="w-full"
                          >
                            <LucideBrain className="mr-2 h-4 w-4" />
                            Run AI Analysis
                          </Button>
                        </div>
                      ) : (
                        <AIAnalysisService
                          symptoms={primaryConcern}
                          additionalInfo={additionalSymptoms}
                          images={uploadedImages}
                          onAnalysisComplete={handleAnalysisComplete}
                        />
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!primaryConcern || !symptomDuration}
                  >
                    Continue to Medical History
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>
                    This information helps clinicians provide more accurate
                    guidance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      min="0"
                      max="120"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <RadioGroup
                      defaultValue="female"
                      value={gender}
                      onValueChange={setGender}
                    >
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-binary" id="non-binary" />
                          <Label htmlFor="non-binary">Non-binary</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </div>
                    </RadioGroup>
                    {gender === "other" && (
                      <Input
                        placeholder="Please specify"
                        value={otherGender}
                        onChange={(e) => setOtherGender(e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Do you have any of the following conditions?</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "diabetes",
                        "hypertension",
                        "heart-disease",
                        "asthma",
                        "cancer",
                        "autoimmune",
                      ].map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={condition}
                            checked={conditions.includes(condition)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setConditions([...conditions, condition]);
                              } else {
                                setConditions(
                                  conditions.filter((c) => c !== condition)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={condition}>
                            {condition
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      placeholder="List any medications you're currently taking"
                      rows={3}
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      placeholder="List any allergies you have"
                      rows={2}
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={
                      !age || !gender || (gender === "other" && !otherGender)
                    }
                  >
                    Continue to Review
                  </Button>
                </CardFooter>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Information</CardTitle>
                  <CardDescription>
                    Please review the information you've provided before
                    submitting.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-muted p-4 flex items-start gap-3">
                    <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Important Information
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        The guidance you receive is not a medical diagnosis.
                        Always consult with your healthcare provider for
                        official medical advice.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Symptoms</h3>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm">
                          Primary concern: {primaryConcern}
                        </p>
                        <p className="text-sm mt-2">
                          Duration: {symptomDuration} {durationUnit}
                        </p>
                        <p className="text-sm mt-2">
                          Additional symptoms: {additionalSymptoms || "None"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Medical History
                      </h3>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm">Age: {age}</p>
                        <p className="text-sm mt-2">
                          Gender: {gender === "other" ? otherGender : gender}
                        </p>
                        <p className="text-sm mt-2">
                          Conditions: {conditions.join(", ") || "None"}
                        </p>
                        <p className="text-sm mt-2">
                          Medications: {medications || "None"}
                        </p>
                        <p className="text-sm mt-2">
                          Allergies: {allergies || "None"}
                        </p>
                      </div>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          Uploaded Images ({uploadedImages.length})
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {uploadedImages.map((img, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-md overflow-hidden"
                            >
                              <img
                                src={
                                  URL.createObjectURL(img) || "/placeholder.svg"
                                }
                                alt={`Uploaded image ${index + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiAnalysisResult && (
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          AI Analysis Results
                        </h3>
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <LucideBrain className="h-4 w-4 text-primary" />
                            <p className="text-sm font-medium">
                              Preliminary Assessment
                            </p>
                          </div>

                          {aiAnalysisResult.differentialDiagnosis && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground mb-1">
                                Possible conditions:
                              </p>
                              <ul className="text-sm space-y-1">
                                {aiAnalysisResult.differentialDiagnosis
                                  .slice(0, 3)
                                  .map((diagnosis: any, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-center gap-1"
                                    >
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                      <span>
                                        {diagnosis.condition} (
                                        {diagnosis.confidence})
                                      </span>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {aiAnalysisResult.suggestedTests && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground">
                                This is a preliminary AI assessment only.
                                Medical professionals will review your case.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="consent" required />
                      <Label htmlFor="consent" className="text-sm">
                        I consent to sharing this anonymized information with
                        medical professionals for guidance purposes.
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button type="submit">Submit Case</Button>
                </CardFooter>
              </Card>
            )}
          </>
        )}
      </form>
    </div>
  );
}

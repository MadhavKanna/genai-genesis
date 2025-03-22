"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoiceInput } from "@/components/voice-input"
import { LanguageSelector } from "@/components/language-selector"
import { AIAnalysisService } from "@/components/ai-analysis-service"
import { AIConversationGuide } from "@/components/ai-conversation-guide"
import { LucideArrowLeft, LucideUpload, LucideCheck, LucideInfo, LucideBrain, LucideMessageSquare } from "lucide-react"

export default function NewPatientCase() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [showAiAnalysis, setShowAiAnalysis] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)
  const [inputMethod, setInputMethod] = useState<"manual" | "guided">("manual")

  // Form data
  const [primaryConcern, setPrimaryConcern] = useState("")
  const [symptomDuration, setSymptomDuration] = useState("")
  const [durationUnit, setDurationUnit] = useState("days")
  const [additionalSymptoms, setAdditionalSymptoms] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files)
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    router.push("/patient/confirmation")
  }

  const handleAiAnalysis = () => {
    setShowAiAnalysis(true)
  }

  const handleAnalysisComplete = (result: any) => {
    setAiAnalysisResult(result)
    console.log("AI Analysis Result:", result)
  }

  const handleConversationComplete = (responses: Record<string, string>) => {
    console.log("Conversation responses:", responses)

    // Update form with conversation responses
    if (responses.greeting) {
      setPrimaryConcern(responses.greeting)
    }

    if (responses.duration) {
      // Try to extract a number and unit from the duration response
      const durationText = responses.duration.toLowerCase()
      const numberMatch = durationText.match(/\d+/)

      if (numberMatch) {
        setSymptomDuration(numberMatch[0])

        if (durationText.includes("week")) {
          setDurationUnit("weeks")
        } else if (durationText.includes("month")) {
          setDurationUnit("months")
        } else if (durationText.includes("year")) {
          setDurationUnit("years")
        } else {
          setDurationUnit("days")
        }
      }
    }

    // Combine other responses into additional symptoms
    const otherInfo = [
      responses.severity ? `Severity: ${responses.severity}/10` : "",
      responses.triggers ? `Triggers: ${responses.triggers}` : "",
      responses["previous-treatment"] ? `Previous treatments: ${responses["previous-treatment"]}` : "",
      responses["medical-history"] ? `Medical history: ${responses["medical-history"]}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")

    setAdditionalSymptoms(otherInfo)

    // Switch back to manual input to review
    setInputMethod("manual")
  }

  return (
    <div className="container max-w-4xl py-8 px-4 md:py-12">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm">
          <LucideArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <LanguageSelector size="sm" className="rounded-full" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Submit Your Health Concern</h1>
        <p className="text-muted-foreground mt-2">
          Share your symptoms and concerns to receive guidance from medical professionals.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 1 ? <LucideCheck className="h-4 w-4" /> : "1"}
          </div>
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Symptoms</span>
        </div>
        <div className="h-px w-12 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 2 ? <LucideCheck className="h-4 w-4" /> : "2"}
          </div>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Medical History</span>
        </div>
        <div className="h-px w-12 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {step > 3 ? <LucideCheck className="h-4 w-4" /> : "3"}
          </div>
          <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>Please provide detailed information about your current health concerns.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs
                value={inputMethod}
                onValueChange={(value) => setInputMethod(value as "manual" | "guided")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="manual" className="flex items-center gap-2">
                    <LucideMessageSquare className="h-4 w-4" />
                    Manual Input
                  </TabsTrigger>
                  <TabsTrigger value="guided" className="flex items-center gap-2">
                    <LucideBrain className="h-4 w-4" />
                    AI-Guided
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-concern">What is your primary health concern?</Label>
                    <VoiceInput
                      id="primary-concern"
                      placeholder="Describe your main symptom or concern"
                      rows={3}
                      value={primaryConcern}
                      onChange={setPrimaryConcern}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="symptom-duration">How long have you been experiencing these symptoms?</Label>
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
                    <Label htmlFor="additional-symptoms">Do you have any additional symptoms?</Label>
                    <VoiceInput
                      id="additional-symptoms"
                      placeholder="List any other symptoms you're experiencing"
                      rows={3}
                      value={additionalSymptoms}
                      onChange={setAdditionalSymptoms}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="guided">
                  <AIConversationGuide onComplete={handleConversationComplete} />
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label>Upload relevant images (optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <LucideUpload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop images or click to browse</p>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Select Files
                  </Button>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img
                          src={URL.createObjectURL(img) || "/placeholder.svg"}
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
                        Our AI can analyze your symptoms to provide preliminary insights before your case is reviewed by
                        medical professionals.
                      </p>
                      <Button type="button" variant="outline" size="sm" onClick={handleAiAnalysis} className="w-full">
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
              <Button type="button" onClick={() => setStep(2)}>
                Continue to Medical History
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
              <CardDescription>This information helps clinicians provide more accurate guidance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="Your age" min="0" max="120" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <RadioGroup defaultValue="female">
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
              </div>

              <div className="space-y-2">
                <Label>Do you have any of the following conditions?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="diabetes" />
                    <Label htmlFor="diabetes">Diabetes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hypertension" />
                    <Label htmlFor="hypertension">Hypertension</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="heart-disease" />
                    <Label htmlFor="heart-disease">Heart Disease</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="asthma" />
                    <Label htmlFor="asthma">Asthma</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cancer" />
                    <Label htmlFor="cancer">Cancer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="autoimmune" />
                    <Label htmlFor="autoimmune">Autoimmune Disorder</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea id="medications" placeholder="List any medications you're currently taking" rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea id="allergies" placeholder="List any allergies you have" rows={2} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Continue to Review
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review Your Information</CardTitle>
              <CardDescription>Please review the information you've provided before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4 flex items-start gap-3">
                <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Important Information</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    The guidance you receive is not a medical diagnosis. Always consult with your healthcare provider
                    for official medical advice.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Symptoms</h3>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">Primary concern: {primaryConcern || "[Sample symptom description]"}</p>
                    <p className="text-sm mt-2">
                      Duration: {symptomDuration || "2"} {durationUnit || "weeks"}
                    </p>
                    <p className="text-sm mt-2">
                      Additional symptoms: {additionalSymptoms || "[Sample additional symptoms]"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Medical History</h3>
                  <div className="rounded-lg border p-3">
                    <p className="text-sm">Age: 35</p>
                    <p className="text-sm mt-2">Gender: Female</p>
                    <p className="text-sm mt-2">Conditions: Asthma</p>
                    <p className="text-sm mt-2">Medications: [Sample medications]</p>
                    <p className="text-sm mt-2">Allergies: [Sample allergies]</p>
                  </div>
                </div>

                {uploadedImages.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Uploaded Images ({uploadedImages.length})</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                          <img
                            src={URL.createObjectURL(img) || "/placeholder.svg"}
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
                    <h3 className="text-sm font-medium mb-2">AI Analysis Results</h3>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <LucideBrain className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium">Preliminary Assessment</p>
                      </div>

                      {aiAnalysisResult.differentialDiagnosis && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Possible conditions:</p>
                          <ul className="text-sm space-y-1">
                            {aiAnalysisResult.differentialDiagnosis.slice(0, 3).map((diagnosis: any, index: number) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                                <span>
                                  {diagnosis.condition} ({diagnosis.confidence})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {aiAnalysisResult.suggestedTests && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            This is a preliminary AI assessment only. Medical professionals will review your case.
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
                    I consent to sharing this anonymized information with medical professionals for guidance purposes.
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
                    <Link href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit">Submit Case</Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  )
}


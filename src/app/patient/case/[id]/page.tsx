"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";
import { Progress } from "@/src/components/ui/progress";
import {
  LucideArrowLeft,
  LucideCalendar,
  LucideUsers,
  LucideFileText,
  LucideMessageSquare,
  LucideDownload,
  LucideExternalLink,
  LucideThumbsUp,
  LucideThumbsDown,
  LucideAlertCircle,
  LucideCheck,
  LucideGlobe,
} from "lucide-react";

import { LanguageSelector } from "@/src/components/language-selector";
import { LiveChat } from "@/src/components/live-chat";
import { AIVisualAnalysis } from "@/src/components/ai-visual-analysis";
import { MedicalTermInfo } from "@/src/components/medical-term-info";
import { useCase } from "@/src/contexts/CaseContext";
import React from "react";

// Define interfaces for the case data structure
interface CaseImage {
  id: string;
  url: string;
  description: string;
  timestamp: string;
}

interface Clinician {
  id: number;
  name: string;
  specialty: string;
  country: string;
  avatar: string;
}

interface ClinicianNote {
  id: string;
  clinician: string;
  specialty: string;
  avatar: string;
  date: string;
  note: string;
}

interface CaseSummary {
  possibleCauses: string[];
  recommendedTests: string[];
  suggestedTreatments: string[];
  lifestyle: string[];
}

interface MedicalHistory {
  conditions: string[];
  medications: string[];
  allergies: string[];
}

interface CaseData {
  id: string;
  title: string;
  status: "completed" | "in_progress";
  submittedDate: string;
  completedDate?: string;
  primaryConcern: string;
  duration: string;
  durationUnit: string;
  additionalSymptoms: string;
  medicalHistory: MedicalHistory;
  images: CaseImage[];
  clinicians: Clinician[];
  clinicianNotes: ClinicianNote[];
  summary?: CaseSummary;
}

export default function CasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { cases } = useCase();
  const [activeTab, setActiveTab] = useState("summary");
  const resolvedParams = React.use(params);

  // Find the current case from the cases array
  const currentCase = cases.find((c) => c.id === resolvedParams.id);

  // Mock data for previous cases
  const mockCaseData: CaseData = {
    id: "case-001",
    title: "Lower Back Pain",
    status: "completed",
    submittedDate: "April 22, 2023",
    completedDate: "April 28, 2023",
    primaryConcern: "Chronic lower back pain, worse in the morning",
    duration: "6",
    durationUnit: "months",
    additionalSymptoms: "Stiffness in the morning, pain radiating to right leg",
    medicalHistory: {
      conditions: ["Hypertension", "Arthritis"],
      medications: ["Lisinopril", "Ibuprofen"],
      allergies: ["Penicillin"],
    },
    images: [
      {
        id: "1",
        url: "/placeholder.svg",
        description: "Lower back X-ray",
        timestamp: "2023-04-22T10:00:00",
      },
      {
        id: "2",
        url: "/placeholder.svg",
        description: "MRI scan",
        timestamp: "2023-04-23T11:00:00",
      },
    ],
    clinicians: [
      {
        id: 1,
        name: "Dr. Thomas Smith",
        specialty: "Orthopedics",
        country: "United States",
        avatar: "TS",
      },
      {
        id: 2,
        name: "Dr. Maria Rodriguez",
        specialty: "Physical Medicine",
        country: "Spain",
        avatar: "MR",
      },
    ],
    clinicianNotes: [
      {
        id: "note-001",
        clinician: "Dr. Thomas Smith",
        specialty: "Orthopedics",
        avatar: "TS",
        date: "April 23, 2023",
        note: "Patient presents with chronic lower back pain...",
      },
    ],
    summary: {
      possibleCauses: ["Herniated disc", "Muscle strain", "Arthritis"],
      recommendedTests: ["MRI", "X-ray", "Physical examination"],
      suggestedTreatments: ["Physical therapy", "Pain medication", "Exercise"],
      lifestyle: ["Regular stretching", "Proper posture", "Weight management"],
    },
  };

  // Use the current case data if available, otherwise use mock data
  const currentCaseData = currentCase
    ? {
        ...mockCaseData,
        id: currentCase.id,
        title: currentCase.primaryConcern,
        status: "in_progress",
        submittedDate: currentCase.createdAt
          ? new Date(currentCase.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString(),
        primaryConcern: currentCase.primaryConcern,
        duration: currentCase.symptomDuration.toString(),
        durationUnit: currentCase.durationUnit,
        additionalSymptoms: currentCase.additionalSymptoms,
        medicalHistory: {
          conditions: [currentCase.preExistingConditions],
          medications: [],
          allergies: [],
        },
        images: [],
        clinicians: [
          {
            id: 1,
            name: "Dr. Thomas Smith",
            specialty: "General Medicine",
            country: "United States",
            avatar: "TS",
          },
        ],
        clinicianNotes: [],
      }
    : mockCaseData;

  const isCompleted = currentCaseData.status === "completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white border-b">
        <div className="container py-4">
          <div className="flex justify-between items-center mb-2">
            <Link
              href="/patient/dashboard"
              className="inline-flex items-center gap-1 text-sm"
            >
              <LucideArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <LanguageSelector size="sm" className="rounded-full" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{currentCaseData.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>Case ID: #{currentCaseData.id}</span>
                <span>•</span>
                <div className="flex items-center">
                  <LucideCalendar className="h-3 w-3 mr-1" />
                  <span>Submitted: {currentCaseData.submittedDate}</span>
                </div>
                {isCompleted && (
                  <>
                    <span>•</span>
                    <div className="flex items-center">
                      <LucideCheck className="h-3 w-3 mr-1" />
                      <span>Completed: {currentCaseData.completedDate}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Badge
              className={`${
                isCompleted ? "bg-secondary" : "bg-gemini-yellow-gradient"
              }`}
            >
              {isCompleted ? "Completed" : "In Review"}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs
              defaultValue="summary"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="clinicians">Clinician Notes</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-6">
                {isCompleted ? (
                  <>
                    <Card className="gemini-card border-none">
                      <CardHeader>
                        <CardTitle>Guidance Summary</CardTitle>
                        <CardDescription>
                          Aggregated insights from{" "}
                          {currentCaseData.clinicians.length} medical
                          professionals
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Possible Causes
                          </h3>
                          <ul className="space-y-2">
                            {currentCaseData.summary?.possibleCauses.map(
                              (cause: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                  </div>
                                  <MedicalTermInfo term={cause}>
                                    <span>{cause}</span>
                                  </MedicalTermInfo>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Recommended Tests
                          </h3>
                          <ul className="space-y-2">
                            {currentCaseData.summary?.recommendedTests.map(
                              (test: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="h-5 w-5 flex-shrink-0 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-secondary"></div>
                                  </div>
                                  <MedicalTermInfo term={test}>
                                    <span>{test}</span>
                                  </MedicalTermInfo>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Suggested Treatments
                          </h3>
                          <ul className="space-y-2">
                            {currentCaseData.summary?.suggestedTreatments.map(
                              (treatment: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="h-5 w-5 flex-shrink-0 rounded-full bg-warning/10 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                                  </div>
                                  <MedicalTermInfo term={treatment}>
                                    <span>{treatment}</span>
                                  </MedicalTermInfo>
                                </li>
                              )
                            )}
                          </ul>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-sm font-medium mb-2">
                            Lifestyle Recommendations
                          </h3>
                          <ul className="space-y-2">
                            {currentCaseData.summary?.lifestyle.map(
                              (item: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="h-5 w-5 flex-shrink-0 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-destructive"></div>
                                  </div>
                                  <MedicalTermInfo term={item}>
                                    <span>{item}</span>
                                  </MedicalTermInfo>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col gap-3">
                        <div className="rounded-lg bg-muted p-4 w-full">
                          <div className="flex items-start gap-3">
                            <LucideAlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">
                                Important Disclaimer
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                This guidance is not a medical diagnosis. Always
                                consult with your healthcare provider before
                                making any changes to your treatment plan.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 w-full">
                          <Button
                            className="flex-1 rounded-full"
                            variant="outline"
                          >
                            <LucideDownload className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <Button className="flex-1 rounded-full">
                            <LucideExternalLink className="mr-2 h-4 w-4" />
                            Share with Doctor
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>

                    <AIVisualAnalysis
                      images={currentCaseData.images}
                      symptoms={[
                        currentCaseData.primaryConcern,
                        currentCaseData.additionalSymptoms,
                      ]}
                    />

                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-medium">
                        Was this guidance helpful?
                      </h3>
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full">
                          <LucideThumbsUp className="mr-2 h-4 w-4" />
                          Yes, it was helpful
                        </Button>
                        <Button variant="outline" className="rounded-full">
                          <LucideThumbsDown className="mr-2 h-4 w-4" />
                          No, not really
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Card className="gemini-card border-none">
                    <CardHeader>
                      <CardTitle>Case in Progress</CardTitle>
                      <CardDescription>
                        Your case is currently being reviewed by medical
                        professionals
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Case Progress</span>
                          <span>0/1 clinicians reviewed</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-start gap-3">
                          <LucideCalendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">
                              Estimated Completion
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your guidance report should be ready within 24
                              hours
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <div className="flex -space-x-2">
                          <Avatar className="border-2 border-background h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              DR
                            </AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background h-8 w-8">
                            <AvatarFallback className="bg-secondary text-secondary-foreground">
                              JM
                            </AvatarFallback>
                          </Avatar>
                          <Avatar className="border-2 border-background h-8 w-8">
                            <AvatarFallback className="bg-warning text-warning-foreground">
                              KL
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                            +2
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          <LucideUsers className="h-3 w-3 mr-1" />
                          Matched with 1 clinician
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Case Details</CardTitle>
                    <CardDescription>
                      Information you provided when submitting this case
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">
                          Primary Concern
                        </h3>
                        <p className="text-sm">
                          {currentCaseData.primaryConcern}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Duration</h3>
                        <p className="text-sm">
                          {currentCaseData.duration}{" "}
                          {currentCaseData.durationUnit}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">
                          Additional Symptoms
                        </h3>
                        <p className="text-sm">
                          {currentCaseData.additionalSymptoms}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Medical History
                      </h3>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">
                            Existing Conditions
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {currentCaseData.medicalHistory.conditions.map(
                              (condition: string, index: number) => (
                                <Badge key={index} variant="outline">
                                  {condition}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">
                            Current Medications
                          </h4>
                          <p className="text-sm">
                            {currentCaseData.medicalHistory.medications.join(
                              ", "
                            )}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">
                            Allergies
                          </h4>
                          <p className="text-sm">
                            {currentCaseData.medicalHistory.allergies.join(
                              ", "
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Uploaded Images
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {currentCaseData.images.map(
                          (image: CaseImage, index: number) => (
                            <div key={index} className="space-y-1">
                              <div className="aspect-square rounded-md overflow-hidden border">
                                <img
                                  src={image.url || "/placeholder.svg"}
                                  alt={
                                    image.description || `Image ${index + 1}`
                                  }
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <p className="text-xs text-center text-muted-foreground">
                                {image.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clinicians" className="space-y-6">
                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Clinician Notes</CardTitle>
                    <CardDescription>
                      Individual assessments from medical professionals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {currentCaseData.clinicianNotes.map(
                      (note: ClinicianNote, index: number) => (
                        <div key={note.id} className="p-4 rounded-lg border">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {note.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {note.clinician}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {note.specialty}
                              </div>
                            </div>
                            <div className="ml-auto text-xs text-muted-foreground">
                              {note.date}
                            </div>
                          </div>
                          <p className="text-sm">{note.note}</p>
                          {index <
                            currentCaseData.clinicianNotes.length - 1 && (
                            <Separator className="mt-4" />
                          )}
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <LiveChat
                  caseId={resolvedParams.id}
                  userRole="patient"
                  userName="Jane Patient"
                  userAvatar="JP"
                  otherPartyName="Dr. Thomas Smith"
                  otherPartyAvatar="TS"
                  className="h-[600px]"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>Clinician Team</CardTitle>
                <CardDescription>
                  Medical professionals reviewing your case
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentCaseData.clinicians.map((clinician: Clinician) => (
                  <div key={clinician.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {clinician.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{clinician.name}</div>
                      <div className="text-xs flex items-center gap-1 text-muted-foreground">
                        {clinician.specialty} •
                        <LucideGlobe className="h-3 w-3 ml-1" />
                        {clinician.country}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about your case or guidance report, our
                  support team is here to help.
                </p>
                <Button className="w-full rounded-full">
                  <LucideMessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>

            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>Case Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LucideFileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">Case Submission</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <LucideDownload className="h-4 w-4" />
                  </Button>
                </div>

                {isCompleted && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <LucideFileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Guidance Report</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <LucideDownload className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

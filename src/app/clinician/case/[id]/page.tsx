"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { VoiceInput } from "@/components/voice-input"
import { LanguageSelector } from "@/components/language-selector"
import { LiveChat } from "@/components/live-chat"
import { AIVisualAnalysis } from "@/components/ai-visual-analysis"
import { analyzeSymptoms } from "@/lib/gemini-api"

import { LucideArrowLeft, LucideCalendar, LucideAlertCircle, LucideBrain, LucideSend } from "lucide-react"

export default function ClinicianCasePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [assessment, setAssessment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null)

  // Sample data - in a real app, this would come from an API
  const caseData = {
    id: params.id,
    title: "Persistent Skin Rash",
    status: "pending",
    submittedDate: "May 15, 2023",
    matchedDate: "May 16, 2023",
    primaryConcern:
      "Itchy rash on arms and torso that has been spreading over the past two weeks. The rash is red, raised, and extremely itchy, especially at night.",
    duration: "2 weeks",
    additionalSymptoms:
      "Mild fever (99.5°F), fatigue, and some swelling around the rash areas. The itching worsens after showering.",
    medicalHistory: {
      age: 34,
      gender: "Female",
      conditions: ["Seasonal allergies", "Eczema (childhood)"],
      medications: ["Loratadine 10mg as needed for allergies"],
      allergies: ["Penicillin"],
    },
    images: [
      { id: 1, description: "Rash on right forearm", url: "/placeholder.svg?height=300&width=300" },
      { id: 2, description: "Rash on torso", url: "/placeholder.svg?height=300&width=300" },
      { id: 3, description: "Close-up of rash", url: "/placeholder.svg?height=300&width=300" },
    ],
    aiAnalysis: null,
    otherClinicians: [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Dermatology", status: "Reviewing", avatar: "SJ" },
      { id: 2, name: "Dr. Michael Chen", specialty: "Allergy & Immunology", status: "Pending", avatar: "MC" },
    ],
  }

  // Run AI analysis when the component loads
  useEffect(() => {
    const runAiAnalysis = async () => {
      if (aiAnalysisResult) return // Skip if we already have results

      setIsAnalyzing(true)

      try {
        // Combine symptoms for analysis
        const symptoms = `
          Primary Concern: ${caseData.primaryConcern}
          Duration: ${caseData.duration}
          Additional Symptoms: ${caseData.additionalSymptoms}
          Medical History: 
          - Age: ${caseData.medicalHistory.age}
          - Gender: ${caseData.medicalHistory.gender}
          - Conditions: ${caseData.medicalHistory.conditions.join(", ")}
          - Medications: ${caseData.medicalHistory.medications.join(", ")}
          - Allergies: ${caseData.medicalHistory.allergies.join(", ")}
        `

        // For demo purposes, we're just analyzing the text
        // In a real app, you would also analyze the images
        const result = await analyzeSymptoms(symptoms)

        console.log("AI Analysis Result:", result)
        setAiAnalysisResult(result)
      } catch (error) {
        console.error("Error running AI analysis:", error)
      } finally {
        setIsAnalyzing(false)
      }
    }

    runAiAnalysis()
  }, [aiAnalysisResult])

  const handleSubmit = () => {
    if (!assessment.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/clinician/dashboard?submitted=true")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white border-b">
        <div className="container py-4">
          <div className="flex justify-between items-center mb-2">
            <Link href="/clinician/dashboard" className="inline-flex items-center gap-1 text-sm">
              <LucideArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <LanguageSelector size="sm" className="rounded-full" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{caseData.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span>Case ID: #{caseData.id}</span>
                <span>•</span>
                <div className="flex items-center">
                  <LucideCalendar className="h-3 w-3 mr-1" />
                  <span>Submitted: {caseData.submittedDate}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <LucideBrain className="h-3 w-3 mr-1" />
                  <span>Matched: {caseData.matchedDate}</span>
                </div>
              </div>
            </div>
            <Badge className="bg-gemini-yellow-gradient">Awaiting Your Assessment</Badge>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">Case Overview</TabsTrigger>
                <TabsTrigger value="images">Patient Images</TabsTrigger>
                <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="chat">Live Chat</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>Basic information about the patient</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Age</h3>
                        <p className="text-sm">{caseData.medicalHistory.age}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Gender</h3>
                        <p className="text-sm">{caseData.medicalHistory.gender}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Primary Concern</h3>
                        <p className="text-sm">{caseData.primaryConcern}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Duration</h3>
                        <p className="text-sm">{caseData.duration}</p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Additional Symptoms</h3>
                        <p className="text-sm">{caseData.additionalSymptoms}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Medical History</h3>
                      <div className="grid gap-4">
                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">Existing Conditions</h4>
                          <div className="flex flex-wrap gap-2">
                            {caseData.medicalHistory.conditions.map((condition, index) => (
                              <Badge key={index} variant="outline">
                                {condition}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">Current Medications</h4>
                          <p className="text-sm">{caseData.medicalHistory.medications.join(", ")}</p>
                        </div>

                        <div>
                          <h4 className="text-xs text-muted-foreground mb-1">Allergies</h4>
                          <p className="text-sm">{caseData.medicalHistory.allergies.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Your Assessment</CardTitle>
                    <CardDescription>Provide your professional assessment of this case</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-start gap-3">
                        <LucideAlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Important Guidelines</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Please provide your professional assessment based on the information provided. Focus on
                            possible diagnoses, recommended tests, and treatment approaches. Remember that your
                            assessment will be anonymized and shared with the patient.
                          </p>
                        </div>
                      </div>
                    </div>

                    {aiAnalysisResult && (
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <LucideBrain className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">AI Analysis Suggestions</p>
                        </div>

                        {aiAnalysisResult.differentialDiagnosis && (
                          <div className="mt-2 text-sm">
                            <p className="text-xs text-muted-foreground mb-1">
                              Consider these conditions in your assessment:
                            </p>
                            <ul className="space-y-1 ml-5 list-disc text-xs">
                              {aiAnalysisResult.differentialDiagnosis
                                .slice(0, 3)
                                .map((diagnosis: any, index: number) => (
                                  <li key={index}>{diagnosis.condition}</li>
                                ))}
                            </ul>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                          These are AI suggestions only. Use your professional judgment.
                        </p>
                      </div>
                    )}

                    <VoiceInput
                      placeholder="Enter your assessment here or use voice input..."
                      rows={8}
                      value={assessment}
                      onChange={setAssessment}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button
                      className="rounded-full"
                      onClick={handleSubmit}
                      disabled={!assessment.trim() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="gemini-spinner mr-2 h-4 w-4"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <LucideSend className="mr-2 h-4 w-4" />
                          Submit Assessment
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Patient Images</CardTitle>
                    <CardDescription>Images uploaded by the patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseData.images.map((image) => (
                        <div key={image.id} className="space-y-2">
                          <div className="aspect-square rounded-lg overflow-hidden border">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.description}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm text-center">{image.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ai-analysis" className="space-y-6">
                {isAnalyzing ? (
                  <Card className="gemini-card border-none">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="gemini-spinner mb-4"></div>
                      <h3 className="text-lg font-medium mb-2">Analyzing Patient Data</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Google Gemini AI is analyzing the patient's symptoms, medical history, and images to provide
                        insights.
                      </p>
                    </CardContent>
                  </Card>
                ) : aiAnalysisResult ? (
                  <AIVisualAnalysis
                    images={caseData.images}
                    symptoms={[caseData.primaryConcern, caseData.additionalSymptoms]}
                  />
                ) : (
                  <Card className="gemini-card border-none">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <LucideAlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Analysis Not Available</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        There was an error generating the AI analysis. Please try again later.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="chat" className="space-y-6">
                <LiveChat
                  caseId={params.id}
                  userRole="doctor"
                  userName="Dr. Thomas Smith"
                  userAvatar="TS"
                  otherPartyName="Jane Patient"
                  otherPartyAvatar="JP"
                  className="h-[600px]"
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>Case Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Review Progress</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gemini-gradient rounded-full" style={{ width: "33%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1/3 clinicians reviewed</span>
                    <span>Target: 3 reviews</span>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <LucideAlertCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Your review is needed</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This case is awaiting your assessment to proceed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>Other Clinicians</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {caseData.otherClinicians.map((clinician) => (
                  <div key={clinician.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {clinician.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{clinician.name}</div>
                        <div className="text-xs text-muted-foreground">{clinician.specialty}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className={clinician.status === "Reviewing" ? "bg-blue-50" : "bg-muted"}>
                      {clinician.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gemini-card border-none">
              <CardHeader>
                <CardTitle>AI Match Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gemini-blue-gradient flex items-center justify-center">
                    <LucideBrain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">92% Match Score</div>
                    <div className="text-xs text-muted-foreground">High relevance to your specialty</div>
                  </div>
                </div>

                <Separator />

                <div className="text-sm">
                  <p className="mb-2">This case was matched to you based on:</p>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Your specialty in Orthopedics</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Your experience with similar cases</span>
                    </li>
                    <li className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                      <span>Your availability and response time</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


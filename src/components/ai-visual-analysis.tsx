"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LucideBrain, LucideZoomIn, LucideInfo } from "lucide-react"

interface AIVisualAnalysisProps {
  images: Array<{
    id: string | number
    url: string
    description?: string
  }>
  symptoms: string[]
  className?: string
}

export function AIVisualAnalysis({ images, symptoms, className = "" }: AIVisualAnalysisProps) {
  const [activeTab, setActiveTab] = useState("summary")
  const [selectedImage, setSelectedImage] = useState(images[0]?.id || null)

  // Mock AI analysis data - in a real app, this would come from an API call to a model
  const aiAnalysis = {
    summary: {
      possibleConditions: [
        {
          name: "Contact Dermatitis",
          probability: 0.85,
          description: "Skin inflammation caused by contact with a substance",
        },
        {
          name: "Atopic Dermatitis",
          probability: 0.65,
          description: "Chronic skin condition characterized by itchy, inflamed skin",
        },
        { name: "Urticaria (Hives)", probability: 0.45, description: "Skin reaction causing red, itchy, raised welts" },
        { name: "Drug Eruption", probability: 0.35, description: "Adverse reaction to medication causing skin rash" },
        { name: "Psoriasis", probability: 0.25, description: "Chronic skin condition causing rapid skin cell buildup" },
      ],
      keyFindings: [
        "Erythematous (red) raised lesions consistent with inflammatory reaction",
        "Distribution pattern suggests contact with irritant",
        "Absence of vesicles or pustules",
        "Bilateral and symmetrical presentation",
      ],
    },
    imageAnalysis: images.map((img) => ({
      imageId: img.id,
      findings: [
        "Erythematous maculopapular rash",
        "No visible vesicles or bullae",
        "Well-demarcated borders",
        "No signs of secondary infection",
      ],
      annotations: [
        { x: 30, y: 40, label: "Erythema" },
        { x: 60, y: 70, label: "Papular lesions" },
      ],
    })),
  }

  const getImageAnalysis = (imageId: string | number) => {
    return aiAnalysis.imageAnalysis.find((analysis) => analysis.imageId === imageId) || aiAnalysis.imageAnalysis[0]
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.7) return "bg-primary text-primary-foreground"
    if (probability >= 0.4) return "bg-warning text-warning-foreground"
    return "bg-muted-foreground text-primary-foreground"
  }

  const formatProbability = (probability: number) => {
    return `${Math.round(probability * 100)}%`
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gemini-blue-gradient flex items-center justify-center">
            <LucideBrain className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle>AI Visual Analysis</CardTitle>
            <CardDescription>Google Gemini's analysis of images and symptoms</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="summary">Analysis Summary</TabsTrigger>
            <TabsTrigger value="images">Image Details</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Possible Conditions</h3>
              <div className="space-y-3">
                {aiAnalysis.summary.possibleConditions.map((condition, index) => (
                  <div key={index} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{condition.name}</div>
                      <Badge className={getProbabilityColor(condition.probability)}>
                        {formatProbability(condition.probability)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Key Findings</h3>
              <ul className="space-y-2">
                {aiAnalysis.summary.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-sm">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-start gap-3">
                <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">AI Analysis Disclaimer</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This analysis is generated by Google Gemini based on the provided images and symptoms. It is not a
                    medical diagnosis and should be used for informational purposes only.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-4 gap-2">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${
                    selectedImage === image.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.description || "Patient image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {selectedImage && (
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <img
                    src={images.find((img) => img.id === selectedImage)?.url || ""}
                    alt="Selected image"
                    className="w-full h-full object-contain"
                  />
                  {getImageAnalysis(selectedImage).annotations.map((annotation, index) => (
                    <div
                      key={index}
                      className="absolute h-6 w-6 rounded-full bg-primary/50 flex items-center justify-center"
                      style={{ left: `${annotation.x}%`, top: `${annotation.y}%`, transform: "translate(-50%, -50%)" }}
                      title={annotation.label}
                    >
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                  >
                    <LucideZoomIn className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">AI Findings</h3>
                  <ul className="space-y-2">
                    {getImageAnalysis(selectedImage).findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-sm">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


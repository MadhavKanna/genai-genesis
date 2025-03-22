"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { analyzeSymptoms, analyzeImageAndSymptoms, fileToBase64 } from "@/lib/gemini-api"
import { LucideBrain, LucideLoader } from "lucide-react"

interface AIAnalysisServiceProps {
  symptoms?: string
  additionalInfo?: string
  images?: File[]
  onAnalysisComplete?: (result: any) => void
  className?: string
}

export function AIAnalysisService({
  symptoms = "",
  additionalInfo = "",
  images = [],
  onAnalysisComplete,
  className = "",
}: AIAnalysisServiceProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runAnalysis = async () => {
    if (!symptoms && images.length === 0) {
      setError("Please provide symptoms or upload an image for analysis")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Combine symptoms and additional info
      const fullSymptomText = `
        Primary Symptoms: ${symptoms}
        ${additionalInfo ? `Additional Information: ${additionalInfo}` : ""}
      `

      let result

      // If there are images, analyze them along with the symptoms
      if (images.length > 0) {
        // For simplicity, we'll just use the first image for now
        const imageBase64 = await fileToBase64(images[0])
        console.log("Analyzing image and symptoms...")
        result = await analyzeImageAndSymptoms(imageBase64, fullSymptomText)
      } else {
        // Otherwise, just analyze the symptoms
        console.log("Analyzing symptoms only...")
        result = await analyzeSymptoms(fullSymptomText)
      }

      console.log("Analysis complete:", result)

      // Call the callback with the result
      if (onAnalysisComplete) {
        onAnalysisComplete(result)
      }
    } catch (err) {
      console.error("Error during analysis:", err)
      setError("An error occurred during analysis. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideBrain className="h-5 w-5 text-primary" />
          AI Diagnostic Analysis
        </CardTitle>
        <CardDescription>Analyze symptoms and images using Google Gemini AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm">
              {symptoms ? (
                <>
                  <span className="font-medium">Symptoms to analyze:</span>
                  <br />
                  {symptoms}
                </>
              ) : (
                "No symptoms provided for analysis."
              )}
            </p>

            {additionalInfo && (
              <>
                <div className="my-2 border-t border-border"></div>
                <p className="text-sm">
                  <span className="font-medium">Additional information:</span>
                  <br />
                  {additionalInfo}
                </p>
              </>
            )}

            {images && images.length > 0 && (
              <>
                <div className="my-2 border-t border-border"></div>
                <div className="text-sm">
                  <span className="font-medium">Images for analysis:</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative h-16 w-16 overflow-hidden rounded border">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Medical image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={runAnalysis} disabled={isAnalyzing || (!symptoms && images.length === 0)} className="w-full">
          {isAnalyzing ? (
            <>
              <LucideLoader className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <LucideBrain className="mr-2 h-4 w-4" />
              Run AI Analysis
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}


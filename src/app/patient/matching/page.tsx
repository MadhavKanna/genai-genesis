"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LucideHeartPulse, LucideUsers, LucideGlobe, LucideBrain, LucideCheck } from "lucide-react"

export default function MatchingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [matchedDoctors, setMatchedDoctors] = useState(0)

  useEffect(() => {
    // Simulate the matching process
    const timer1 = setTimeout(() => setCurrentStep(2), 3000)
    const timer2 = setTimeout(() => setCurrentStep(3), 6000)
    const timer3 = setTimeout(() => {
      setCurrentStep(4)
      const matchInterval = setInterval(() => {
        setMatchedDoctors((prev) => {
          if (prev >= 5) {
            clearInterval(matchInterval)
            return prev
          }
          return prev + 1
        })
      }, 800)
    }, 9000)

    const timer4 = setTimeout(() => {
      router.push("/patient/dashboard")
    }, 15000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative h-16 w-16 mx-auto mb-6">
          <div className="absolute inset-0 bg-gemini-gradient rounded-full"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <LucideHeartPulse className="h-8 w-8 text-primary" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Finding the Right Clinicians</h1>
        <p className="text-muted-foreground mb-8">
          Our AI is analyzing your case and matching you with the most appropriate medical professionals.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-gemini-blue-gradient text-white" : "bg-muted"}`}
            >
              {currentStep > 1 ? <LucideCheck className="h-5 w-5" /> : <LucideBrain className="h-5 w-5" />}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Analyzing your symptoms</span>
                {currentStep >= 1 && (
                  <span className={currentStep > 1 ? "text-secondary" : "text-muted-foreground"}>
                    {currentStep > 1 ? "Complete" : "In progress..."}
                  </span>
                )}
              </div>
              {currentStep === 1 && (
                <div className="mt-2 flex justify-start">
                  <div className="gemini-dot-pulse"></div>
                </div>
              )}
            </div>
          </div>

          <div className="h-6 border-l border-dashed border-muted ml-5"></div>

          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-gemini-green-gradient text-white" : "bg-muted"}`}
            >
              {currentStep > 2 ? <LucideCheck className="h-5 w-5" /> : <LucideGlobe className="h-5 w-5" />}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Identifying relevant specialties</span>
                {currentStep >= 2 && (
                  <span className={currentStep > 2 ? "text-secondary" : "text-muted-foreground"}>
                    {currentStep > 2 ? "Complete" : "In progress..."}
                  </span>
                )}
              </div>
              {currentStep === 2 && (
                <div className="mt-2 flex justify-start">
                  <div className="gemini-dot-pulse"></div>
                </div>
              )}
            </div>
          </div>

          <div className="h-6 border-l border-dashed border-muted ml-5"></div>

          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-gemini-yellow-gradient text-white" : "bg-muted"}`}
            >
              {currentStep > 3 ? <LucideCheck className="h-5 w-5" /> : <LucideUsers className="h-5 w-5" />}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Matching with clinicians</span>
                {currentStep >= 3 && (
                  <span className={currentStep > 3 ? "text-secondary" : "text-muted-foreground"}>
                    {currentStep > 3 ? "Complete" : "In progress..."}
                  </span>
                )}
              </div>
              {currentStep === 3 && (
                <div className="mt-2 flex justify-start">
                  <div className="gemini-dot-pulse"></div>
                </div>
              )}
            </div>
          </div>

          <div className="h-6 border-l border-dashed border-muted ml-5"></div>

          <div className="flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? "bg-gemini-red-gradient text-white" : "bg-muted"}`}
            >
              <LucideHeartPulse className="h-5 w-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">Preparing your case</span>
                {currentStep >= 4 && (
                  <span className="text-muted-foreground">{matchedDoctors >= 5 ? "Complete" : "In progress..."}</span>
                )}
              </div>
              {currentStep === 4 && matchedDoctors < 5 && (
                <div className="mt-2 flex justify-start">
                  <div className="gemini-dot-pulse"></div>
                </div>
              )}
              {currentStep >= 4 && (
                <div className="mt-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gemini-gradient rounded-full transition-all duration-500"
                      style={{ width: `${(matchedDoctors / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Matched with {matchedDoctors} clinicians</span>
                    <span>Target: 5</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="gemini-spinner mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">
            {currentStep < 4
              ? "This may take a few moments..."
              : matchedDoctors < 5
                ? "Almost there..."
                : "Redirecting to your dashboard..."}
          </p>
        </div>
      </div>
    </div>
  )
}


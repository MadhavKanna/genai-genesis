"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LucideMic, LucideStopCircle, LucideVolume2 } from "lucide-react"

interface VoiceInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  className?: string
  rows?: number
}

export function VoiceInput({
  placeholder = "Speak or type your message...",
  value,
  onChange,
  onSubmit,
  className = "",
  rows = 3,
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setIsSupported(false)
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("")

        onChange(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onChange])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const speakText = () => {
    if ("speechSynthesis" in window && value) {
      const utterance = new SpeechSynthesisUtterance(value)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="pr-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && onSubmit) {
              e.preventDefault()
              onSubmit()
            }
          }}
        />
        <div className="absolute right-2 bottom-2 flex gap-1">
          {value && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={speakText}
              className="h-8 w-8"
              title="Read aloud"
            >
              <LucideVolume2 className="h-4 w-4" />
            </Button>
          )}
          {isSupported && (
            <Button
              type="button"
              size="icon"
              variant={isListening ? "destructive" : "secondary"}
              onClick={toggleListening}
              className="h-8 w-8"
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? <LucideStopCircle className="h-4 w-4" /> : <LucideMic className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
      {isListening && (
        <div className="text-xs text-muted-foreground flex items-center">
          <div className="gemini-dot-pulse mr-2"></div>
          Listening... Speak clearly
        </div>
      )}
    </div>
  )
}


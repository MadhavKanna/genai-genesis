"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { VoiceInput } from "@/src/components/voice-input";
import {
  LucideBrain,
  LucideMic,
  LucideMessageSquare,
  LucideArrowRight,
} from "lucide-react";

// Sample conversation flow for health assessment
const conversationFlow = [
  {
    id: "greeting",
    message:
      "Hello, I'm here to help you describe your health concerns. What's your main health issue today?",
    expectsResponse: true,
  },
  {
    id: "duration",
    message: "How long have you been experiencing these symptoms?",
    expectsResponse: true,
  },
  {
    id: "severity",
    message:
      "On a scale of 1-10, how would you rate the severity of your symptoms?",
    expectsResponse: true,
  },
  {
    id: "triggers",
    message:
      "Have you noticed anything that triggers or worsens your symptoms?",
    expectsResponse: true,
  },
  {
    id: "previous-treatment",
    message: "Have you tried any treatments or medications for this issue?",
    expectsResponse: true,
  },
  {
    id: "medical-history",
    message:
      "Do you have any relevant medical history or conditions I should know about?",
    expectsResponse: true,
  },
  {
    id: "summary",
    message:
      "Thank you for sharing this information. I'll summarize what you've told me so far.",
    expectsResponse: false,
  },
];

interface AIConversationGuideProps {
  onComplete: (responses: Record<string, string>) => void;
  className?: string;
}

export function AIConversationGuide({
  onComplete,
  className = "",
}: AIConversationGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentResponse, setCurrentResponse] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep, isTyping]);

  // Simulate AI typing effect
  useEffect(() => {
    if (currentStep < conversationFlow.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < conversationFlow.length) {
      // Save the current response
      if (conversationFlow[currentStep].expectsResponse) {
        setResponses({
          ...responses,
          [conversationFlow[currentStep].id]: currentResponse,
        });
      }

      // Move to next step
      if (currentStep < conversationFlow.length - 1) {
        setCurrentStep(currentStep + 1);
        setCurrentResponse("");
      } else {
        // Conversation complete
        onComplete({
          ...responses,
          [conversationFlow[currentStep].id]: currentResponse,
        });
      }
    }
  };

  const handleVoiceInput = (text: string) => {
    setCurrentResponse(text);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideBrain className="h-5 w-5 text-primary" />
          AI-Guided Health Assessment
        </CardTitle>
        <CardDescription>
          Let our AI guide you through describing your health concerns
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {conversationFlow.slice(0, currentStep + 1).map((step, index) => (
            <div
              key={step.id}
              className={index === currentStep && isTyping ? "opacity-70" : ""}
            >
              {/* AI message */}
              <div className="flex gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-gemini-gradient-new flex items-center justify-center flex-shrink-0">
                  <LucideBrain className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-lg bg-muted p-3 max-w-[80%]">
                  {index === currentStep && isTyping ? (
                    <div className="gemini-dot-pulse"></div>
                  ) : (
                    <p className="text-sm">{step.message}</p>
                  )}
                </div>
              </div>

              {/* User response (if this step expects one and it's not the current step being typed) */}
              {step.expectsResponse &&
                (index < currentStep ||
                  (!isTyping &&
                    index === currentStep &&
                    responses[step.id])) && (
                  <div className="flex gap-3 mb-4 justify-end">
                    <div className="rounded-lg bg-primary text-primary-foreground p-3 max-w-[80%]">
                      <p className="text-sm">
                        {responses[step.id] || currentResponse}
                      </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <LucideMessageSquare className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-4">
        {currentStep < conversationFlow.length - 1 &&
          conversationFlow[currentStep].expectsResponse &&
          !isTyping && (
            <div className="w-full">
              <VoiceInput
                value={currentResponse}
                onChange={handleVoiceInput}
                placeholder="Speak or type your response..."
                rows={2}
                className="w-full"
              />
            </div>
          )}
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            size="icon"
            type="button" // Explicitly set button type
            className={`rounded-full ${
              isListening ? "bg-destructive text-destructive-foreground" : ""
            }`}
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              toggleListening();
            }}
          >
            <LucideMic className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              isTyping ||
              (conversationFlow[currentStep].expectsResponse &&
                !currentResponse.trim())
            }
            className="rounded-full"
          >
            {currentStep < conversationFlow.length - 1 ? (
              <>
                Next
                <LucideArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

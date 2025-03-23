"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Input } from "@/src/components/ui/input";
import { Mic, Square, Send } from "lucide-react";
import { functions } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useCase } from "@/src/contexts/CaseContext";
import { useLanguage } from "@/src/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ConversationalAIProps {
  onFormComplete?: (formData: any) => void;
  conversationId?: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: {
    transcript: string;
  };
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[];
}

export function ConversationalAI({
  onFormComplete,
  conversationId: externalConversationId,
}: ConversationalAIProps) {
  const { language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<any>(null);
  const conversationId = useRef(externalConversationId || uuidv4());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { setCurrentCase } = useCase();

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window.webkitSpeechRecognition as any)();
      recognition.continuous = false; // One utterance at a time
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onstart = () => {
        console.log("Speech recognition started with language:", language);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        // Simply update the recording state
        setIsRecording(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = Array.from(event.results);
        const lastResult = results[results.length - 1];

        // Only process final results
        if (lastResult.isFinal) {
          const transcript = lastResult[0].transcript;
          console.log("Final transcript:", transcript);

          // Add user message to chat
          setMessages((prev) => [
            ...prev,
            { role: "user", content: transcript, timestamp: new Date() },
          ]);

          // Process the final transcript
          processText(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        // Only set error if it's not an aborted error
        if (event.error !== "aborted") {
          setError("Speech recognition error occurred");
        }
        setIsRecording(false);
      };

      recognitionRef.current = recognition;

      // Cleanup function
      return () => {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
            recognitionRef.current = null;
          } catch (error) {
            console.error("Error cleaning up recognition:", error);
          }
        }
      };
    } else {
      setError(
        "Speech recognition is not supported in your browser. Please use Chrome or Edge."
      );
    }
  }, [language, isProcessing]);

  // Update recognition language when language changes
  useEffect(() => {
    if (recognitionRef.current) {
      try {
        // Only update language if we're not currently recording
        if (!isRecording) {
          recognitionRef.current.lang = language;
          console.log("Updated speech recognition language to:", language);
        }
      } catch (error) {
        console.error("Error updating recognition language:", error);
      }
    }
  }, [language, isRecording]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Load conversation history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(
      `conversation_${conversationId.current}`
    );
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error loading conversation history:", error);
      }
    }
  }, [conversationId.current]);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(
      `conversation_${conversationId.current}`,
      JSON.stringify(messages)
    );
  }, [messages, conversationId.current]);

  const startRecording = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not initialized");
      return;
    }

    try {
      // Only start if we're not already recording and not processing
      if (!isRecording && !isProcessing) {
        recognitionRef.current.lang = language;
        console.log("Starting recording with language:", language);
        recognitionRef.current.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        // Only stop if we're actually recording
        if (isRecording) {
          recognitionRef.current.stop();
          setIsRecording(false);
        }
      } catch (error) {
        console.error("Error stopping recording:", error);
        setError("Failed to stop recording");
        setIsRecording(false);
      }
    }
  };

  const processText = async (text: string) => {
    console.log("Processing text:", text);
    setIsProcessing(true);
    setError(null);
    try {
      const functionUrl = `http://localhost:5001/${functions.app.options.projectId}/us-central1/processAudio`;
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audioBase64: "", // Empty for text input
          languageCode: language,
          conversationId: conversationId.current,
          textInput: text,
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString(),
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.aiResponse, timestamp: new Date() },
      ]);

      // Check if the response contains a JSON object with all required fields
      try {
        const jsonMatch = data.aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const formData = JSON.parse(jsonMatch[0]);

          // Check if we have the new response format
          if (formData.caseInfo) {
            // Update the case context with all the information
            setCurrentCase({
              ...formData.caseInfo,
              translatedResponses: formData.translatedResponses
                ? [formData.translatedResponses]
                : undefined,
              differentialDiagnoses: formData.differentialDiagnoses,
              suggestedNextSteps: formData.suggestedNextSteps,
            });
          } else {
            // Handle legacy format
            setCurrentCase(formData);
          }

          // Call onFormComplete if provided
          if (onFormComplete) {
            onFormComplete(formData);
          }
        }
      } catch (error) {
        console.error("Error parsing JSON from response:", error);
      }

      // Process audio response if available
      if (data.audioContent) {
        const audioBlob = new Blob([Buffer.from(data.audioContent, "base64")], {
          type: "audio/mp3",
        });
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(audioBlob);
          await audioRef.current.play();
        }
      }
    } catch (error) {
      console.error("Error processing text:", error);
      setError("Failed to process text");
    } finally {
      setIsProcessing(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const base64Data = base64Audio.split(",")[1];

        try {
          const functionUrl = `http://localhost:5001/${functions.app.options.projectId}/us-central1/processAudio`;
          const response = await fetch(functionUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              audioBase64: base64Data,
              languageCode: language,
              conversationId: conversationId.current,
              messages: messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp.toISOString(),
              })),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            throw new Error(
              errorData.error || `HTTP error! status: ${response.status}`
            );
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          // Check if the response contains a JSON object with all required fields
          try {
            const jsonMatch = data.aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const formData = JSON.parse(jsonMatch[0]);
              // Only call onFormComplete if all required fields are present and valid
              if (
                formData.primaryConcern &&
                formData.symptomDuration &&
                formData.age &&
                formData.gender &&
                typeof formData.primaryConcern === "string" &&
                typeof formData.symptomDuration === "number" &&
                typeof formData.age === "number" &&
                typeof formData.gender === "string"
              ) {
                console.log("Form data complete:", formData);
                // Store the case data in context
                setCurrentCase({
                  primaryConcern: formData.primaryConcern,
                  symptomDuration: formData.symptomDuration,
                  durationUnit: formData.durationUnit,
                  additionalSymptoms: formData.additionalSymptoms,
                  age: formData.age,
                  gender: formData.gender,
                  otherGender: formData.otherGender,
                  preExistingConditions: formData.preExistingConditions,
                  medications: "",
                  allergies: "",
                  images: [],
                });
                // Add a message indicating we can proceed to review
                setMessages((prev) => [
                  ...prev,
                  {
                    role: "assistant",
                    content:
                      "Great! I've collected all the necessary information. You can now proceed to review your case details.",
                    timestamp: new Date(),
                  },
                ]);
                // Call onFormComplete to trigger navigation
                onFormComplete?.(formData);
                return;
              }
            }
          } catch (e) {
            console.log(
              "No valid JSON found in response or missing required fields"
            );
          }

          // Add AI response to messages, but filter out any JSON content
          const filteredResponse = data.aiResponse
            .replace(/\{[\s\S]*\}/, "")
            .trim();
          if (filteredResponse) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: filteredResponse,
                timestamp: new Date(),
              },
            ]);
          }

          // Play the audio response
          if (data.audioResponse) {
            try {
              const audio = new Audio(data.audioResponse);
              await audio.play();
            } catch (audioError) {
              console.error("Error playing audio response:", audioError);
            }
          }
        } catch (error) {
          console.error("Error processing audio:", error);
          setError(
            error instanceof Error ? error.message : "Error processing audio"
          );
        } finally {
          setIsProcessing(false);
        }
      };
    } catch (error) {
      console.error("Error reading audio file:", error);
      setError("Error reading audio file");
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: textInput.trim(), timestamp: new Date() },
      ]);
      processText(textInput.trim());
      setTextInput("");
    }
  };

  // Add a function to clear conversation history
  const clearConversation = () => {
    localStorage.removeItem(`conversation_${conversationId.current}`);
    setMessages([]);
    conversationId.current = uuidv4();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Conversation</h3>
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={clearConversation}
            className="text-sm"
          >
            Clear History
          </Button>
        </div>
        <ScrollArea
          ref={scrollAreaRef}
          className="h-[400px] w-full rounded-md border p-4 mb-4"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="gemini-stars">
                      <div className="gemini-star"></div>
                      <div className="gemini-star"></div>
                      <div className="gemini-star"></div>
                    </div>
                    <p className="text-sm">Gemini is thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="flex gap-4">
          <div className="flex-1 flex gap-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isProcessing}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleTextSubmit(e);
                }
              }}
            />
            <Button
              type="button"
              onClick={handleTextSubmit}
              disabled={isProcessing || !textInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <Button
            ref={buttonRef}
            type="button"
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            className="rounded-full w-16 h-16"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            {isRecording ? (
              <Square className="h-6 w-6" />
            ) : (
              <Mic className="h-6 w-6" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

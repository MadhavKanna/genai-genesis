"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Input } from "@/src/components/ui/input";
import { Mic, Square, Send } from "lucide-react";
import { functions } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ConversationalAIProps {
  languageCode?: string;
  onFormComplete?: (formData: any) => void;
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

export const ConversationalAI: React.FC<ConversationalAIProps> = ({
  languageCode = "en-US",
  onFormComplete,
}) => {
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
  const conversationId = useRef(uuidv4());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognition = new (window.webkitSpeechRecognition as any)();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = languageCode;

      recognition.onstart = () => {
        console.log("Speech recognition started");
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
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
        setError("Speech recognition error occurred");
      };

      recognitionRef.current = recognition;
    } else {
      setError(
        "Speech recognition is not supported in your browser. Please use Chrome or Edge."
      );
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, [languageCode]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const startRecording = async () => {
    try {
      console.log("Recording started");
      setError(null);
      setIsRecording(true);

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        setError("Speech recognition not initialized");
        return;
      }

      buttonRef.current?.classList.add("recording");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError(
        "Failed to access microphone. Please ensure you have granted microphone permissions."
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    buttonRef.current?.classList.remove("recording");
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
          languageCode,
          conversationId: conversationId.current,
          textInput: text,
          messages: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
            // Only call onFormComplete if we have at least one message exchange
            if (messages.length > 0) {
              onFormComplete?.(formData);
            }
          } else {
            console.log("Form data incomplete or invalid:", formData);
          }
        }
      } catch (e) {
        console.log(
          "No valid JSON found in response or missing required fields"
        );
      }

      // Play the audio response
      if (data.audioResponse) {
        const audio = new Audio(data.audioResponse);
        await audio.play();
      }
    } catch (error) {
      console.error("Error processing text:", error);
      setError(
        error instanceof Error ? error.message : "Error processing text"
      );
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
              languageCode,
              conversationId: conversationId.current,
              messages: messages.map((msg) => ({
                role: msg.role,
                content: msg.content,
              })),
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          // Add AI response to messages
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: data.aiResponse,
              timestamp: new Date(),
            },
          ]);

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
                // Only call onFormComplete if we have at least one message exchange
                if (messages.length > 0) {
                  onFormComplete?.(formData);
                }
              } else {
                console.log("Form data incomplete or invalid:", formData);
              }
            }
          } catch (e) {
            console.log(
              "No valid JSON found in response or missing required fields"
            );
          }

          // Play the audio response
          if (data.audioResponse) {
            const audio = new Audio(data.audioResponse);
            await audio.play();
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

  return (
    <Card className="w-full">
      <CardContent className="p-4">
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
};

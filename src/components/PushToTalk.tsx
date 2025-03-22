"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { functions } from "@/firebase";

// Add Web Speech API type definitions
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [key: number]: SpeechRecognitionResult;
  length: number;
  item(index: number): SpeechRecognitionResult;
  [Symbol.iterator](): Iterator<SpeechRecognitionResult>;
}

interface SpeechRecognitionResult {
  [key: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionResult;
  [Symbol.iterator](): Iterator<SpeechRecognitionResult>;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionError {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionError) => void;
}

interface PushToTalkProps {
  languageCode?: string;
}

// Add supported languages
const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "es-ES", name: "Spanish (Spain)" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "pt-BR", name: "Portuguese (Brazil)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ru-RU", name: "Russian" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ar-SA", name: "Arabic" },
  { code: "nl-NL", name: "Dutch" },
  { code: "pl-PL", name: "Polish" },
  { code: "tr-TR", name: "Turkish" },
  { code: "vi-VN", name: "Vietnamese" },
  { code: "th-TH", name: "Thai" },
  { code: "id-ID", name: "Indonesian" },
  { code: "ms-MY", name: "Malay" },
  { code: "fil-PH", name: "Filipino" },
];

const PushToTalk: React.FC<PushToTalkProps> = ({ languageCode = "en-US" }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languageCode);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [streamingResponse, setStreamingResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      console.log("Initializing speech recognition...");
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
        console.log("Speech recognition result:", event.results);
        const results = Array.from(event.results);
        const lastResult = results[results.length - 1];
        const transcript = lastResult[0].transcript;

        console.log("Current transcript:", transcript);
        console.log("Is final:", lastResult.isFinal);

        setTranscription(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionError) => {
        console.error("Speech recognition error:", event.error);
        setError("Speech recognition error occurred");
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Speech recognition not supported in this browser");
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

  const startRecording = async () => {
    try {
      setError(null);
      setTranscription("");
      setAiResponse("");
      setStreamingResponse("");

      // Start speech recognition
      if (recognitionRef.current) {
        console.log("Starting speech recognition...");
        recognitionRef.current.start();
      } else {
        console.error("Speech recognition not initialized");
        setError("Speech recognition not initialized");
        return;
      }

      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 48000,
          sampleSize: 16,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: 48000,
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm;codecs=opus",
        });
        await processAudio(audioBlob);
      };

      // Request data every 100ms
      mediaRecorder.start(100);
      setIsRecording(true);
      buttonRef.current?.classList.add("recording");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError(
        "Failed to access microphone. Please ensure you have granted microphone permissions."
      );
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      buttonRef.current?.classList.remove("recording");
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

        console.log("Audio data size:", base64Data.length);
        console.log("Audio format:", audioBlob.type);
        console.log("Audio blob size:", audioBlob.size);

        try {
          const functionUrl = `http://localhost:5001/${functions.app.options.projectId}/us-central1/processAudio`;
          console.log("Sending request to:", functionUrl);
          console.log("Language code:", selectedLanguage);

          const response = await fetch(functionUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              audioBase64: base64Data,
              languageCode: selectedLanguage,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Server error response:", errorData);
            throw new Error(errorData.error || "Failed to process audio");
          }

          const data = await response.json();
          setAiResponse(data.aiResponse);

          // Start audio playback immediately
          if (data.audioResponse) {
            const audio = new Audio(data.audioResponse);
            audioRef.current = audio;

            audio.onerror = (e) => {
              console.error("Audio playback error:", e);
              setError("Failed to play audio response");
            };

            try {
              await audio.play();
            } catch (playError) {
              console.error("Error playing audio:", playError);
              setError("Failed to play audio response");
            }
          }

          // Simulate streaming response
          const words = data.aiResponse.split(" ");
          setStreamingResponse("");
          for (let i = 0; i < words.length; i++) {
            setStreamingResponse(
              (prev) => prev + (i > 0 ? " " : "") + words[i]
            );
            await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust timing as needed
          }
        } catch (functionError: any) {
          console.error("Firebase Function error details:", {
            code: functionError.code,
            message: functionError.message,
            details: functionError.details,
          });
          throw functionError;
        }
      };
    } catch (error) {
      console.error("Error processing audio:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process audio. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={selectedLanguage}
          label="Language"
          onChange={handleLanguageChange}
          disabled={isRecording}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}

      <button
        ref={buttonRef}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className="push-to-talk-button"
      >
        {isRecording ? (
          <StopIcon sx={{ fontSize: 40 }} />
        ) : (
          <MicIcon sx={{ fontSize: 40 }} />
        )}
      </button>

      {isProcessing && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CircularProgress size={20} />
          <Typography>Processing your message...</Typography>
        </Box>
      )}

      {transcription && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(59, 130, 246, 0.1)",
            width: "100%",
            transition: "all 0.3s ease",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "primary.main" }}>
            You said:
          </Typography>
          <Typography>{transcription}</Typography>
        </Box>
      )}

      {streamingResponse && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(147, 51, 234, 0.1)",
            width: "100%",
            transition: "all 0.3s ease",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "secondary.main" }}>
            AI Response:
          </Typography>
          <Typography>{streamingResponse}</Typography>
        </Box>
      )}

      <style jsx global>{`
        .push-to-talk-button {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #3b82f6, #9333ea);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .push-to-talk-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .push-to-talk-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .push-to-talk-button.recording {
          animation: pulse 1.5s infinite;
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `}</style>
    </Box>
  );
};

export default PushToTalk;

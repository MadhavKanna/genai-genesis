"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { functions } from "@/firebase";
import { httpsCallable } from "firebase/functions";

interface PushToTalkProps {
  languageCode?: string;
}

const PushToTalk: React.FC<PushToTalkProps> = ({ languageCode = "en-US" }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const processAudioFunction = httpsCallable(functions, "processAudio");

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
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

        console.log("Sending audio to Firebase Function...");
        const result = await processAudioFunction({
          audioBase64: base64Data,
          languageCode,
        });

        console.log("Received response from Firebase Function");
        const data = result.data as {
          transcription: string;
          aiResponse: string;
          audioResponse: string;
        };

        setTranscription(data.transcription);
        setAiResponse(data.aiResponse);

        // Play the audio response
        if (data.audioResponse) {
          const audio = new Audio(
            `data:audio/mp3;base64,${data.audioResponse}`
          );
          audioRef.current = audio;
          await audio.play();
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
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

      {aiResponse && (
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
          <Typography>{aiResponse}</Typography>
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

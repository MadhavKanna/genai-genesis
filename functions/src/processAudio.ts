import * as functions from "firebase-functions";
import { SpeechClient } from "@google-cloud/speech";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import cors from "cors";
import * as dotenv from "dotenv";
import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";

// Load environment variables from .env file
dotenv.config();

const corsHandler = cors({
  origin: true, // Allow all origins
  methods: ["POST"],
  credentials: true,
});

const speechClient = new SpeechClient();
const ttsClient = new TextToSpeechClient();

// Initialize Genkit
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash, // set default model
});

export const processAudio = functions.https.onRequest(async (req, res) => {
  // Handle CORS preflight requests
  return corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { audioBase64, languageCode = "en-US" } = req.body;

      console.log("Received request", {
        hasAudioData: !!audioBase64,
        audioDataLength: audioBase64?.length,
        languageCode,
      });

      if (!audioBase64) {
        res.status(400).send("No audio data provided");
        return;
      }

      // Convert base64 to buffer
      const audioBuffer = Buffer.from(audioBase64, "base64");
      console.log("Converted audio data to buffer", {
        bufferLength: audioBuffer.length,
      });

      // Speech-to-Text
      console.log("Starting speech-to-text conversion");
      const [response] = await speechClient.recognize({
        audio: { content: audioBuffer.toString("base64") },
        config: {
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: languageCode,
        },
      });

      console.log(
        "Speech-to-text response:",
        JSON.stringify(response, null, 2)
      );

      const transcription =
        response.results?.[0]?.alternatives?.[0]?.transcript || "";

      if (!transcription) {
        console.error("No transcription was generated from the audio");
        res.status(400).json({
          error: "No transcription was generated from the audio",
          details: "The speech-to-text service returned an empty transcription",
        });
        return;
      }

      console.log("Speech-to-text completed", { transcription });

      // Process with Gemini
      console.log("Starting Gemini processing");
      const { text } = await ai.generate(transcription);
      const aiResponse = text;
      console.log("Gemini processing completed", { aiResponse });

      // Text-to-Speech
      console.log("Starting text-to-speech conversion");
      const [ttsResponse] = await ttsClient.synthesizeSpeech({
        input: { text: aiResponse },
        voice: {
          languageCode: languageCode.split("-")[0],
          ssmlGender: "NEUTRAL",
        },
        audioConfig: { audioEncoding: "MP3" },
      });

      console.log("Text-to-speech completed", {
        audioContentLength: ttsResponse.audioContent?.length,
      });

      // Convert audio content to base64 and create a data URL
      const audioContent = ttsResponse.audioContent;
      if (!audioContent) {
        throw new Error(
          "No audio content received from text-to-speech service"
        );
      }
      const ttsAudioBase64 = Buffer.from(audioContent as Uint8Array).toString(
        "base64"
      );
      const audioDataUrl = `data:audio/mp3;base64,${ttsAudioBase64}`;

      res.json({
        transcription,
        aiResponse,
        audioResponse: audioDataUrl,
      });
    } catch (error) {
      console.error("Error processing audio:", error);
      res.status(500).json({
        error: "Error processing audio",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});

import * as functions from "firebase-functions";
import { SpeechClient } from "@google-cloud/speech";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";

const corsHandler = cors({
  origin: true, // Allow all origins
  methods: ["POST"],
  credentials: true,
});

const speechClient = new SpeechClient();
const ttsClient = new TextToSpeechClient();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_CLOUD_API_KEY || "");

export const processAudio = functions.https.onRequest(async (req, res) => {
  // Handle CORS preflight requests
  return corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const { audioBase64, languageCode = "en-US" } = req.body;

      if (!audioBase64) {
        res.status(400).send("No audio data provided");
        return;
      }

      // Convert base64 to buffer
      const audioBuffer = Buffer.from(audioBase64, "base64");

      // Speech-to-Text
      const [response] = await speechClient.recognize({
        audio: { content: audioBuffer.toString("base64") },
        config: {
          encoding: "WEBM_OPUS",
          sampleRateHertz: 48000,
          languageCode: languageCode,
        },
      });

      const transcription =
        response.results?.[0]?.alternatives?.[0]?.transcript || "";

      // Process with Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(transcription);
      const aiResponse = result.response.text();

      // Text-to-Speech
      const [ttsResponse] = await ttsClient.synthesizeSpeech({
        input: { text: aiResponse },
        voice: {
          languageCode: languageCode.split("-")[0],
          ssmlGender: "NEUTRAL",
        },
        audioConfig: { audioEncoding: "MP3" },
      });

      res.json({
        transcription,
        aiResponse,
        audioResponse: ttsResponse.audioContent?.toString(),
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

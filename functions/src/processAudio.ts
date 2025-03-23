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

// System prompt for the medical assistant
const systemPrompt = `You are a friendly and empathetic medical assistant helping users fill out a health form. Your goal is to collect all required information through natural conversation.

Guidelines:
1. Ask one question at a time and wait for the user's response
2. If the user's response is incomplete or unclear, ask follow-up questions
3. Keep track of what information you've collected and what's still needed
4. Be conversational and friendly, but professional
5. Only output the JSON form when ALL required fields are filled
6. If any required information is missing, continue the conversation

Required Information:
1. Primary Health Concern (text)
   - Ask about their main health issue
   - Get specific details about the problem

2. Duration of Symptoms (number + unit)
   - Ask how long they've had the symptoms
   - Clarify if they mean days, weeks, or months
   - Convert all durations to days for consistency

3. Additional Symptoms (text)
   - Ask about other symptoms they might have
   - Encourage them to be thorough

4. Age (number)
   - Ask for their age
   - Ensure it's a valid number

5. Gender (string)
   - Ask for their gender
   - Options: "Female", "Male", "Non-binary", "Other"
   - If "Other", ask for specification

6. Pre-existing Conditions (text)
   - Ask about any existing medical conditions
   - List common conditions for reference

When ALL required information is collected, output a JSON object with this structure:
{
  "primaryConcern": "string",
  "symptomDuration": number,
  "durationUnit": "days",
  "additionalSymptoms": "string",
  "age": number,
  "gender": "string",
  "otherGender": "string (if applicable)",
  "preExistingConditions": "string"
}

Remember: Only output the JSON when ALL required fields are filled. Otherwise, continue the conversation naturally.`;

// Map of language codes to their full names for TTS
const languageMap: { [key: string]: string } = {
  "en-US": "en-US",
  "hi-IN": "hi-IN",
  "es-ES": "es-ES",
  "fr-FR": "fr-FR",
  "de-DE": "de-DE",
  "it-IT": "it-IT",
  "ja-JP": "ja-JP",
  "ko-KR": "ko-KR",
  "zh-CN": "zh-CN",
  "ru-RU": "ru-RU",
  "pt-BR": "pt-BR",
  "nl-NL": "nl-NL",
  "pl-PL": "pl-PL",
  "ar-SA": "ar-SA",
  "tr-TR": "tr-TR",
  "vi-VN": "vi-VN",
  "th-TH": "th-TH",
  "id-ID": "id-ID",
  "ms-MY": "ms-MY",
  "fil-PH": "fil-PH",
  "uk-UA": "uk-UA",
  "el-GR": "el-GR",
  "he-IL": "he-IL",
  "ro-RO": "ro-RO",
  "hu-HU": "hu-HU",
  "cs-CZ": "cs-CZ",
  "da-DK": "da-DK",
  "fi-FI": "fi-FI",
  "sv-SE": "sv-SE",
  "no-NO": "no-NO",
  "sk-SK": "sk-SK",
  "hr-HR": "hr-HR",
  "ca-ES": "ca-ES",
  "nl-BE": "nl-BE",
  "yue-HK": "yue-HK",
  "af-ZA": "af-ZA",
  "am-ET": "am-ET",
  "hy-AM": "hy-AM",
  "az-AZ": "az-AZ",
  "eu-ES": "eu-ES",
  "be-BY": "be-BY",
  "bn-IN": "bn-IN",
  "bs-BA": "bs-BA",
  "bg-BG": "bg-BG",
  "my-MM": "my-MM",
  "km-KH": "km-KH",
  "zh-TW": "zh-TW",
  "et-EE": "et-EE",
  "ka-GE": "ka-GE",
  "gu-IN": "gu-IN",
  "ha-NG": "ha-NG",
  "iw-IL": "iw-IL",
  "hmn-HN": "hmn-HN",
  "is-IS": "is-IS",
  "ig-NG": "ig-NG",
  "ga-IE": "ga-IE",
  "jv-ID": "jv-ID",
  "kn-IN": "kn-IN",
  "kk-KZ": "kk-KZ",
  "lo-LA": "lo-LA",
  "lv-LV": "lv-LV",
  "lt-LT": "lt-LT",
  "lb-LU": "lb-LU",
  "mk-MK": "mk-MK",
  "mg-MG": "mg-MG",
  "ml-IN": "ml-IN",
  "mt-MT": "mt-MT",
  "mi-NZ": "mi-NZ",
  "mr-IN": "mr-IN",
  "mn-MN": "mn-MN",
  "ne-NP": "ne-NP",
  "ny-MW": "ny-MW",
  "or-IN": "or-IN",
  "ps-AF": "ps-AF",
  "fa-IR": "fa-IR",
  "pa-IN": "pa-IN",
  "sm-WS": "sm-WS",
  "gd-GB": "gd-GB",
  "sr-RS": "sr-RS",
  "st-LS": "st-LS",
  "sn-ZW": "sn-ZW",
  "sd-PK": "sd-PK",
  "si-LK": "si-LK",
  "sl-SI": "sl-SI",
  "so-SO": "so-SO",
  "su-ID": "su-ID",
  "sw-KE": "sw-KE",
  "tl-PH": "tl-PH",
  "tg-TJ": "tg-TJ",
  "ta-IN": "ta-IN",
  "tt-RU": "tt-RU",
  "te-IN": "te-IN",
  "ti-ER": "ti-ER",
  "ts-ZA": "ts-ZA",
  "tk-TM": "tk-TM",
  "ur-PK": "ur-PK",
  "ug-CN": "ug-CN",
  "uz-UZ": "uz-UZ",
  "cy-GB": "cy-GB",
  "xh-ZA": "xh-ZA",
  "yi-IL": "yi-IL",
  "yo-NG": "yo-NG",
  "zu-ZA": "zu-ZA",
};

export const processAudio = functions.https.onRequest(async (req, res) => {
  // Handle CORS preflight requests
  return corsHandler(req, res, async () => {
    try {
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      const {
        audioBase64,
        languageCode = "en-US",
        textInput,
        messages = [],
      } = req.body;

      // Validate language code
      if (!languageMap[languageCode]) {
        res.status(400).json({
          error: "Unsupported language",
          details: `Language code ${languageCode} is not supported`,
        });
        return;
      }

      console.log("Received request", {
        hasAudioData: !!audioBase64,
        hasTextInput: !!textInput,
        audioDataLength: audioBase64?.length,
        languageCode,
        messageCount: messages.length,
      });

      let transcription = "";

      if (audioBase64) {
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

        transcription =
          response.results?.[0]?.alternatives?.[0]?.transcript || "";
      } else if (textInput) {
        transcription = textInput;
      } else {
        res.status(400).send("No audio or text input provided");
        return;
      }

      if (!transcription) {
        console.error("No transcription was generated");
        res.status(400).json({
          error: "No transcription was generated",
          details: "The input was empty or could not be processed",
        });
        return;
      }

      console.log("Processing input:", { transcription });

      // Process with Gemini
      console.log("Starting Gemini processing");
      const prompt =
        [
          { role: "system", content: systemPrompt },
          ...messages,
          { role: "user", content: transcription },
        ]
          .map((msg: any) => `${msg.role}: ${msg.content}`)
          .join("\n") + "\nAssistant:";

      const { text } = await ai.generate(prompt);
      const aiResponse = text?.trim();

      if (!aiResponse) {
        console.error("No response generated from Gemini");
        res.status(400).json({
          error: "No response generated from AI",
          details: "The AI model returned an empty response",
        });
        return;
      }

      console.log("Gemini processing completed", {
        aiResponse,
        aiResponseLength: aiResponse.length,
        aiResponseType: typeof aiResponse,
      });

      // Text-to-Speech
      console.log("Starting text-to-speech conversion");
      try {
        // Clean the text while preserving non-Latin characters
        const ttsText = aiResponse
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
          .replace(/\n/g, " ") // Replace newlines with spaces
          .replace(/\s+/g, " ") // Replace multiple spaces with single space
          .replace(/[*_]/g, "") // Remove markdown formatting
          .trim();

        if (!ttsText) {
          throw new Error("Invalid text for text-to-speech conversion");
        }

        console.log("Preparing TTS request with text:", {
          textLength: ttsText.length,
          textPreview: ttsText.substring(0, 100) + "...",
          languageCode: languageCode,
        });

        const [ttsResponse] = await ttsClient.synthesizeSpeech({
          input: { text: ttsText },
          voice: {
            languageCode: languageCode,
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
          aiResponse: ttsText, // Send the cleaned text back
          audioResponse: audioDataUrl,
        });
      } catch (ttsError) {
        console.error("Text-to-speech error:", ttsError);
        res.status(500).json({
          error: "Error generating speech",
          details:
            ttsError instanceof Error
              ? ttsError.message
              : "Failed to generate speech",
        });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({
        error: "Error processing request",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});

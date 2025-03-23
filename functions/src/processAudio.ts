import * as functions from "firebase-functions";
import { SpeechClient } from "@google-cloud/speech";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import cors from "cors";
import * as dotenv from "dotenv";
import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { CaseData } from "../types/case";

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
const systemPrompt = (languageCode: string) => `
You are a chatbot designed to help users fill out a form. 
Ask the user for the required details in a conversational way, ensuring that all fields are collected.
Present the final form in a structured JSON format.

IMPORTANT: You MUST respond in the same language as the user's input. The user's language code is "${languageCode}". 
For example, if the user speaks in Hindi, respond in Hindi. If they speak in Spanish, respond in Spanish.

Also, you will be given input of your conversation history. You should use this to continue the conversation naturally.

Guidelines:
1. Ask one question at a time and wait for the user's response
2. If the user's response is incomplete or unclear, ask follow-up questions
3. Keep track of what information you've collected and what's still needed
4. Only output the JSON form when ALL required fields are filled
5. Go through the questions one by one to get user responses
6. ALWAYS respond in the same language as the user's input
7. Your sole task is to collect the information in a direct and simple manner and output the JSON object with the required fields

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

When ALL required information is collected:
1. Generate a differential diagnosis based on the provided information
2. If the user's language is not English, provide translations of key medical information
3. Suggest next steps or areas to explore

Output the final response in this JSON structure:
{
  "caseInfo": {
    "primaryConcern": "string",
    "symptomDuration": number,
    "durationUnit": "days",
    "additionalSymptoms": "string",
    "age": number,
    "gender": "string",
    "otherGender": "string (if applicable)",
    "preExistingConditions": "string"
  },
  "translatedResponses": {
    "language": "string (if not English)",
    "primaryConcern": "string",
    "additionalSymptoms": "string",
    "medications": "string",
    "allergies": "string"
  },
  "differentialDiagnoses": [
    {
      "condition": "string",
      "confidence": "string (High/Medium/Low)",
      "description": "string",
      "nextSteps": ["string"]
    }
  ],
  "suggestedNextSteps": ["string"]
}

Remember: 
1. Only output the JSON when ALL required fields are filled. Otherwise, continue the conversation naturally.
2. ALWAYS respond in the same language as the user's input (${languageCode}).
3. Include differential diagnoses based on the symptoms and medical history.
4. If the user's language is not English, provide translations of key medical information.
5. Suggest appropriate next steps or areas to explore based on the information provided.`;

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
};

// Map of simple language codes to their full versions
const simpleLanguageMap: { [key: string]: string } = {
  en: "en-US",
  hi: "hi-IN",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
  ru: "ru-RU",
  pt: "pt-BR",
  nl: "nl-NL",
  pl: "pl-PL",
  ar: "ar-SA",
  tr: "tr-TR",
  vi: "vi-VN",
  th: "th-TH",
  id: "id-ID",
  ms: "ms-MY",
  fil: "fil-PH",
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

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
        conversationId,
      } = req.body;

      console.log("Received request", {
        conversationId,
        languageCode,
        messageCount: messages.length,
        hasAudioData: !!audioBase64,
        hasTextInput: !!textInput,
      });

      // Validate language code
      if (!languageCode || typeof languageCode !== "string") {
        console.error("Invalid language code:", languageCode);
        res.status(400).json({
          error: "Invalid language code",
          details: "Language code must be a non-empty string",
        });
        return;
      }

      // Try to get the full language code
      const fullLanguageCode =
        languageMap[languageCode] || simpleLanguageMap[languageCode];

      if (!fullLanguageCode) {
        console.error("Unsupported language code:", languageCode);
        res.status(400).json({
          error: "Unsupported language",
          details: `Language code "${languageCode}" is not supported. Please use one of the supported language codes.`,
          supportedLanguages: [
            ...Object.keys(languageMap),
            ...Object.keys(simpleLanguageMap),
          ],
        });
        return;
      }

      console.log("Using language code:", {
        original: languageCode,
        mapped: fullLanguageCode,
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
            languageCode: fullLanguageCode,
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
        res.status(400).json({
          error: "No input provided",
          details: "Either audioBase64 or textInput must be provided",
        });
        return;
      }

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

      // Sort messages by timestamp to ensure correct order
      const sortedMessages = [...messages].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // Create the prompt with the full conversation history
      const prompt =
        [
          { role: "system", content: systemPrompt(fullLanguageCode) },
          ...sortedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          { role: "user", content: transcription },
        ]
          .map((msg: any) => `${msg.role}: ${msg.content}`)
          .join("\n") + "\nAssistant:";

      console.log(
        "Sending prompt to Gemini with message count:",
        sortedMessages.length + 2
      );

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
        // Clean the text while preserving non-English characters
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
          languageCode: fullLanguageCode,
        });

        const [ttsResponse] = await ttsClient.synthesizeSpeech({
          input: { text: ttsText },
          voice: {
            languageCode: fullLanguageCode,
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

        // Parse the AI response
        const aiResponseJson = JSON.parse(aiResponse);

        // Update the case data with the new information
        const updatedCase: CaseData = {
          id: caseId,
          primaryConcern: aiResponseJson.caseInfo.primaryConcern,
          symptomDuration: aiResponseJson.caseInfo.symptomDuration,
          durationUnit: aiResponseJson.caseInfo.durationUnit,
          additionalSymptoms: aiResponseJson.caseInfo.additionalSymptoms,
          age: aiResponseJson.caseInfo.age,
          gender: aiResponseJson.caseInfo.gender,
          medications: aiResponseJson.caseInfo.medications,
          allergies: aiResponseJson.caseInfo.allergies,
          preExistingConditions: aiResponseJson.caseInfo.preExistingConditions,
          translatedResponses: aiResponseJson.translatedResponses,
          differentialDiagnoses: aiResponseJson.differentialDiagnoses,
          suggestedNextSteps: aiResponseJson.suggestedNextSteps,
          lastUpdated: new Date().toISOString(),
        };

        res.json({
          transcription,
          aiResponse: ttsText, // Send the cleaned text back
          audioResponse: audioDataUrl,
          conversationId, // Include the conversation ID in the response
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
      console.error("Error processing audio:", error);
      res.status(500).json({
        error: "Error processing audio",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});

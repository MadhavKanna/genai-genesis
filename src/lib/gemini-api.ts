import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

// Safety settings to ensure appropriate medical content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

// Medical system prompt to guide the model
const MEDICAL_SYSTEM_PROMPT = `
You are a medical AI assistant designed to help analyze patient symptoms and medical images.
Your task is to provide a differential diagnosis (DDX) based on the information provided.

For each analysis, you should:
1. List possible diagnoses in order of likelihood
2. For each diagnosis, provide:
   - Name of the condition
   - Brief description
   - Key symptoms that match
   - Confidence level (High, Medium, Low)
3. Suggest relevant tests or examinations that could help confirm the diagnosis
4. Note any red flags or urgent concerns that require immediate medical attention

Remember:
- Be thorough but concise
- Focus on medical accuracy
- Do not provide definitive diagnoses, only possibilities
- Always emphasize that this is not a replacement for professional medical advice
- Structure your response in a clear, organized format

Output your response in JSON format with the following structure:
{
  "differentialDiagnosis": [
    {
      "condition": "Condition Name",
      "description": "Brief description of the condition",
      "matchingSymptoms": ["symptom 1", "symptom 2"],
      "confidence": "High/Medium/Low",
      "additionalInfo": "Any additional relevant information"
    }
  ],
  "suggestedTests": ["test 1", "test 2"],
  "redFlags": ["red flag 1", "red flag 2"] or [],
  "analysisNotes": "General notes about the analysis"
}
`

/**
 * Analyzes text symptoms to generate a differential diagnosis
 */
export async function analyzeSymptoms(symptoms: string) {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Create a chat session
    const chat = model.startChat({
      safetySettings,
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic medical responses
        topP: 0.8,
        topK: 40,
      },
      systemInstruction: MEDICAL_SYSTEM_PROMPT,
    })

    // Send the symptoms to the model
    const prompt = `
      Please analyze the following patient symptoms and provide a differential diagnosis:
      
      ${symptoms}
      
      Return your analysis in the JSON format specified in your instructions.
    `

    const result = await chat.sendMessage(prompt)
    const response = result.response
    const text = response.text()

    // Extract JSON from the response
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch =
        text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/)

      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text
      const cleanJsonStr = jsonStr.replace(/```json|```/g, "").trim()

      console.log("Symptom Analysis Result:", cleanJsonStr)
      return JSON.parse(cleanJsonStr)
    } catch (jsonError) {
      console.error("Error parsing JSON from Gemini response:", jsonError)
      console.log("Raw response:", text)
      return { error: "Failed to parse diagnosis results", rawResponse: text }
    }
  } catch (error) {
    console.error("Error analyzing symptoms with Gemini:", error)
    return { error: "Failed to analyze symptoms" }
  }
}

/**
 * Analyzes medical images along with text symptoms
 */
export async function analyzeImageAndSymptoms(
  imageData: string, // Base64 encoded image
  symptoms: string,
) {
  try {
    // Get the Gemini Pro Vision model for image analysis
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

    // Convert base64 to parts format expected by the API
    const imageParts = [
      {
        inlineData: {
          data: imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ""),
          mimeType: imageData.startsWith("data:image/png") ? "image/png" : "image/jpeg",
        },
      },
    ]

    // Create the prompt with both image and text
    const prompt = `
      Please analyze this medical image along with the following patient symptoms and provide a differential diagnosis:
      
      Patient Symptoms: ${symptoms}
      
      Focus on visual findings in the image that might be relevant to the symptoms described.
      Return your analysis in JSON format with the following structure:
      {
        "imageAnalysis": {
          "visualFindings": ["finding 1", "finding 2"],
          "relevantFeatures": ["feature 1", "feature 2"]
        },
        "differentialDiagnosis": [
          {
            "condition": "Condition Name",
            "description": "Brief description",
            "matchingSymptoms": ["symptom 1", "symptom 2"],
            "visualCorrelation": "How the visual findings correlate with this diagnosis",
            "confidence": "High/Medium/Low"
          }
        ],
        "suggestedTests": ["test 1", "test 2"],
        "redFlags": ["red flag 1", "red flag 2"] or [],
        "analysisNotes": "General notes about the analysis"
      }
    `

    // Send the multimodal prompt to the model
    const result = await model.generateContent([...imageParts, prompt])
    const response = result.response
    const text = response.text()

    // Extract JSON from the response
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch =
        text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/)

      const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text
      const cleanJsonStr = jsonStr.replace(/```json|```/g, "").trim()

      console.log("Image Analysis Result:", cleanJsonStr)
      return JSON.parse(cleanJsonStr)
    } catch (jsonError) {
      console.error("Error parsing JSON from Gemini response:", jsonError)
      console.log("Raw response:", text)
      return { error: "Failed to parse image analysis results", rawResponse: text }
    }
  } catch (error) {
    console.error("Error analyzing image with Gemini:", error)
    return { error: "Failed to analyze image" }
  }
}

/**
 * Converts a File object to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}


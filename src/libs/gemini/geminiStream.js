// src/libs/gemini/geminiStream.js
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

/**
 * Non-streaming version of the Gemini API call using the AI SDK.
 * @param {string} prompt - The user's input prompt.
 * @param {string} systemInstruction - The system instruction for the model.
 * @param {*} responseSchema - Optional schema for structured output.
 * @param {string} modelName - The name of the Gemini model to use.
 * @param {number} temperature - The temperature for the model's response.
 * @param {string} [apiKey] - Optional API key for Google. Defaults to process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY.
 * @returns {Promise<{text: string}>} - The generated text.
 */
export default async function gemini(
  prompt,
  systemInstruction,
  responseSchema = null,
  modelName = "gemini-1.5-flash-latest",
  temperature = 0.7,
  apiKey
) {
  // Use provided apiKey or fallback to environment variable
  const finalApiKey =
    apiKey || process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  if (!finalApiKey) {
    throw new Error(
      "Google API key is not configured. Please provide one or set NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY."
    );
  }

  try {
    // Use generateText from the AI SDK
    const result = await generateText({
      model: google(modelName, { apiKey: finalApiKey }),
      system: systemInstruction,
      prompt: prompt,
      temperature: temperature,
      // Setting responseFormat to json if responseSchema is provided
      responseFormat: responseSchema ? { type: "json_object" } : undefined,
    });

    // IMPORTANT: textPromise contains the actual text value that we need to await
    const generatedText = await result.text;

    // Return the text result in the expected format
    return {
      text: generatedText,
    };
  } catch (error) {
    console.error("Error in generateText:", error);
    // Rethrow the error after logging
    throw error;
  }
}

// Named export for compatibility with existing code
export { gemini };

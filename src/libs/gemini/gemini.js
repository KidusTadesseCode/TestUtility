// src/libs/gemini/gemini.js
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

/**
 * Generates text using a Google Gemini model (non-streaming).
 * @param {string} prompt - The user's input prompt.
 * @param {string} systemInstruction - The system instruction for the model.
 * @param {*} responseSchema - Optional schema for structured output (not used in current implementation).
 * @param {string} modelName - The name of the Gemini model to use.
 * @param {number} temperature - The temperature for the model's response.
 * @param {string} [apiKey] - Optional API key for Google. Defaults to process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY.
 * @returns {Promise<{text: string}>} - The generated text.
 */
const gemini = async (
  prompt,
  systemInstruction,
  responseSchema = null, // Keeping for signature compatibility
  modelName,
  temperature,
  apiKey
) => {
  // Use provided apiKey or fallback to environment variable
  const finalApiKey =
    apiKey || process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  console.log(
    "process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY:",
    process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY
  );
  console.log("finalApiKey:", finalApiKey);
  if (!finalApiKey) {
    throw new Error(
      "Google API key is not configured. Please provide one or set NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY."
    );
  }

  try {
    const result = await generateText({
      model: google(modelName, { apiKey: finalApiKey }),
      system: systemInstruction,
      prompt: prompt,
      temperature: temperature,
      responseFormat: responseSchema ? { type: "json_object" } : undefined,
    });

    // Return the text result
    return {
      text: result.text,
      // Note: Cost information is not available through the AI SDK
      // Client code has been updated to not rely on this
    };
  } catch (error) {
    console.error("Error in gemini generateText:", error);
    // Rethrow the error after logging
    throw error;
  }
};

export default gemini;

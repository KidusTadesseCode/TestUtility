// src/libs/gemini/listAvailableGeminiModels.js
import geminiModel from "@/data/geminiModels";
/**
 * Retrieves information about a Gemini model based on its name.
 * The input can be either the full model name (e.g., "models/chat-bison-001")
 * or the short name (e.g., "chat-bison-001").
 *
 * @param {string} modelName The name of the model.
 * @returns {object | undefined} The model information object if found, otherwise undefined.
 */
export function geminiModelsInfo(modelName) {
  let normalizedModelName = modelName;
  if (modelName && !modelName.startsWith("models/"))
    normalizedModelName = "models/" + modelName;
  const modelInfo = geminiModel.find(
    (model) => model.name === normalizedModelName
  );
  return modelInfo;
}

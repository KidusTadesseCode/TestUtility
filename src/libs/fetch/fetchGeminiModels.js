export default async function fetchGeminiModels(
  models = [],
  nextPageToken = null
) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY)
    throw new Error("NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY is not set");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  const baseURL = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const url = nextPageToken ? `${baseURL}&pageToken=${nextPageToken}` : baseURL;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("API Error: Fail to get models.");
    const data = await response.json();
    models.push(...data.models);
    if (data.nextPageToken)
      return await listAvailableGeminiModels(models, data.nextPageToken);
    else return models;
  } catch (error) {
    if (!error instanceof Error) throw new Error(error);
    throw error;
  }
}

export async function fetchGeminiModelsInfo(modelName) {
  try {
    if (!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY)
      throw new Error("NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY is not set");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}?key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

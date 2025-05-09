const MODEL_PRICING = {
  "chat-bison-001": {
    inputCostPer1kTokens: 0.0005,
    outputCostPer1kTokens: 0.0005,
    notes:
      "Based on PaLM 2 chat-bison@002 pricing. Older versions may differ slightly or be deprecated.",
  },
  "text-bison-001": {
    inputCostPer1kTokens: 0.0005,
    outputCostPer1kTokens: 0.0005,
    notes:
      "Based on PaLM 2 text-bison@002 pricing. Older versions may differ slightly or be deprecated.",
  },

  "embedding-gecko-001": {
    inputCostPer1kTokens: 0.0001,
    outputCostPer1kTokens: 0,
    notes: "Based on Embeddings for Text pricing.",
  },
  "embedding-001": {
    inputCostPer1kTokens: 0.0001,
    outputCostPer1kTokens: 0,
    notes:
      "Assuming this refers to older model like gecko. Check specific model.",
  },
  "text-embedding-004": {
    inputCostPer1kTokens: 0.00002,
    outputCostPer1kTokens: 0,
  },
  "gemini-embedding-exp-03-07": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-embedding-exp": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-1.0-pro-vision-latest": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    inputCostPerImage: 0.0013,
    notes: "Pricing for gemini-1.0-pro-vision.",
  },
  "gemini-pro-vision": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    inputCostPerImage: 0.0013,
    notes: "Pricing for gemini-1.0-pro-vision.",
  },
  "gemini-1.5-pro-latest": {
    inputCostPer1kTokens: 0.00125,
    outputCostPer1kTokens: 0.00375,
    notes:
      "Higher rates apply for >128k token context ($0.0025 input, $0.0075 output per 1k tokens).",
  },
  "gemini-1.5-pro-001": {
    inputCostPer1kTokens: 0.00125,
    outputCostPer1kTokens: 0.00375,
    notes: "Higher rates apply for >128k token context.",
  },
  "gemini-1.5-pro-002": {
    inputCostPer1kTokens: 0.00125,
    outputCostPer1kTokens: 0.00375,
    notes:
      "Assuming same price as latest. Higher rates apply for >128k token context. Check docs.",
  },
  "gemini-1.5-pro": {
    inputCostPer1kTokens: 0.00125,
    outputCostPer1kTokens: 0.00375,
    notes: "Higher rates apply for >128k token context.",
  },
  "gemini-1.5-flash-latest": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes:
      "Higher rates apply for >128k token context ($0.00025 input, $0.00075 output per 1k tokens).",
  },
  "gemini-1.5-flash-001": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes: "Higher rates apply for >128k token context.",
  },
  "gemini-1.5-flash-001-tuning": {
    inputCostPer1kTokens: 0.00025,
    outputCostPer1kTokens: 0.00075,
    notes:
      "Tuned model pricing. Also incurs hourly hosting costs (e.g., ~$3.80/hr). Check Vertex AI Tuned Model pricing.",
  },
  "gemini-1.5-flash": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes: "Higher rates apply for >128k token context.",
  },
  "gemini-1.5-flash-002": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes:
      "Assuming same price as latest. Higher rates apply for >128k token context. Check docs.",
  },
  "gemini-1.5-flash-8b": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes:
      "Assuming same standard Flash pricing. Higher rates apply for >128k token context. Check docs.",
  },
  "gemini-1.5-flash-8b-001": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes:
      "Assuming same standard Flash pricing. Higher rates apply for >128k token context. Check docs.",
  },
  "gemini-1.5-flash-8b-latest": {
    inputCostPer1kTokens: 0.000125,
    outputCostPer1kTokens: 0.000375,
    notes:
      "Assuming same standard Flash pricing. Higher rates apply for >128k token context. Check docs.",
  },
  "gemini-1.5-flash-8b-exp-0827": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. May align with Flash later. Check docs.",
  },
  "gemini-1.5-flash-8b-exp-0924": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. May align with Flash later. Check docs.",
  },

  "gemini-2.5-pro-exp-03-25": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental/Preview model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.5-pro-preview-03-25": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Preview model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-flash-exp": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Might be internal or superseded. Check docs.",
  },
  "gemini-2.0-flash": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Might be internal or superseded by 1.5 Flash. Check docs.",
  },
  "gemini-2.0-flash-001": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes: "Specific pricing not found. Check docs.",
  },
  "gemini-2.0-flash-exp-image-generation": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    costPerImageGenerated: null,
    notes:
      "Specific pricing not found. Likely experimental/internal. Check docs.",
  },
  "gemini-2.0-flash-lite-001": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Might be internal/specific program. Check docs.",
  },
  "gemini-2.0-flash-lite": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes: "Specific pricing not found. Check docs.",
  },
  "gemini-2.0-flash-lite-preview-02-05": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Preview model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-flash-lite-preview": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Preview model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-pro-exp": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-pro-exp-02-05": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-exp-1206": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-flash-thinking-exp-01-21": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Likely experimental/internal. Check docs.",
  },
  "gemini-2.0-flash-thinking-exp": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Likely experimental/internal. Check docs.",
  },
  "gemini-2.0-flash-thinking-exp-1219": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Likely experimental/internal. Check docs.",
  },
  "learnlm-1.5-pro-experimental": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Experimental model, pricing likely $0 during preview or unannounced. Check docs.",
  },
  "gemini-2.0-flash-live-001": {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    notes:
      "Specific pricing not found. Likely experimental/internal. Check docs.",
  },

  "gemma-3-1b-it": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Gemma 3 pricing TBD/depends on hosting. Check docs. Potentially $0 during preview. Placeholder based on Gemma 2 Studio pricing ($0.0002 input / $0.001 output per 1k tokens).",
  },
  "gemma-3-4b-it": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Gemma 3 pricing TBD/depends on hosting. Check docs. Potentially $0 during preview. Placeholder based on Gemma 2 Studio pricing.",
  },
  "gemma-3-12b-it": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Gemma 3 pricing TBD/depends on hosting. Check docs. Potentially $0 during preview. Placeholder based on Gemma 2 Studio pricing.",
  },
  "gemma-3-27b-it": {
    inputCostPer1kTokens: 0.0,
    outputCostPer1kTokens: 0.0,
    notes:
      "Gemma 3 pricing TBD/depends on hosting. Check docs. Potentially $0 during preview. Placeholder based on Gemma 2 Studio pricing.",
  },

  aqa: {
    inputCostPer1kTokens: null,
    outputCostPer1kTokens: null,
    costPerQuery: 0.002,
    notes:
      "AQA pricing is typically an add-on per query ($0.002) plus the underlying LLM token costs. Check Vertex AI Search/Conversation pricing.",
  },
  "imagen-3.0-generate-002": {
    inputCostPer1kTokens: 0,
    outputCostPer1kTokens: 0,
    costPerImageGenerated: 0.015,
    notes:
      "Cost is primarily per generated image. Check Imagen on Vertex AI pricing for different qualities/features.",
  },
  "veo-2.0-generate-001": {
    inputCostPer1kTokens: 0,
    outputCostPer1kTokens: 0,
    costPerSecondGenerated: 0.04,
    notes:
      "Cost is primarily per second of generated video. Check Veo on Vertex AI pricing.",
  },
};

export default MODEL_PRICING;

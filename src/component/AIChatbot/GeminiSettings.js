// src/component/AIChatbot/GeminiSettings.js
"use client";
import React, { useState } from "react";
import styled from "styled-components";
import geminiModel from "@/data/geminiModels";
const GeminiSettings = ({ onSave, initialModel }) => {
  const defaultModel = initialModel;
  const [selectedModel, setSelectedModel] = useState({});
  const availableModels = geminiModel;

  const handleModelChange = (e) => {
    const model = JSON.parse(e.target.value);
    if (!model) return;
    setSelectedModel(model);
    onSave(model);
  };
  return (
    <FormGroup>
      <ModelSelect
        value={
          selectedModel && selectedModel.name
            ? JSON.stringify(selectedModel)
            : ""
        }
        onChange={handleModelChange}
        disabled={availableModels.length === 0}
      >
        {availableModels.length === 0 ? (
          <option value="">Loading models...</option>
        ) : (
          <>
            <option value={JSON.stringify(defaultModel)}>
              {defaultModel.displayName}
            </option>
            {availableModels.map((model) => (
              <option key={model.name} value={JSON.stringify(model)}>
                {model.displayName}
              </option>
            ))}
          </>
        )}
      </ModelSelect>
    </FormGroup>
  );
};

// Styled Components

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const ModelSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(2)};
  font-size: 1rem;
  transition: ${({ theme }) => theme.motion.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default GeminiSettings;

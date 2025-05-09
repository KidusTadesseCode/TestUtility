"use client";
// src/app/style-stripper/page.jsx
import React, { useState, useEffect } from "react";
import { FiFilter, FiCopy, FiCheck, FiTrash } from "react-icons/fi";
import {
  PageContainer,
  Header,
  Title,
  Subtitle,
  MainContent,
  InputSection,
  OutputSection,
  TextArea,
  Button,
  CopyButton,
  ResultContainer,
  ResultCode,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  ButtonGroup,
} from "./style";

const StyleStripper = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (showCopiedMessage) {
      const timer = setTimeout(() => {
        setShowCopiedMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopiedMessage]);

  const processStyledComponents = () => {
    if (!inputCode.trim()) return;

    setIsProcessing(true);

    try {
      // Find all styled component declarations
      const componentRegex = /const\s+(\w+)\s*=\s*styled\.(\w+)`([\s\S]*?)`;/g;
      const importRegex = /import\s+.*?from\s+['"]styled-components['"];?/;

      // Extract components
      const components = [];
      const componentNames = [];
      let match;

      while ((match = componentRegex.exec(inputCode)) !== null) {
        const [fullMatch, componentName, elementType] = match;
        componentNames.push(componentName);
        components.push(`const ${componentName} = styled.${elementType}\`\`;`);
      }

      // Create output with imports preserved and empty components
      let result = "";

      // Get the import statement
      const importMatch = importRegex.exec(inputCode);
      if (importMatch) {
        result += importMatch[0] + "\n";
      } else {
        result += 'import styled from "styled-components";\n';
      }

      // Add all components
      result += components.join("\n") + "\n";

      // Add export statement
      if (componentNames.length > 0) {
        result += "\nexport {\n";
        result += componentNames.map((name) => `  ${name}`).join(",\n");
        result += "\n};\n";
      }

      setOutputCode(result);
    } catch (error) {
      console.error("Error processing styled components:", error);
      setOutputCode(
        "Error processing styled components. Please check your input."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setShowCopiedMessage(true);
  };

  const handleClear = () => {
    setInputCode("");
    setOutputCode("");
  };

  return (
    <PageContainer>
      <Header>
        <Title>Style Stripper</Title>
        <Subtitle>
          Remove all properties from styled components while preserving the
          component structure
        </Subtitle>
      </Header>

      <MainContent>
        <InputSection>
          <h2>Input Styled Components</h2>
          <TextArea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="// Paste your styled components code here
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;"
          />
          <ButtonGroup>
            <Button
              onClick={processStyledComponents}
              disabled={isProcessing || !inputCode.trim()}
            >
              <FiFilter />
              {isProcessing ? "Processing..." : "Strip Properties"}
            </Button>
            <Button onClick={handleClear} variant="secondary">
              <FiTrash />
              Clear
            </Button>
          </ButtonGroup>
        </InputSection>

        <OutputSection>
          <h2>Output</h2>
          {outputCode ? (
            <>
              <CopyButton onClick={handleCopy}>
                {showCopiedMessage ? (
                  <>
                    <FiCheck /> Copied!
                  </>
                ) : (
                  <>
                    <FiCopy /> Copy to Clipboard
                  </>
                )}
              </CopyButton>
              <ResultContainer>
                <ResultCode>{outputCode}</ResultCode>
              </ResultContainer>
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon>🧹</EmptyStateIcon>
              <EmptyStateText>
                Processed styled components will appear here. Click "Strip
                Properties" to begin.
              </EmptyStateText>
            </EmptyState>
          )}
        </OutputSection>
      </MainContent>
    </PageContainer>
  );
};

export default StyleStripper;

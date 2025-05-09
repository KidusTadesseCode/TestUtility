"use client";
// src/app/styled-extractor/page.js

import React, { useState } from "react";
import { FiFilter, FiCopy, FiCheck } from "react-icons/fi";
import {
  PageContainer,
  Header,
  Logo,
  LogoIcon,
  LogoText,
  Subtitle,
  MainContent,
  InputSection,
  InputContainer,
  SectionTitle,
  SectionInfo,
  StyledCodeTextarea,
  ButtonGroup,
  ActionButton,
  SecondaryButton,
  OutputSection,
  ResultContainer,
  ResultCode,
  CopyButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  NamesInput,
  Footer,
  FooterText,
} from "./style";

const StyledExtractor = () => {
  const [styledCode, setStyledCode] = useState("");
  const [componentNames, setComponentNames] = useState("");
  const [extractedCode, setExtractedCode] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleExtract = () => {
    if (!styledCode || !componentNames) return;

    setIsExtracting(true);

    try {
      // Get component names as array, trim whitespace
      const names = componentNames
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

      if (names.length === 0) {
        setExtractedCode("Please provide at least one component name.");
        setIsExtracting(false);
        return;
      }

      // Process the styled code to extract the requested components
      const lines = styledCode.split("\n");
      const extractedComponents = [];
      let currentComponent = [];
      let isCapturing = false;
      let capturedComponentName = "";
      const extractedComponentNames = []; // Track successfully extracted component names

      // Add import statement at the beginning
      extractedComponents.push('import styled from "styled-components";');
      extractedComponents.push("");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if this line starts a component definition
        if (line.includes("export const") || line.includes("const ")) {
          const exportMatch = line.match(/export const (\w+)/);
          const constMatch = line.match(/const (\w+)/);
          const match = exportMatch || constMatch;

          if (match && match[1] && line.includes("styled.")) {
            // If we were already capturing a component, add it to the results
            if (isCapturing && currentComponent.length > 0) {
              extractedComponents.push(...currentComponent);
              extractedComponentNames.push(capturedComponentName); // Add to successful extractions
              currentComponent = [];
              isCapturing = false;
            }

            capturedComponentName = match[1];

            // Check if this component name is in our target list
            if (names.includes(capturedComponentName)) {
              isCapturing = true;
              currentComponent.push(line);
            }
            continue;
          }
        }

        // If we're capturing and this line has the closing backtick for a styled component
        if (isCapturing) {
          currentComponent.push(line);

          // If the line has the closing backtick, end this component capture
          if (line.includes("`;")) {
            extractedComponents.push(...currentComponent);
            extractedComponents.push(""); // Add an empty line for separation
            extractedComponentNames.push(capturedComponentName); // Add to successful extractions
            isCapturing = false;
            currentComponent = [];
          }
        }
      }

      // Check if we found any components
      if (extractedComponentNames.length === 0) {
        setExtractedCode(`No components found with names: ${names.join(", ")}`);
        setIsExtracting(false);
        return;
      }

      // Add export statement at the end
      extractedComponents.push(
        "// Export statement for the extracted components"
      );
      extractedComponents.push("export {");

      // Add each component name indented
      extractedComponentNames.forEach((name) => {
        extractedComponents.push(`  ${name},`);
      });

      extractedComponents.push("};");

      // Set the extracted code
      setExtractedCode(extractedComponents.join("\n"));
    } catch (error) {
      console.error("Error extracting components:", error);
      setExtractedCode(
        "Error extracting components. Please check your input and try again."
      );
    }

    setIsExtracting(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedCode);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  const handleClear = () => {
    setStyledCode("");
    setComponentNames("");
    setExtractedCode("");
  };

  return (
    <PageContainer>
      <Header>
        <Logo>
          <LogoIcon>
            <FiFilter size={24} />
          </LogoIcon>
          <LogoText>Styled Extractor</LogoText>
        </Logo>
        <Subtitle>
          Extract styled components by name from your codebase
        </Subtitle>
      </Header>

      <MainContent>
        <InputSection>
          <InputContainer>
            <SectionTitle>Component Names</SectionTitle>
            <SectionInfo>
              Enter the names of styled components to extract, separated by
              commas
            </SectionInfo>
            <NamesInput
              placeholder="Card, Button, Container..."
              value={componentNames}
              onChange={(e) => setComponentNames(e.target.value)}
            />
          </InputContainer>

          <InputContainer>
            <SectionTitle>Paste Styled Components Code</SectionTitle>
            <SectionInfo>
              Paste your styled-components file here to extract specific
              components
            </SectionInfo>
            <StyledCodeTextarea
              placeholder="export const Component = styled.div`...`;"
              value={styledCode}
              onChange={(e) => setStyledCode(e.target.value)}
            />
          </InputContainer>

          <ButtonGroup>
            <ActionButton
              onClick={handleExtract}
              disabled={isExtracting || !styledCode || !componentNames}
            >
              {isExtracting ? "Extracting..." : "Extract Components"}
            </ActionButton>
            <SecondaryButton onClick={handleClear}>Clear All</SecondaryButton>
          </ButtonGroup>
        </InputSection>

        <OutputSection>
          <SectionTitle>Extracted Components</SectionTitle>
          {extractedCode ? (
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
                <ResultCode>{extractedCode}</ResultCode>
              </ResultContainer>
            </>
          ) : (
            <EmptyState>
              <EmptyStateIcon>🔍</EmptyStateIcon>
              <EmptyStateText>
                Your extracted components will appear here after you click
                &quot;Extract Components&quot;
              </EmptyStateText>
            </EmptyState>
          )}
        </OutputSection>
      </MainContent>

      <Footer>
        <FooterText>Built with styled-components and Next.js</FooterText>
      </Footer>
    </PageContainer>
  );
};

export default StyledExtractor;

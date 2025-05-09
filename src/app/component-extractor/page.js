"use client";
// src/pages/ComponentExtractor.js
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { FiFilter, FiCopy, FiCheck } from "react-icons/fi";

const ComponentExtractor = () => {
  const [styledCode, setStyledCode] = useState("");
  const [extractedCode, setExtractedCode] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleExtract = () => {
    setIsExtracting(true);

    try {
      // Process the styled code to extract all components
      const lines = styledCode.split("\n");
      const extractedComponents = [];
      let currentComponent = [];
      let isCapturing = false;
      let capturedComponentName = "";
      const extractedComponentNames = []; // Track successfully extracted component names

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
            }

            capturedComponentName = match[1];
            isCapturing = true;
            currentComponent.push(line);
          }
          continue;
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

      // Generate export statement if there were any extracted components
      if (extractedComponentNames.length > 0) {
        // Add import statement at the beginning
        extractedComponents.unshift(
          'import styled from "styled-components";',
          ""
        );

        // Add export statement at the end
        extractedComponents.push(
          "\n// Export statement for the extracted components"
        );
        extractedComponents.push("export {");

        // Add each component name indented
        extractedComponentNames.forEach((name) => {
          extractedComponents.push(`    ${name},`);
        });

        extractedComponents.push("}");
      }

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
        <Subtitle>Extract and export styled components automatically</Subtitle>
      </Header>

      <MainContent>
        <InputSection>
          <InputContainer>
            <SectionTitle>Paste Styled Components Code</SectionTitle>
            <SectionInfo>
              Paste your styled-components file here to extract all components
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
              disabled={isExtracting || !styledCode}
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

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  text-align: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const LogoIcon = styled.span`
  font-size: 2rem;
  margin-right: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(6)};

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const InputSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SectionInfo = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  resize: vertical;
  transition: ${({ theme }) => theme.motion.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const StyledCodeTextarea = styled(StyledTextarea)`
  min-height: 300px;
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-2px);
  }
`;

const OutputSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ResultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing(3)};
  min-height: 400px;
  overflow: auto;
  position: relative;
`;

const ResultCode = styled.pre`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

const CopyButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.inverted};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  min-height: 400px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 80%;
`;

const Footer = styled.footer`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.875rem;
`;

export default ComponentExtractor;

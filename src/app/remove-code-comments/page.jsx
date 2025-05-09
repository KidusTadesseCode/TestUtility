"use client";
// src/app/remove-code-comments/page.jsx
import React, { useState, useEffect } from "react";
import {
  RemoveCodeCommentsContainer,
  Header,
  SubContainer,
  EditorContainer,
  EditorLabel,
  TextArea,
  ButtonContainer,
  Button,
  DisplayTextContainer,
  OutputLabel,
  OutputContent,
  StatusIndicator,
} from "./style";

function RemoveCodeComments() {
  const [codeContent, setCodeContent] = useState("");
  const [cleanedCode, setCleanedCode] = useState("");
  const [isProcessed, setIsProcessed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  useEffect(() => {
    if (activeAction) {
      const timer = setTimeout(() => {
        setActiveAction("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeAction]);

  const removeComments = (e) => {
    e.preventDefault();
    const regex = /\/\/\/.*|\/\/[^\n\r]*|\s*\/\*[\s\S]*?\*\//g;
    const trimmedCode = codeContent.replace(regex, "");
    setCleanedCode(trimmedCode);
    setIsProcessed(true);
    setActiveAction("remove-comments");
    return;
  };

  const removeEmptyLines = () => {
    const lines = isProcessed
      ? cleanedCode.split("\n")
      : codeContent.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim() !== "");
    const result = nonEmptyLines.join("\n");
    setCleanedCode(result);
    setIsProcessed(true);
    setActiveAction("remove-empty");
    return;
  };

  const toParagraph = (e) => {
    e.preventDefault();
    const paragraphs = isProcessed
      ? cleanedCode.split("\n").join(" ")
      : codeContent.split("\n").join(" ");
    setCleanedCode(paragraphs);
    setIsProcessed(true);
    setActiveAction("paragraph");
    return;
  };

  const handleCopyToClipboard = () => {
    if (cleanedCode) {
      navigator.clipboard.writeText(cleanedCode);
      setCopySuccess(true);
      setActiveAction("copy");
    }
  };

  const handleReset = () => {
    setCleanedCode("");
    setIsProcessed(false);
    setActiveAction("reset");
  };

  return (
    <RemoveCodeCommentsContainer>
      <Header>Remove Code Comments</Header>
      <SubContainer>
        <EditorContainer>
          <EditorLabel>
            <div>
              <StatusIndicator active={"true"} /> Input Code
            </div>
            <div>{codeContent.length} characters</div>
          </EditorLabel>
          <TextArea
            onChange={(e) => setCodeContent(e.target.value)}
            value={codeContent}
            placeholder="Paste your code here..."
            spellCheck="false"
          />
        </EditorContainer>

        <ButtonContainer>
          <Button
            variant="primary"
            onClick={removeComments}
            disabled={!codeContent}
          >
            {activeAction === "remove-comments"
              ? "Comments Removed!"
              : "Remove Comments"}
          </Button>

          <Button onClick={removeEmptyLines} disabled={!codeContent}>
            {activeAction === "remove-empty"
              ? "Empty Lines Removed!"
              : "Remove Empty Lines"}
          </Button>

          <Button onClick={toParagraph} disabled={!codeContent}>
            {activeAction === "paragraph" ? "Converted!" : "Paragraph Format"}
          </Button>

          <Button
            variant="secondary"
            onClick={handleCopyToClipboard}
            disabled={!cleanedCode}
          >
            {activeAction === "copy" ? "Copied!" : "Copy to Clipboard"}
          </Button>

          {isProcessed && (
            <Button onClick={handleReset}>
              {activeAction === "reset" ? "Reset!" : "Reset"}
            </Button>
          )}
        </ButtonContainer>

        <DisplayTextContainer>
          <OutputLabel>
            <div>
              <StatusIndicator active={isProcessed ? "true" : "false"} /> Output
            </div>
            <div>{cleanedCode.length} characters</div>
          </OutputLabel>
          <OutputContent id="displayedText">{cleanedCode}</OutputContent>
        </DisplayTextContainer>
      </SubContainer>
    </RemoveCodeCommentsContainer>
  );
}

export default RemoveCodeComments;

// component

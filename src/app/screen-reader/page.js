"use client";
// src/app/screen-reader/page.js
import React, { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { FaCopy, FaRegClipboard } from "react-icons/fa";
import { AiOutlineSelect } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";
import {
  Container,
  HeaderContainer,
  Title,
  IconWrapper,
  EditorSection,
  StyledTextArea,
  ActionBar,
  ActionButton,
  DisplaySection,
  DisplayText,
  SectionLabel,
  InfoBar,
  CharCount,
  StatusMessage,
} from "./style";

function ScreenReader() {
  const [text, setText] = useState("");
  const [processedText, setProcessedText] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const textAreaRef = useRef(null);
  const displayTextRef = useRef(null);

  const processText = (inputText) => {
    const toReplaceChar = [
      { char: "\\*", replaceWith: "" },
      { char: "\\`", replaceWith: "" },
      { char: "_", replaceWith: "" },
      { char: "--", replaceWith: "" },
      { char: "#", replaceWith: "" },
    ];

    let processedText = inputText;
    toReplaceChar.forEach(({ char, replaceWith }) => {
      const regex = new RegExp(char, "g");
      processedText = processedText.replace(regex, replaceWith);
    });
    return processedText;
  };

  const handleOnChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setProcessedText(processText(inputText));
  };

  const handleCopyText = (source) => {
    const textToCopy = source === "raw" ? text : processedText;
    navigator.clipboard.writeText(textToCopy);

    // Show copy status
    setCopyStatus(
      source === "raw" ? "Input copied!" : "Processed text copied!"
    );
    setTimeout(() => setCopyStatus(""), 2000);
  };

  const handleSelectText = (source) => {
    if (source === "raw" && textAreaRef.current) {
      textAreaRef.current.select();
    } else if (source === "processed" && displayTextRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(displayTextRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <IconWrapper>
          <BiBookReader size={28} />
        </IconWrapper>
        <Title>Screen Reader</Title>
      </HeaderContainer>

      <SectionLabel>Input Text</SectionLabel>
      <EditorSection>
        <InfoBar>
          <CharCount>{text.length} characters</CharCount>
          <AnimatePresence>
            {copyStatus === "Input copied!" && (
              <StatusMessage
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {copyStatus}
              </StatusMessage>
            )}
          </AnimatePresence>
        </InfoBar>
        <StyledTextArea
          ref={textAreaRef}
          onChange={handleOnChange}
          value={text}
          placeholder="Type or paste text here... Markdown characters will be automatically removed."
        />
        <ActionBar>
          <ActionButton
            onClick={() => handleCopyText("raw")}
            title="Copy input text"
          >
            <FaRegClipboard size={18} />
          </ActionButton>
          <ActionButton
            onClick={() => handleSelectText("raw")}
            title="Select all input text"
          >
            <AiOutlineSelect size={20} />
          </ActionButton>
        </ActionBar>
      </EditorSection>

      <AnimatePresence>
        {processedText && (
          <DisplaySection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <InfoBar>
              <SectionLabel>Processed Text</SectionLabel>
              <AnimatePresence>
                {copyStatus === "Processed text copied!" && (
                  <StatusMessage
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {copyStatus}
                  </StatusMessage>
                )}
              </AnimatePresence>
            </InfoBar>
            <DisplayText ref={displayTextRef}>{processedText}</DisplayText>
            <ActionBar>
              <ActionButton
                onClick={() => handleCopyText("processed")}
                title="Copy processed text"
              >
                <FaCopy size={18} />
              </ActionButton>
              <ActionButton
                onClick={() => handleSelectText("processed")}
                title="Select all processed text"
              >
                <AiOutlineSelect size={20} />
              </ActionButton>
            </ActionBar>
          </DisplaySection>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default ScreenReader;

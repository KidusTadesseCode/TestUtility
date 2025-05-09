"use client";
// src/component/ParseQuestion/index.js
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCopy,
  FaTrash,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";
import { parseQuestionText } from "./parseQuestionText";

import {
  ParseQuestionContainer,
  Header,
  HeaderTwo,
  SubContainer,
  Button,
  TextArea,
  DisplayTextContainer,
  ButtonContainer,
  ErrorContainer,
  TextAreaWrapper,
  CopyButton,
  SectionHeader,
  ResultSection,
  InfoBanner,
} from "./ParseQuestion.style";

function ParseQuestion() {
  const [text, setText] = useState("");
  const [newText, setNewText] = useState("");
  const [html, setHtml] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const [allContent, setAllContent] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [htmlError, setHtmlError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Reset errors when inputs change
  useEffect(() => {
    setErrorMessage(null);
    setHtmlError(null);
  }, [text, html]);

  // Combine processed text and HTML when either changes
  useEffect(() => {
    if (newHtml.length <= 0 || newText.length <= 0) return;
    allContentOnEffect();
  }, [newText, newHtml]);

  // Reset copy success message after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  // Combine the processed question and HTML
  const allContentOnEffect = () => {
    const val = newText + "\nHTML Code\n\n\n" + newHtml;
    setAllContent(val);
    return;
  };

  // Copy combined content to clipboard
  const handleCopyToClipboard = () => {
    if (newText.length === 0 || newHtml.length === 0) {
      setErrorMessage("Please enter both question and HTML content");
      return;
    }
    navigator.clipboard.writeText(allContent);
    setCopySuccess(true);
    return;
  };

  // Process question text
  const textAreaOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setText(value);
    if (value.length === 0) return;
    const question = parseQuestionText(value);
    setNewText(question);
    return;
  };

  // Process HTML code
  const htmlAreaOnChange = (e) => {
    e.preventDefault();
    const value = String(e.target.value);
    setHtml(value);
    if (!value.includes("<html")) {
      setHtmlError("Invalid HTML - must include <html> tag");
      return;
    }
    const splitVal = value.split("\n");
    let newCode = "";
    for (let x = 0; x < splitVal.length; x++) {
      const val = splitVal[x];
      if (val.replaceAll(" ", "") === "") continue;
      newCode = newCode.length > 0 ? newCode + "\n" + val : val;
    }
    const newHtmlValue = String(newCode);
    setNewHtml(newHtmlValue);
    return;
  };

  // Clear all inputs and states
  const clearAllText = (e) => {
    e.preventDefault();
    setText("");
    setNewText("");
    setHtml("");
    setNewHtml("");
    setAllContent("");
    setErrorMessage(null);
    setHtmlError(null);
    return;
  };

  return (
    <ParseQuestionContainer>
      <Header>Question and HTML Parser</Header>

      <InfoBanner>
        I am going to provide you with a question with HTML code. Your job will
        be to answer the question based on the HTML code that I will provide
        you. Let me know when you are ready to start!
      </InfoBanner>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <ErrorContainer>
              <FaExclamationTriangle />
              {errorMessage}
            </ErrorContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <SubContainer>
        <SectionHeader>
          <HeaderTwo>Question Input</HeaderTwo>
          <ButtonContainer>
            <Button onClick={clearAllText} whileTap={{ scale: 0.97 }}>
              <FaTrash size={14} />
              Clear All
            </Button>
          </ButtonContainer>
        </SectionHeader>

        <TextAreaWrapper>
          <TextArea
            id="textArea"
            $expand={text.length > 0 ? "true" : "false"}
            value={text}
            onChange={textAreaOnChange}
            placeholder="Paste your question here..."
          />
        </TextAreaWrapper>

        <SectionHeader>
          <HeaderTwo>
            HTML Input
            <AnimatePresence>
              {htmlError && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ErrorContainer>
                    <FaExclamationTriangle />
                    {htmlError}
                  </ErrorContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </HeaderTwo>
        </SectionHeader>

        <TextAreaWrapper>
          <TextArea
            id="htmlArea"
            $expand={html.length > 0 ? "true" : "false"}
            value={html}
            onChange={htmlAreaOnChange}
            placeholder="Paste your HTML code here..."
            $error={htmlError}
          />
          <CopyButton
            onClick={handleCopyToClipboard}
            id="copyTextArea"
            whileTap={{ scale: 0.9 }}
            title="Copy to clipboard"
          >
            {copySuccess ? (
              <FaCheck size={18} color="#4CAF50" />
            ) : (
              <FaCopy size={18} />
            )}
          </CopyButton>
        </TextAreaWrapper>

        {allContent && (
          <ResultSection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeaderTwo>Processed Output</HeaderTwo>
            <DisplayTextContainer id="displayedText">
              {allContent}
            </DisplayTextContainer>
          </ResultSection>
        )}
      </SubContainer>
    </ParseQuestionContainer>
  );
}

export default ParseQuestion;

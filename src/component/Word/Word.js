import React, { useState } from "react";
import {
  WordContainer,
  Header,
  SubContainer,
  Button,
  ButtonContainer,
  TextArea,
  DisplayTextContainer,
} from "./Word_style";

function Word() {
  const [originalText, setOriginalText] = useState([""]);
  const [originalTextStack, setOriginalTextStack] = useState([""]);
  const [pointer, setPointer] = useState(0);
  const [redoStack, setRedoStack] = useState([]);

  const pushToOriginalText = (value) => {
    setOriginalTextStack((prev) => [...prev.slice(0, pointer + 1), value]);
    setPointer((prev) => prev + 1);
    setRedoStack([]); // Clear redo stack on new action
  };

  const undo = (e) => {
    e.preventDefault();
    if (pointer > 0) {
      setRedoStack((prev) => [originalTextStack[pointer], ...prev]);
      setPointer((prev) => prev - 1);
    }
  };

  const redo = (e) => {
    e.preventDefault();
    if (redoStack.length > 0) {
      setPointer((prev) => prev + 1);
      setOriginalTextStack((prev) => [...prev, redoStack[0]]);
      setRedoStack((prev) => prev.slice(1));
    }
  };

  const textOnChange = (e) => {
    e.preventDefault();
    pushToOriginalText(e.target.value);
    setOriginalText(e.target.value);
  };

  const handleCopyToClipboard = () => {
    if (originalTextStack[pointer]) {
      navigator.clipboard.writeText(originalTextStack[pointer]);
    }
  };

  const uniqueWord = (e) => {
    e.preventDefault();
    if (!originalTextStack[pointer]) return;
    const words = originalTextStack[pointer].split(" ");
    const uniqueWords = Array.from(new Set(words)).join(" ");
    pushToOriginalText(uniqueWords);
  };

  const upperCaseWords = (e) => {
    e.preventDefault();
    if (!originalTextStack[pointer]) return;
    const words = originalTextStack[pointer].split(" ");
    const upperCaseWords = words.map((word) => word.toUpperCase()).join(" ");
    pushToOriginalText(upperCaseWords);
  };

  const alphabeticalOrder = (e) => {
    e.preventDefault();
    if (!originalTextStack[pointer]) return;
    const words = originalTextStack[pointer].split(" ");
    const sortedWords = words
      .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
      .join(" ");
    pushToOriginalText(sortedWords);
  };
  return (
    <WordContainer>
      <Header>Word Processor</Header>
      <SubContainer>
        <TextArea
          onChange={textOnChange}
          // value={originalTextStack[pointer] || ""}
          value={originalText}
        />
        <ButtonContainer>
          <Button onClick={uniqueWord}>Unique Words</Button>
          <Button onClick={upperCaseWords}>Upper Case Words</Button>
          <Button onClick={alphabeticalOrder}>Alphabetical Order</Button>
          <Button onClick={undo} disabled={pointer === 0}>
            Undo
          </Button>
          <Button onClick={redo} disabled={redoStack.length === 0}>
            Redo
          </Button>
          <Button onClick={handleCopyToClipboard}>Copy</Button>
        </ButtonContainer>
        {originalTextStack[pointer] && (
          <DisplayTextContainer>
            {originalTextStack[pointer]}
          </DisplayTextContainer>
        )}
      </SubContainer>
    </WordContainer>
  );
}

export default Word;

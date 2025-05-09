// src/app/text-diff-viewer/page.js
"use client";
import { useState, useEffect, useRef } from "react";
import { BiCopy, BiCheckCircle } from "react-icons/bi";
import {
  Container,
  Header,
  Title,
  Description,
  DiffContainer,
  TextAreaColumn,
  ColumnHeader,
  ColumnLabel,
  TextAreaWrapper,
  TextArea,
  LineNumbers,
  LineNumber,
  ResultsSection,
  SectionTitle,
  DiffVisualizer,
  DiffLine,
  LineContent,
  InlineLineNumber,
  AddedText,
  RemovedText,
  Icon,
  SmallIcon,
  Button,
  ControlsContainer,
  ButtonGroup,
  ExampleButton,
  CopyButton,
  IconWrapper,
} from "./style";

// Example code snippets
const codeExamples = {
  javascript: {
    left: `function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
}`,
    right: `function calculateTotal(items) {
  // Add tax calculation
  const subtotal = items
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  
  return subtotal * 1.07; // Add 7% tax
}`,
  },
  css: {
    left: `.button {
  color: #333;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}`,
    right: `.button {
  color: white;
  background-color: #4285f4;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}`,
  },
  text: {
    left: `The quick brown fox jumps over the lazy dog.
This is a simple paragraph for testing.
It contains multiple lines of text.`,
    right: `The quick brown fox jumped over a lazy dog.
This is a different paragraph for testing.
It contains multiple lines of modified text.
Here's an extra line that was added.`,
  },
};

// Simple character diff function
function findCharacterDiff(oldStr, newStr) {
  if (oldStr === newStr) {
    return [{ type: "same", content: oldStr }];
  }

  const diff = [];

  // Find common prefix
  let i = 0;
  while (i < oldStr.length && i < newStr.length && oldStr[i] === newStr[i]) {
    i++;
  }

  if (i > 0) {
    diff.push({ type: "same", content: oldStr.substring(0, i) });
  }

  // Find common suffix
  let j = oldStr.length - 1;
  let k = newStr.length - 1;
  let suffixLength = 0;

  while (j >= i && k >= i && oldStr[j] === newStr[k]) {
    j--;
    k--;
    suffixLength++;
  }

  // Add the different parts
  if (j >= i) {
    diff.push({ type: "removed", content: oldStr.substring(i, j + 1) });
  }

  if (k >= i) {
    diff.push({ type: "added", content: newStr.substring(i, k + 1) });
  }

  // Add the common suffix
  if (suffixLength > 0) {
    diff.push({
      type: "same",
      content: oldStr.substring(oldStr.length - suffixLength),
    });
  }

  return diff;
}

export default function TextDiffViewer() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");
  const [diffResult, setDiffResult] = useState([]);
  const [copyLeftSuccess, setCopyLeftSuccess] = useState(false);
  const [copyRightSuccess, setCopyRightSuccess] = useState(false);

  const leftTextAreaRef = useRef(null);
  const rightTextAreaRef = useRef(null);

  // Calculate diff when text changes
  useEffect(() => {
    // Calculate line-by-line diff
    const left = leftText.split("\n");
    const right = rightText.split("\n");

    const result = [];
    const maxLines = Math.max(left.length, right.length);

    for (let i = 0; i < maxLines; i++) {
      const leftLine = i < left.length ? left[i] : "";
      const rightLine = i < right.length ? right[i] : "";

      if (leftLine === rightLine) {
        result.push({
          type: "same",
          lineNumber: i + 1,
          content: leftLine,
        });
      } else {
        // Get character-level diff
        const charDiff = findCharacterDiff(leftLine, rightLine);

        result.push({
          type: "diff",
          leftLineNumber: i + 1,
          rightLineNumber: i + 1,
          charDiff,
        });
      }
    }

    setDiffResult(result);
  }, [leftText, rightText]);

  const loadExample = (exampleType) => {
    const example = codeExamples[exampleType];
    setLeftText(example.left);
    setRightText(example.right);
  };

  const copyToClipboard = async (text, side) => {
    try {
      await navigator.clipboard.writeText(text);
      if (side === "left") {
        setCopyLeftSuccess(true);
        setTimeout(() => setCopyLeftSuccess(false), 2000);
      } else {
        setCopyRightSuccess(true);
        setTimeout(() => setCopyRightSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const renderCharDiff = (charDiff) => {
    return charDiff.map((segment, index) => {
      if (segment.type === "same") {
        return <span key={index}>{segment.content}</span>;
      } else if (segment.type === "added") {
        return <AddedText key={index}>{segment.content}</AddedText>;
      } else if (segment.type === "removed") {
        return <RemovedText key={index}>{segment.content}</RemovedText>;
      }
      return null;
    });
  };

  // Generate line numbers for the text areas
  const renderLineNumbers = (text) => {
    if (!text) return null;

    const lines = text.split("\n");
    return (
      <LineNumbers>
        {lines.map((_, i) => (
          <LineNumber key={i}>{i + 1}</LineNumber>
        ))}
      </LineNumbers>
    );
  };

  return (
    <Container>
      <Header>
        <Icon />
        <Title>Text Diff Viewer</Title>
      </Header>
      <Description>
        Compare two texts or code snippets and visualize the differences between
        them. Simply paste or type your content in the text boxes below.
      </Description>

      <ControlsContainer>
        <ButtonGroup>
          <ExampleButton onClick={() => loadExample("javascript")}>
            JavaScript Example
          </ExampleButton>
          <ExampleButton onClick={() => loadExample("css")}>
            CSS Example
          </ExampleButton>
          <ExampleButton onClick={() => loadExample("text")}>
            Text Example
          </ExampleButton>
        </ButtonGroup>

        <ButtonGroup>
          <Button
            onClick={() => {
              setLeftText("");
              setRightText("");
            }}
          >
            Clear Both
          </Button>
        </ButtonGroup>
      </ControlsContainer>

      <DiffContainer>
        <TextAreaColumn>
          <ColumnHeader>
            <ColumnLabel>Original</ColumnLabel>
            <CopyButton
              onClick={() => copyToClipboard(leftText, "left")}
              disabled={!leftText}
            >
              <IconWrapper>
                {copyLeftSuccess ? <BiCheckCircle /> : <BiCopy />}
              </IconWrapper>
              {copyLeftSuccess ? "Copied!" : "Copy"}
            </CopyButton>
          </ColumnHeader>
          <TextAreaWrapper>
            {renderLineNumbers(leftText)}
            <TextArea
              ref={leftTextAreaRef}
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Enter your original text or code here..."
              spellCheck="false"
              style={{ paddingLeft: "50px" }}
            />
          </TextAreaWrapper>
        </TextAreaColumn>

        <TextAreaColumn>
          <ColumnHeader>
            <ColumnLabel>Modified</ColumnLabel>
            <CopyButton
              onClick={() => copyToClipboard(rightText, "right")}
              disabled={!rightText}
            >
              <IconWrapper>
                {copyRightSuccess ? <BiCheckCircle /> : <BiCopy />}
              </IconWrapper>
              {copyRightSuccess ? "Copied!" : "Copy"}
            </CopyButton>
          </ColumnHeader>
          <TextAreaWrapper>
            {renderLineNumbers(rightText)}
            <TextArea
              ref={rightTextAreaRef}
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Enter your modified text or code here..."
              spellCheck="false"
              style={{ paddingLeft: "50px" }}
            />
          </TextAreaWrapper>
        </TextAreaColumn>
      </DiffContainer>

      {(leftText || rightText) && (
        <ResultsSection>
          <SectionTitle>
            <SmallIcon />
            Differences
          </SectionTitle>
          <DiffVisualizer>
            {diffResult.map((line, index) => {
              if (line.type === "same") {
                return (
                  <DiffLine key={`same-${index}`}>
                    <InlineLineNumber>{line.lineNumber}</InlineLineNumber>
                    <LineContent>{line.content}</LineContent>
                  </DiffLine>
                );
              } else {
                return (
                  <DiffLine
                    key={`diff-${index}`}
                    background={
                      line.charDiff.some((c) => c.type === "removed")
                        ? "rgba(244, 67, 54, 0.05)"
                        : "rgba(76, 175, 80, 0.05)"
                    }
                  >
                    <InlineLineNumber>{line.leftLineNumber}</InlineLineNumber>
                    <LineContent>{renderCharDiff(line.charDiff)}</LineContent>
                  </DiffLine>
                );
              }
            })}
          </DiffVisualizer>
        </ResultsSection>
      )}
    </Container>
  );
}

import React, { useState } from "react";
import {
  RemoveCodeCommentsContainer,
  Header,
  TextArea,
  SubContainer,
  DisplayTextContainer,
  ButtonContainer,
  Button,
} from "./RemoveCodeComments_style";
// const l = console.log;
function RemoveCodeComments() {
  const [codeContent, setCodeContent] = useState("");
  const [cleanedCode, setCleanedCode] = useState("");
  const removeComments = (e) => {
    e.preventDefault();
    const regex = /\/\/\/.*|\/\/[^\n\r]*|\s*\/\*[\s\S]*?\*\//g;
    const trimmedCode = codeContent.replace(regex, "");
    // setCodeContent(codeContent);
    setCleanedCode(trimmedCode);
    return;
  };
  const removeEmptyLines = () => {
    let lines;
    if (!cleanedCode) lines = codeContent;
    else lines = cleanedCode;
    lines = lines.split("\n");
    const nonEmptyLines = lines.filter((line) => line.trim() !== "");
    const result = nonEmptyLines.join("\n");
    setCleanedCode(result);
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(cleanedCode);
  };
  const toParagraph = (e) => {
    e.preventDefault();
    const paragraphs = codeContent.split("\n").join(" ");
    setCleanedCode(paragraphs);
    return;
  };
  return (
    <RemoveCodeCommentsContainer>
      <Header>Remove Code Comments</Header>
      <SubContainer>
        <TextArea
          onChange={(e) => setCodeContent(e.target.value)}
          value={codeContent}
          placeholder="Paste your code here..."
        />
        <ButtonContainer>
          <Button onClick={removeComments}>Remove Comments</Button>
          <Button onClick={removeEmptyLines}>Remove Empty Lines</Button>
          <Button onClick={toParagraph}>Paragraph Format</Button>
          <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
        </ButtonContainer>
        <DisplayTextContainer id="displayedText">
          {cleanedCode}
        </DisplayTextContainer>
      </SubContainer>
    </RemoveCodeCommentsContainer>
  );
}

export default RemoveCodeComments;

import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import {
  ParseQuestionContainer,
  Header,
  HeaderTwo,
  SubContainer,
  Button,
  TextArea,
  DisplayTextContainer,
  ButtonContainer,
  WrapperContainer,
  IconContainer,
  ErrorContanier,
} from "./ParseQuestion_style";
import { FaCopy } from "react-icons/fa";
import { parseQuestionText } from "./parseQuestionText";
// import { l } from "@zufan_devops/console";

function ParseQuestion() {
  const [text, setText] = useState("");
  const [newText, setNewText] = useState("");

  const [html, setHtml] = useState("");
  const [newHtml, setNewHtml] = useState("");

  const [allContent, setAllContent] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  const [htmlError, setHtmlError] = useState(null);

  useEffect(() => {
    if (newHtml.length <= 0 || newText.length <= 0) return;
    allContentOnEffect();
  }, [newText, newHtml]);

  useEffect(() => {
    setErrorMessage(null);
    setHtmlError(null);
  }, [text, html]);

  const allContentOnEffect = (field, value) => {
    const val = newText + "\nHTML Code\n\n\n" + newHtml;
    setAllContent(val);
    return;
  };
  const handleCopyToClipboard = () => {
    if (newText.length === 0 || newHtml.length === 0) {
      setErrorMessage("No data to copy");
      return;
    }
    navigator.clipboard.writeText(allContent);
    return;
  };
  const textAreaOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setText(value);
    if (value.length === 0) return;
    const question = parseQuestionText(value);
    setNewText(question);
    return;
  };

  const htmlAreaOnChange = (e) => {
    e.preventDefault();
    const value = String(e.target.value);
    setHtml(value);
    if (!value.includes("<html")) {
      setHtmlError("Invalid HTML");
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
  const clearAllTest = (e) => {
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
      <Header>On a new Prompt make sure to past this in: </Header>
      <DisplayTextContainer>
        I am going to provide you with a question with html code. You job will
        be to answer the question based on the html code that I will provide
        you. Let me know when you are ready to start!{" "}
      </DisplayTextContainer>
      {errorMessage && <Header>{errorMessage}</Header>}
      <SubContainer>
        <HeaderTwo>Past Your Question Here</HeaderTwo>
        <ButtonContainer>
          <Button onClick={clearAllTest}>Clear</Button>
        </ButtonContainer>
        <TextArea
          id="textArea"
          expand={text.length > 0}
          value={text}
          onChange={textAreaOnChange}
        />
        {/* Html Content */}
        <HeaderTwo>
          Past the HTML Here
          {htmlError && (
            <ErrorContanier>
              <Header>{htmlError}</Header>
            </ErrorContanier>
          )}
        </HeaderTwo>
        <TextArea
          id="textArea"
          expand={html.length > 0}
          value={html}
          onChange={htmlAreaOnChange}
        ></TextArea>
        <IconContainer>
          <WrapperContainer onClick={handleCopyToClipboard} id="copyTextArea">
            <FaCopy size={20} />
          </WrapperContainer>
        </IconContainer>
        {allContent && (
          <>
            <DisplayTextContainer id="displayedText">
              {allContent}
            </DisplayTextContainer>
          </>
        )}
      </SubContainer>
    </ParseQuestionContainer>
  );
}
export default ParseQuestion;

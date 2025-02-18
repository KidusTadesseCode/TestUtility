import React, { useState } from "react";
import {
  ScreenReaderContainer,
  Header,
  TextArea,
  DisplayTextContainer,
  SubContainer,
  IconContainer,
  WrapperContainer,
} from "./ScreenReader_style";
// import { l } from "@zufan_devops/console";
import { FaCopy } from "react-icons/fa";
import { AiOutlineSelect } from "react-icons/ai";

function ScreenReader() {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    let inputText = e.target.value;
    const toReplaceChar = [
      { char: "\\*", replaceWith: "" },
      { char: "\\`", replaceWith: "" },
      { char: "_", replaceWith: "" },
      { char: "--", replaceWith: "" },
      { char: "#", replaceWith: "" },
    ];

    toReplaceChar.forEach(({ char, replaceWith }) => {
      const regex = new RegExp(char, "g");
      inputText = inputText.replace(regex, replaceWith);
    });
    setText(inputText);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const handleSelectText = (e, id) => {
    if (id === "selectTextArea") {
      const textarea = document.querySelector("textarea"); // Select the raw text textarea
      if (textarea) {
        textarea.select();
        return;
      }
    } else if (id === "selectDisplayedText") {
      const displayedTextContainer = document.getElementById("displayedText");
      if (displayedTextContainer) {
        const range = document.createRange(); // Create a range object
        const selection = window.getSelection(); // Get the selection object
        range.selectNodeContents(displayedTextContainer); // Select the contents of the container
        selection.removeAllRanges(); // Clear any existing selection
        selection.addRange(range); // Add the new range to the selection
        return;
      }
    }
  };

  return (
    <ScreenReaderContainer>
      <Header>Screen Reader</Header>

      {/* Text Input Section */}
      <SubContainer>
        <TextArea
          onChange={handleOnChange}
          value={text}
          placeholder="Type here..."
        />
        <IconContainer>
          <WrapperContainer onClick={handleCopyToClipboard} id="copyTextArea">
            <FaCopy size={20} />
          </WrapperContainer>
          <WrapperContainer
            onClick={(e) => handleSelectText(e, "selectTextArea")}
            id="selectTextArea"
          >
            <AiOutlineSelect size={20} />
          </WrapperContainer>
        </IconContainer>
      </SubContainer>

      {/* Displayed Text Section */}
      {text && text !== "" && (
        <SubContainer>
          <DisplayTextContainer id="displayedText">{text}</DisplayTextContainer>
          <IconContainer>
            <WrapperContainer
              onClick={handleCopyToClipboard}
              id="copyDisplayedText"
            >
              <FaCopy size={20} />
            </WrapperContainer>
            <WrapperContainer
              onClick={(e) => handleSelectText(e, "selectDisplayedText")}
              id="selectDisplayedText"
            >
              <AiOutlineSelect size={20} />
            </WrapperContainer>
          </IconContainer>
        </SubContainer>
      )}
    </ScreenReaderContainer>
  );
}

export default ScreenReader;

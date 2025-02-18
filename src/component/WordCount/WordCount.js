import React, { useEffect, useState } from "react";
import {
  WordCountContainer,
  Header,
  SubContainer,
  Button,
  TextArea,
  DisplayTextContainer,
  ButtonContainer,
} from "./WordCount_style";

function WordCount() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState([]);
  const textAreaOnChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const cleanedVal = value.replace(/[^a-zA-Z0-9]/g, " ");
    const splitVal = cleanedVal.split(" ");
    const blackList = ["the", "is", "of", "in", "and", "or", "has", "at"];
    const uniqueSet = new Set();
    for (let w of splitVal) {
      if (w.length > 1 && !blackList.includes(w)) uniqueSet.add(w);
    }
    const uniqueValues = Array.from(uniqueSet, (x) => [
      x,
      splitVal.filter((val) => {
        const v = val.toLowerCase();
        if (val === x && val.length > 1 && !v.includes(blackList)) return val;
      }).length,
    ]);
    const sortedUniqueValues = uniqueValues.sort((a, b) => b[1] - a[1]);
    setText(value);
    setWordCount(sortedUniqueValues);
    return;
  };
  return (
    <WordCountContainer>
      <Header>WordCount</Header>
      <SubContainer>
        <TextArea id="textArea" value={text} onChange={textAreaOnChange} />
        {wordCount.length > 0 && (
          <DisplayTextContainer>
            {wordCount.map((item, index) => {
              return (
                <div key={index}>
                  {item[0]} : {item[1]}
                </div>
              );
            })}
          </DisplayTextContainer>
        )}
        <ButtonContainer>
          <Button onClick={() => setText("")}>Clear</Button>
        </ButtonContainer>
      </SubContainer>
    </WordCountContainer>
  );
}
export default WordCount;

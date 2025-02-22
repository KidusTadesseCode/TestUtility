import React, { useEffect, useState } from "react";
import { ExportStyledComponentsContainer } from "./ExportStyledComponents_style";
import { Header, SubContainer, TextArea } from "../GlobalStyling/GlobalStyling";
const l = console.log;
function ExportStyledComponents() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!code || code.replaceAll(" ", "") === "") return;
    const lines = code.split("\n");
    let output = "{";
    for (const line of lines) {
      if (line.replaceAll(" ", "") === "") continue;
      if (!line.startsWith("const")) continue;
      const splitLine = line.split(" ");
      const componentName = splitLine[1];
      if (!componentName) continue;
      if (componentName.endsWith(":")) continue;
      output = output + `${componentName}, `;
    }
    // output = output + "}";
    output = output.slice(0, -2) + " }";
    setOutput(output);
  }, [code]);

  const handleTextChange = (event) => {
    event.preventDefault();
    setCode(event.target.value);
  };

  return (
    <ExportStyledComponentsContainer>
      <Header>ExportStyledComponents</Header>
      <SubContainer>
        <TextArea onChange={handleTextChange}>{code}</TextArea>
      </SubContainer>
      <SubContainer />
      <SubContainer>
        <TextArea readOnly value={output} />
      </SubContainer>
    </ExportStyledComponentsContainer>
  );
}
export default ExportStyledComponents;

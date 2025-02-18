import React from "react";
import { TestContainer, Header, Box, Section } from "./Test_style";
// import { l } from "@zufan_devops/console";
function Test() {
  const bkColors = [
    "linear-gradient(135deg, #ff7eb3, #ff758c)",
    "linear-gradient(135deg, #2575fc, #6a11cb)",
    "linear-gradient(135deg, #89f7fe, #66a6ff)",
    "linear-gradient(135deg, #fddb92, #d1fdff)",
    "linear-gradient(90deg, #d1fdff, #fddb92)",
  ];

  const hamburgerIconColors = [
    "#ff789a",
    "#4174dc",
    "#77d7ff",
    "#f2e8c4",
    "#eaeed7",
  ];

  // const linkColor = ["#ffffff"];
  const linkHoverEffect = [
    `linear-gradient(90deg, #ff758c, #ff7eb3)`,
    `linear-gradient(90deg, #6a11cb, #2575fc)`,
    `linear-gradient(90deg, #66a6ff, #89f7fe)`,
    `linear-gradient(90deg, #d1fdff, #fddb92)`,
    "#66a6ff",
  ];
  return (
    <TestContainer>
      <Header>Test</Header>
      <Section>
        hamburgerIconColors
        {hamburgerIconColors &&
          hamburgerIconColors.map((color, index) => {
            return (
              <Box bkColors={color} key={index}>
                {index}
              </Box>
            );
          })}
      </Section>
      <Section>
        bkColors
        {bkColors &&
          bkColors.map((color, index) => {
            return (
              <Box bkColors={color} key={index}>
                {index}
              </Box>
            );
          })}
      </Section>
      <Section>
        linkHoverEffect
        {linkHoverEffect &&
          linkHoverEffect.map((color, index) => {
            return (
              <Box bkColors={color} key={index}>
                {index}
              </Box>
            );
          })}
      </Section>
    </TestContainer>
  );
}
export default Test;

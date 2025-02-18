import styled from "styled-components";

const bkColors = [
  "linear-gradient(135deg, #ff7eb3, #ff758c)",
  "linear-gradient(135deg, #2575fc, #6a11cb)",
  "linear-gradient(135deg, #89f7fe, #66a6ff)",
  "linear-gradient(135deg, #fddb92, #d1fdff)",
  "linear-gradient(90deg, #d1fdff, #fddb92)",
  "#333333",
  "#ff7eb3",
];
// const linkColor = ["#ffffff"];
// const linkHoverEffect = [
//   "linear-gradient(90deg, #ff758c, #ff7eb3)",
//   "linear-gradient(90deg, #6a11cb, #2575fc)",
//   "linear-gradient(90deg, #66a6ff, #89f7fe)",
//   "linear-gradient(90deg, #d1fdff, #fddb92)",
//   "#66a6ff",
// ];

export const TestContainer = styled.div`
  /* background: linear-gradient(135deg, #6a11cb, #2575fc); */
  /* background-color: white; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Arial", sans-serif;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 95%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  /* border: 1px solid red; */
`;
export const Header = styled.div``;

export const Box = styled.div`
  /* background: ${bkColors[0]}; */
  /* background: ${bkColors[1]}; */
  /* background: ${bkColors[2]}; */
  /* background: ${bkColors[3]}; */
  /* background: ${bkColors[4]}; */
  /* background: ${bkColors[5]}; */
  /* background: ${bkColors[6]}; */
  /* background: linear-gradient(135deg, #fddb92, #d1fdff); */
  background: ${(props) => props.bkColors};
  text-align: center;
  width: 100%;
  height: 30px;
  border: 3px solid red;
`;

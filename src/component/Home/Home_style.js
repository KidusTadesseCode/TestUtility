// src/component/Home/Home_style.js
import styled from "styled-components";
import { Header } from "../GlobalStyling/GlobalStyling";

export const HomeContainer = styled.div`
  padding: 4rem 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Arial", sans-serif;
`;

// In GlobalStyling.js
export { Header };

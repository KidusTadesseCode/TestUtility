// src/component/ScreenReader/ScreenReader_style.js
import styled from "styled-components";
import { Header } from "../GlobalStyling/GlobalStyling";
import { SubContainer } from "../GlobalStyling/GlobalStyling";
import { TextArea } from "../GlobalStyling/GlobalStyling";
export const ScreenReaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Arial", sans-serif;
  row-gap: 3rem;
`;

// In GlobalStyling.js
export { Header };

// In GlobalStyling.js
export { SubContainer };

export { TextArea };

export const DisplayTextContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: rgba(30, 30, 30, 0.9); /* Dark background */
  color: #ffffff; /* White text for contrast */
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* Slightly darker shadow */
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  &:hover {
    background-color: rgba(45, 45, 45, 1); /* Slightly lighter on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
  }
`;
export const IconContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 9%;
`;
export const WrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  cursor: pointer;
  background-color: rgba(45, 45, 45, 0.9); /* Dark background for the icon */
  color: #ffffff; /* Icon color */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); /* Shadow for a button-like effect */
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(60, 60, 60, 1); /* Slightly lighter on hover */
  }

  &:active {
    background-color: rgba(80, 80, 80, 1); /* Even lighter on click */
  }
`;

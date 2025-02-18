// src/component/ParseQuestion/ParseQuestion_style.js
import styled from "styled-components";
import { SubContainer } from "../GlobalStyling/GlobalStyling";
import { TextArea } from "../GlobalStyling/GlobalStyling";
export const ParseQuestionContainer = styled.div`
  display: grid;
  place-items: center;
`;
export const Header = styled.div`
  color: red;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// In GlobalStyling.js
export const HeaderTwo = styled.h2`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// In GlobalStyling.js
export { SubContainer };

export const Button = styled.button`
  background: linear-gradient(135deg, rgb(67, 76, 238), #000dff);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background: linear-gradient(135deg, #000dff, #6b73ff);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

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

export const ButtonContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
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

export const IconContainer = styled.div`
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 9%;
`;

export const ErrorContanier = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

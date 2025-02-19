import styled from "styled-components";
import { FaCopy, FaTrash } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

export const Header = styled.div`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const HeaderTwo = styled.h2`
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 95%;
  /* background: rgba(255, 255, 255, 0.1); */
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  row-gap: 1.5rem;
`;

export const TextArea = styled.textarea`
  background-color: rgba(30, 30, 30, 0.9); /* Dark background color */
  color: #ffffff; /* White text for contrast */
  width: 100%;
  height: 120px;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  outline: none;
  resize: none;

  &:focus {
    border: 2px solid #ff7eb3;
    background-color: rgba(30, 30, 30, 1);
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
`;

export const CopyIcon = styled(FaCopy)`
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  margin-left: 1rem;
`;

export const CheckIcon = styled(IoCheckmark)`
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  margin-left: 1rem;
`;

export const TrashIcon = styled(FaTrash)`
  cursor: pointer;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  margin-left: 1rem;
`;

// In GlobalStyling.js
/*
import { TextArea } from "../GlobalStyling/GlobalStyling";
export { TextArea };
*/

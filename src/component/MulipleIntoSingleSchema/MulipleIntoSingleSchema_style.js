// src/component/MulipleIntoSingleSchema/MulipleIntoSingleSchema_style.js
import styled from "styled-components";
import { FaCopy, FaTrash } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";

import {
  IconContainer,
  CopyIcon,
  CheckIcon,
  TrashIcon,
} from "../GlobalStyling/GlobalStyling";

export const MulipleIntoSingleSchemaContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: "Arial", sans-serif;
  row-gap: 3rem;
  width: 90%;
  margin: 0 auto;
`;

export const UploadContainer = styled.div`
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background: none;
  border-radius: 10px;
`;

export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

export const FileItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
`;

export const DisplaySchemaContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  pre {
    margin: 0 auto;
    background-color: rgba(30, 30, 30, 0.9);
    color: #ffffff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  h3 {
    text-align: center;
  }
`;

export { IconContainer, CopyIcon, CheckIcon, TrashIcon };

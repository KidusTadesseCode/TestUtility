// src/component/ParseQuestion/ParseQuestion.style.js
import styled from "styled-components";
import { motion } from "framer-motion";

export const ParseQuestionContainer = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
`;

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.75rem;
`;

export const HeaderTwo = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: ${({ $expand }) => ($expand === "true" ? "240px" : "120px")};
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.secondary};

  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  transition: ${({ theme }) => theme.motion.smooth};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  align-self: flex-end;
`;

export const DisplayTextContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

export const Button = styled(motion.button)`
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  background-color: ${({ theme, variant }) =>
    variant === "primary" ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary"
        ? theme.colors.primaryHover
        : theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CopyButton = styled(motion.button)`
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)};
  bottom: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.accent};
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => theme.spacing(1.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.elevation.low};
  transition: ${({ theme }) => theme.motion.quick};
  z-index: 2;

  &:hover {
    transform: scale(1.05);
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const ErrorContainer = styled(motion.div)`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const ResultSection = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

export const InfoBanner = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  line-height: 1.5;
`;

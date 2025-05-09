// src/app/screen-reader/style.js
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0 ${({ theme }) => theme.spacing(2)};
`;

const IconWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.primary};
`;

const EditorSection = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(0.5)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  position: relative;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 180px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  resize: vertical;
  outline: none;
  transition: ${({ theme }) => theme.motion.smooth};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 0 0 ${({ theme }) => `${theme.radii.md} ${theme.radii.md}`};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const DisplaySection = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  box-shadow: ${({ theme }) => theme.elevation.low};
  margin-top: ${({ theme }) => theme.spacing(4)};
  overflow: hidden;
`;

const DisplayText = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1rem;
  line-height: 1.6;
  min-height: 120px;
  white-space: pre-wrap;
`;

const SectionLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
`;

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const CharCount = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const StatusMessage = styled(motion.div)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(3)};
  right: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.text.inverted};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.75rem;
  pointer-events: none;
  box-shadow: ${({ theme }) => theme.elevation.low};
`;

export {
  Container,
  HeaderContainer,
  Title,
  IconWrapper,
  EditorSection,
  StyledTextArea,
  ActionBar,
  ActionButton,
  DisplaySection,
  DisplayText,
  SectionLabel,
  InfoBar,
  CharCount,
  StatusMessage,
};

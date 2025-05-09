import styled from "styled-components";
import { BiGitCompare, BiCopy, BiCheckCircle } from "react-icons/bi";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  font-size: 1.1rem;
  line-height: 1.5;
`;

const DiffContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextAreaColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ColumnLabel = styled.h3`
  font-family: ${({ theme }) => theme.typography.font.heading};
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const TextAreaWrapper = styled.div`
  position: relative;
  height: 400px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.elevation.medium};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  transition: ${({ theme }) => theme.motion.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const LineNumbers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2)} 0;
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 14px;
  line-height: 1.5;
  text-align: right;
  color: ${({ theme }) => theme.colors.text.tertiary};
  user-select: none;
  overflow: hidden;
`;

const LineNumber = styled.div`
  padding: 0 8px 0 0;
`;

const ResultsSection = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  box-shadow: ${({ theme }) => theme.elevation.medium};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.font.heading};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const DiffVisualizer = styled.div`
  font-family: ${({ theme }) => theme.typography.font.mono};
  white-space: pre-wrap;
  line-height: 1.5;
  font-size: 14px;
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const DiffLine = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(0.5)} 0;
  background-color: ${({ background }) => background || "transparent"};
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const LineContent = styled.span`
  padding: 0 ${({ theme }) => theme.spacing(1)};
  white-space: pre;
`;

const InlineLineNumber = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  padding: 0 ${({ theme }) => theme.spacing(1)};
  text-align: right;
  user-select: none;
  min-width: 40px;
  border-right: 1px solid ${({ theme }) => theme.colors.secondary};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const AddedText = styled.span`
  background-color: ${({ theme }) => `${theme.colors.success}33`};
  color: ${({ theme }) => theme.colors.success};
`;

const RemovedText = styled.span`
  background-color: ${({ theme }) => `${theme.colors.error}33`};
  color: ${({ theme }) => theme.colors.error};
  text-decoration: line-through;
`;

const Icon = styled(BiGitCompare)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 2rem;
`;

const SmallIcon = styled(BiGitCompare)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const ExampleButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const CopyButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  Header,
  Title,
  Description,
  DiffContainer,
  TextAreaColumn,
  ColumnHeader,
  ColumnLabel,
  TextAreaWrapper,
  TextArea,
  LineNumbers,
  LineNumber,
  ResultsSection,
  SectionTitle,
  DiffVisualizer,
  DiffLine,
  LineContent,
  InlineLineNumber,
  AddedText,
  RemovedText,
  Icon,
  SmallIcon,
  Button,
  ControlsContainer,
  ButtonGroup,
  ExampleButton,
  CopyButton,
  IconWrapper,
};

// src/app/style-stripper/style.js
import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
`;

export const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  line-height: 1.6;
`;

export const MainContent = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.3rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export const OutputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  position: relative;

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.3rem;
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 400px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.9rem;
  line-height: 1.6;
  resize: vertical;
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  background-color: ${({ theme, variant }) =>
    variant === "secondary" ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme, variant }) =>
      variant === "secondary"
        ? theme.colors.surfaceHover
        : theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ResultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing(3)};
  min-height: 400px;
  overflow: auto;
`;

export const ResultCode = styled.pre`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.9rem;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 1.8rem;
  right: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.inverted};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  z-index: 2;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  min-height: 400px;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 80%;
`;

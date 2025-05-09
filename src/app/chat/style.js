// src/app/chat/style.js
import styled from "styled-components";
const TitleSection = styled.div``;

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme, $primary }) =>
    $primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme, $primary }) =>
      $primary ? theme.colors.primaryHover : theme.colors.surfaceHover};
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

// Styled Components
const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const PageHeader = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  position: relative;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing(1)} 0 ${theme.spacing(4)} 0`};
`;

export {
  PageContainer,
  PageHeader,
  Title,
  Subtitle,
  TitleSection,
  ActionsContainer,
  ActionButton,
  LoadingText,
};

// src/components/AIChatbot/styles.js
import styled, { keyframes } from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 600px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  overflow: hidden;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  /* padding: ${({ theme }) => theme.spacing(1)}; */
  /* background-color: ${({ theme }) => theme.colors.primary}; */
  color: ${({ theme }) => theme.colors.text.primary};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};

  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const ChatScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  /* padding: ${({ theme }) => theme.spacing(3)}; */
  background-color: ${({ theme }) => theme.colors.background};
  scroll-behavior: smooth;
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ $sender }) =>
    $sender === "user" ? "flex-end" : "flex-start"};
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $sender }) =>
    $sender === "user" ? theme.colors.primary : theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.primary};
  order: ${({ $sender }) => ($sender === "user" ? "1" : "0")};
  flex-shrink: 0;
`;

const Message = styled.div`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme, $sender }) => {
    if ($sender === "user") return theme.colors.primary;
    if ($sender === "error") return `${theme.colors.error}40`;
    return theme.colors.surface;
  }};
  box-shadow: ${({ theme }) => theme.elevation.low};
  border-top-left-radius: ${({ theme, $sender }) =>
    $sender === "bot" ? "0" : theme.radii.md};
  border-top-right-radius: ${({ theme, $sender }) =>
    $sender === "user" ? "0" : theme.radii.md};
`;

const MessageContent = styled.div`
  color: ${({ theme, $sender }) => {
    if ($sender === "user") return theme.colors.text.primary;
    if ($sender === "error") return theme.colors.error;
    return theme.colors.text.primary;
  }};
  font-size: 0.95rem;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
`;

const ChatInputContainer = styled.form`
  position: fixed;
  bottom: 0;
  /* left: 40; */
  /* right: 0; */
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  width: 70%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ChatInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.95rem;
  transition: ${({ theme }) => theme.motion.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.7;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const Typing = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing(1)};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: 50%;
  animation: ${bounce} 1s infinite;
  animation-delay: ${({ delay }) => `${delay}s`};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(6)};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyStateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.accent}30`};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyStateText = styled.p`
  font-size: 0.95rem;
  max-width: 70%;
  line-height: 1.6;
`;
const ApiKeyWarning = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => `${theme.colors.secondary}30`};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 80%;
  text-align: left;
`;

const TokenInfo = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
  margin-top: ${({ theme }) => theme.spacing(1)};
  text-align: right;
`;

export {
  ChatContainer,
  ChatHeader,
  ChatBody,
  ChatInputContainer,
  ChatInput,
  SendButton,
  MessageContainer,
  Message,
  MessageContent,
  Avatar,
  Typing,
  Dot,
  ChatScrollContainer,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateTitle,
  ApiKeyWarning,
  TokenInfo,
};

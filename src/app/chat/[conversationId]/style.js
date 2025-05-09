// src/app/chat/[conversationId]/style.js
import styled from "styled-components";
import Link from "next/link";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 10px);
  /* Adjust if header height changes */
  /* height: 100vh; */
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.spacing(0)} ${theme.spacing(4)} ${theme.spacing(4)}`};
`;

const ChatHeaderContainer = styled.div`
  // Renamed for clarity
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)} 0;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.motion.quick};
  margin-right: ${({ theme }) => theme.spacing(3)};
  flex-shrink: 0; // Prevent shrinking

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const TitleWrapper = styled.div`
  flex-grow: 1; // Allow title wrapper to take space
  min-width: 0; // Prevent title from overflowing container on shrink
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.text.secondary};
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ChatArea = styled.div`
  flex: 1;
  overflow: hidden;
`;

export {
  PageContainer,
  ChatHeaderContainer,
  BackButton,
  TitleWrapper,
  LoadingContainer,
  ChatArea,
};

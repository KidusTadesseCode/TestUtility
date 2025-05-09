"use client";
// src/app/chat/page.js
import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import ConversationList from "@/component/AIChatbot/ConversationList";
import GeminiSettings from "@/component/AIChatbot/GeminiSettings";
import {
  PageContainer,
  PageHeader,
  Title,
  Subtitle,
  TitleSection,
  ActionsContainer,
  ActionButton,
  LoadingText,
} from "./style";
import useConversations from "@/hooks/chat/useConversations";

const ChatPage = () => {
  const {
    conversations,
    isLoading,
    isCreating,
    error,
    selectedModel,
    userId,
    isLoaded,
    handleStartNewChat,
    handleDeleteConversation,
    handleSaveSettings,
  } = useConversations();

  return (
    <PageContainer>
      <PageHeader>
        <TitleSection>
          <Title>Your Conversations</Title>
        </TitleSection>
        <ActionsContainer>
          <ActionButton
            onClick={handleStartNewChat}
            disabled={isCreating}
            $primary={true}
          >
            <BiPlusCircle size={18} />
            {isCreating ? "Starting..." : "Start New Chat"}
          </ActionButton>
          <GeminiSettings
            onSave={handleSaveSettings}
            initialModel={selectedModel}
          />
        </ActionsContainer>
      </PageHeader>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {isLoading ? (
        <LoadingText>Loading conversations...</LoadingText>
      ) : !userId && isLoaded ? (
        <LoadingText>Please log in to see your conversations.</LoadingText>
      ) : (
        <ConversationList
          conversations={conversations}
          onDelete={handleDeleteConversation}
        />
      )}
    </PageContainer>
  );
};

export default ChatPage;

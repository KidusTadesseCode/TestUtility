// src/app/chat/[conversationId]/page.js
"use client";
import React from "react";
import { useParams } from "next/navigation";
import AIChatbotStream from "@/component/AIChatbot/AIChatbotStream";
import { BiArrowBack, BiLoaderAlt } from "react-icons/bi";
import EditableConversationTitle from "@/component/AIChatbot/EditableConversationTitle";
import {
  PageContainer,
  ChatHeaderContainer,
  BackButton,
  TitleWrapper,
  LoadingContainer,
  ChatArea,
} from "./style";
import useConversation from "@/hooks/chat/useConversation";
// "gemini-2.5-pro-exp-03-25";

const ConversationChatPage = () => {
  const params = useParams();
  const conversationId = params?.conversationId;

  const {
    initialMessages,
    isLoading,
    error,
    selectedModel,
    conversationTitle,
    isLoaded,
    saveMessageToDatabase,
    onSendMessage,
    handleUpdateTitle,
  } = useConversation(conversationId);

  if (!isLoaded || (isLoading && !error)) {
    return (
      <PageContainer>
        <LoadingContainer>
          <BiLoaderAlt size={40} className="spin" />
          <p>Loading Chat...</p>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ChatHeaderContainer>
          <BackButton href="/chat">
            <BiArrowBack size={18} /> Back to Conversations
          </BackButton>
        </ChatHeaderContainer>
        <LoadingContainer>
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        </LoadingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ChatHeaderContainer>
        <BackButton href="/chat">
          <BiArrowBack size={18} /> Back to Conversations
        </BackButton>
        <TitleWrapper>
          <EditableConversationTitle
            initialTitle={conversationTitle}
            onSave={handleUpdateTitle}
          />
        </TitleWrapper>
      </ChatHeaderContainer>

      <ChatArea>
        {!error && (
          <AIChatbotStream
            key={conversationId}
            conversationId={conversationId}
            initialMessages={initialMessages}
            systemInstruction="You are a friendly and helpful assistant..."
            onReceiveMessage={saveMessageToDatabase}
            onSendMessage={onSendMessage}
            aiModel={selectedModel}
          />
        )}
      </ChatArea>
    </PageContainer>
  );
};

export default ConversationChatPage;

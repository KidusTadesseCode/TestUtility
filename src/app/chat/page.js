"use client";
// src/app/chat/page.js
import React, { useState, useEffect, useCallback } from "react";
import { BiCog, BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ConversationList from "@/component/ConversationList/ConversationList";
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
import { geminiModelsInfo } from "@/libs/gemini/listAvailableGeminiModels";

const ChatPage = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(
    geminiModelsInfo("gemini-2.5-pro-preview-05-06")
  );

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!userId) return; // Don't fetch if not logged in
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/chat/conversations");
      setConversations(response.data || []);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      setError("Could not load your conversations. Please try again.");
      setConversations([]); // Clear conversations on error
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      fetchConversations();
    } else if (isLoaded && !userId) {
      // Handle case where user is loaded but not logged in
      setIsLoading(false);
      setConversations([]);
    }
  }, [isLoaded, userId, fetchConversations]);

  const handleStartNewChat = async () => {
    setIsCreating(true);
    setError(null);
    try {
      console.log(1, "handleStartNewChat() selectedModel:", selectedModel);
      const response = await axios.post("/api/chat/conversations", {
        modelName: selectedModel.name.replace("models/", ""),
      });
      console.log(2, "handleStartNewChat() selectedModel:", selectedModel);
      const { conversationId } = response.data;
      if (conversationId) {
        router.push(`/chat/${conversationId}`);
      } else {
        throw new Error("No conversation ID received");
      }
    } catch (err) {
      console.error("Failed to start new chat:", err);
      setError("Could not start a new chat. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    setError(null);
    try {
      await axios.delete(`/api/chat/conversations/${conversationId}`);
      setConversations((prevConversations) =>
        prevConversations.filter((conv) => conv.id !== conversationId)
      );
    } catch (err) {
      console.error("Failed to delete conversation:", err);
      setError(
        err.response?.data?.error ||
          "Could not delete the conversation. Please try again."
      );
      throw err;
    }
  };

  const handleSaveSettings = (model) => {
    console.log("handleSaveSettings() model:", model);
    setSelectedModel(model);
    return;
  };

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

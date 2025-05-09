// src/hooks/chat/useConversations.js
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import conversationService from "@/services/chat/conversationService";
import { geminiModelsInfo } from "@/libs/gemini/geminiModelsInfo";

const useConversations = () => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(
    geminiModelsInfo("gemini-2.5-pro-preview-05-06")
  );

  const fetchConversations = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await conversationService.getConversations();
      setConversations(data);
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      setError("Could not load your conversations. Please try again.");
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isLoaded && userId) {
      fetchConversations();
    } else if (isLoaded && !userId) {
      setIsLoading(false);
      setConversations([]);
    }
  }, [isLoaded, userId, fetchConversations]);

  const handleStartNewChat = async () => {
    setIsCreating(true);
    setError(null);

    try {
      const response = await conversationService.createConversation(
        selectedModel.name
      );
      const { conversationId } = response;

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
      await conversationService.deleteConversation(conversationId);
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
    setSelectedModel(model);
  };

  return {
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
  };
};

export default useConversations;

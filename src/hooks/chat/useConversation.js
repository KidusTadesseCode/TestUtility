// src/hooks/chat/useConversation.js
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import conversationService from "@/services/chat/conversationService";
import { geminiModelsInfo } from "@/libs/gemini/geminiModelsInfo";
import messageService from "@/services/chat/messageService";

const useConversation = (conversationId) => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const [initialMessages, setInitialMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState({});
  const [conversationTitle, setConversationTitle] =
    useState("Loading title...");

  const saveMessageToDatabase = async (message) => {
    if (!conversationId || !userId) return;

    try {
      await messageService.saveMessage(conversationId, message);
    } catch (error) {
      console.error("Error saving message:", error);
      setError("Failed to save message to database.");
    }
  };

  const onSendMessage = async (message) => {
    if (!conversationId || !userId) return;

    try {
      await messageService.saveUserMessage(conversationId, message);
    } catch (error) {
      console.error("Error saving message:", error);
      setError("Failed to save message to database.");
    }
  };

  const fetchConversationData = useCallback(async () => {
    if (!userId || !conversationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const conversationData = await conversationService.getConversationDetails(
        conversationId
      );
      const modelInfo = geminiModelsInfo(conversationData.modelName);

      if (
        !modelInfo ||
        Object.keys(modelInfo).length === 0 ||
        !modelInfo.name
      ) {
        return setError("AI model not found.");
      }

      setSelectedModel(modelInfo);
      setConversationTitle(conversationData.title || "Untitled Chat");

      const formattedMessages = (conversationData.messages || []).map(
        (msg) => ({
          id: msg.id,
          content: msg.text,
          role: msg.sender.toString(),
          createdAt: msg.createdAt,
        })
      );

      if (!Array.isArray(formattedMessages)) {
        console.error("Formatted messages is not an array!", formattedMessages);
        setError("Failed to process conversation messages.");
        setInitialMessages([]);
      } else {
        setInitialMessages(formattedMessages);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Failed to fetch conversation data:", err);

      if (err.response?.status === 404 || err.response?.status === 403) {
        setError("Conversation not found or access denied.");
        setTimeout(() => router.push("/chat"), 3000);
      } else {
        setError("Could not load conversation details.");
      }

      setInitialMessages([]);
      setConversationTitle("Error loading chat");
    } finally {
      setIsLoading(false);
    }
  }, [userId, conversationId, router]);

  useEffect(() => {
    if (isLoaded && userId && conversationId) {
      fetchConversationData();
    } else if (isLoaded && !userId) {
      router.push("/chat");
    }
  }, [isLoaded, userId, conversationId, fetchConversationData, router]);

  const handleUpdateTitle = async (newTitle) => {
    if (
      !conversationId ||
      !userId ||
      !newTitle.trim() ||
      newTitle === conversationTitle
    ) {
      return;
    }

    const originalTitle = conversationTitle;
    setConversationTitle(newTitle);

    try {
      await conversationService.updateConversationTitle(
        conversationId,
        newTitle
      );
    } catch (err) {
      console.error("Failed to update title:", err);
      setError("Failed to update conversation title.");
      setConversationTitle(originalTitle);
    }
  };

  return {
    initialMessages,
    isLoading,
    error,
    selectedModel,
    conversationTitle,
    userId,
    isLoaded,
    saveMessageToDatabase,
    onSendMessage,
    handleUpdateTitle,
  };
};

export default useConversation;

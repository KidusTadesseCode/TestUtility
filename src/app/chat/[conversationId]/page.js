// src/app/chat/[conversationId]/page.js
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
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
import { v4 as uuidv4 } from "uuid";
import { geminiModelsInfo } from "@/libs/gemini/geminiModelsInfo";
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

// const ConversationChatPage = () => {
//   const { userId, isLoaded } = useAuth();
//   const params = useParams();
//   const router = useRouter();
//   const conversationId = params?.conversationId;
//   const [initialMessages, setInitialMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedModel, setSelectedModel] = useState({});
//   const [conversationTitle, setConversationTitle] =
//     useState("Loading title...");

//   const saveMessageToDatabase = async (message) => {
//     if (!conversationId || !userId) return;
//     try {
//       await axios.post(`/api/chat/conversations/${conversationId}/messages`, {
//         messageID: message.id,
//         createdAt: message.createdAt,
//         sender: message.role === "user" ? "user" : "bot",
//         text: message.content,
//       });
//     } catch (error) {
//       console.error("Error saving message:", error);
//       setError("Failed to save message to database.");
//     }
//   };

//   const onSendMessage = async (message) => {
//     try {
//       if (!conversationId || !userId) return;
//       await axios.post(`/api/chat/conversations/${conversationId}/messages`, {
//         messageID: uuidv4(),
//         createdAt: new Date(),
//         sender: "user",
//         text: message,
//       });
//     } catch (error) {
//       console.error("Error saving message:", error);
//       setError("Failed to save message to database.");
//     }
//   };

//   const fetchConversationData = useCallback(async () => {
//     if (!userId || !conversationId) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `/api/chat/conversations/${conversationId}`
//       );
//       const conversationData = response.data;
//       const modelInfo = geminiModelsInfo(conversationData.modelName);
//       if (!modelInfo || Object.keys(modelInfo).length === 0 || !modelInfo.name)
//         return setError("AI model not found.");
//       setSelectedModel(modelInfo);
//       setConversationTitle(conversationData.title || "Untitled Chat");
//       const formattedMessages = (conversationData.messages || []).map(
//         (msg) => ({
//           id: msg.id,
//           content: msg.text,
//           role: msg.sender.toString(),
//           createdAt: msg.createdAt,
//         })
//       );
//       if (!Array.isArray(formattedMessages)) {
//         console.error("Formatted messages is not an array!", formattedMessages);
//         setError("Failed to process conversation messages.");
//         setInitialMessages([]);
//       } else {
//         setInitialMessages(formattedMessages);
//       }
//     } catch (err) {
//       setIsLoading(false);
//       console.error("Failed to fetch conversation data:", err);
//       if (err.response?.status === 404 || err.response?.status === 403) {
//         setError("Conversation not found or access denied.");
//         setTimeout(() => router.push("/chat"), 3000);
//       } else {
//         setError("Could not load conversation details.");
//       }
//       setInitialMessages([]);
//       setConversationTitle("Error loading chat");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [userId, conversationId, router]);

//   useEffect(() => {
//     if (isLoaded && userId && conversationId) {
//       fetchConversationData();
//     } else if (isLoaded && !userId) {
//       router.push("/chat");
//     }
//   }, [isLoaded, userId, conversationId, fetchConversationData, router]);

//   const handleUpdateTitle = async (newTitle) => {
//     if (
//       !conversationId ||
//       !userId ||
//       !newTitle.trim() ||
//       newTitle === conversationTitle
//     ) {
//       return;
//     }
//     const originalTitle = conversationTitle;
//     setConversationTitle(newTitle);

//     try {
//       const response = await axios.patch(
//         `/api/chat/conversations/${conversationId}`,
//         {
//           title: newTitle,
//         }
//       );
//       console.error("response:", response);
//     } catch (err) {
//       console.error("Failed to update title:", err);
//       setError("Failed to update conversation title.");
//       setConversationTitle(originalTitle);
//     }
//   };

//   if (!isLoaded || (isLoading && !error)) {
//     return (
//       <PageContainer>
//         <LoadingContainer>
//           <BiLoaderAlt size={40} className="spin" />
//           <p>Loading Chat...</p>
//         </LoadingContainer>
//       </PageContainer>
//     );
//   }
//   if (error) {
//     return (
//       <PageContainer>
//         <ChatHeaderContainer>
//           <BackButton href="/chat">
//             <BiArrowBack size={18} /> Back to Conversations
//           </BackButton>
//         </ChatHeaderContainer>
//         <LoadingContainer>
//           <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
//         </LoadingContainer>
//       </PageContainer>
//     );
//   }
//   return (
//     <PageContainer>
//       <ChatHeaderContainer>
//         <BackButton href="/chat">
//           <BiArrowBack size={18} /> Back to Conversations
//         </BackButton>
//         <TitleWrapper>
//           <EditableConversationTitle
//             initialTitle={conversationTitle}
//             onSave={handleUpdateTitle}
//           />
//         </TitleWrapper>
//       </ChatHeaderContainer>
//       <ChatArea>
//         {!error && (
//           <AIChatbotStream
//             key={conversationId}
//             conversationId={conversationId}
//             initialMessages={initialMessages}
//             systemInstruction="You are a friendly and helpful assistant..."
//             onReceiveMessage={saveMessageToDatabase}
//             onSendMessage={onSendMessage}
//             aiModel={selectedModel}
//           />
//         )}
//       </ChatArea>
//     </PageContainer>
//   );
// };

// export default ConversationChatPage;

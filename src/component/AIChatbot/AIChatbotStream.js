// src/component/AIChatbotStream/AIChatbotStream.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSend, BiBot, BiUser, BiLoaderAlt, BiKey } from "react-icons/bi";
import {
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
  TokenInfo, // Keep TokenInfo style if other parts might use it, otherwise remove
} from "./styles";
import { useChat } from "@ai-sdk/react";
const AIChatbotStream = ({
  aiModel,
  onReceiveMessage,
  onSendMessage,
  initialMessages = [],
  conversationId,
}) => {
  // const [isTyping, setIsTyping] = useState(false); // Keep this as a comment
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const { messages, input, handleSubmit, handleInputChange, status } = useChat({
    api: "/api/chat/conversations/gemini",
    id: conversationId,
    body: {
      conversationId,
      // systemInstruction: systemInstruction, // Keep this as a comment
      modelName: aiModel.name,
    },
    initialMessages: initialMessages,
    onResponse: (response) => {
      setError(null);
    },
    onFinish: (message, onFinishOption) => {
      if (onFinishOption.finishReason !== "error" && onReceiveMessage)
        onReceiveMessage(message);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      setError(error);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (onSendMessage) onSendMessage(input);
    handleSubmit(e);
    return;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const isEmptyState = messages.length === 0;
  return (
    <ChatContainer>
      <ChatHeader>
        <Avatar $sender="bot">
          <BiBot size={20} />
        </Avatar>
        {aiModel && <h2>{aiModel.displayName}</h2>}
      </ChatHeader>

      <ChatScrollContainer>
        {isEmptyState ? (
          <EmptyState>
            <EmptyStateIcon>
              <BiBot size={40} />
            </EmptyStateIcon>
            <EmptyStateTitle>Hello! I&apos;m your AI assistant</EmptyStateTitle>
            <EmptyStateText>
              Ask me anything and I&apos;ll do my best to help you.
            </EmptyStateText>
          </EmptyState>
        ) : (
          <ChatBody>
            <AnimatePresence>
              {messages.map((message) => (
                <MessageContainer
                  key={message.id}
                  as={motion.div}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={messageVariants}
                  transition={{ duration: 0.3 }}
                  $sender={message.role}
                >
                  <Avatar $sender={message.role}>
                    {message.role === "user" ? (
                      <BiUser size={20} />
                    ) : (
                      <BiBot size={20} />
                    )}
                  </Avatar>
                  <Message $sender={message.role}>
                    <MessageContent $sender={message.role}>
                      {message.content}
                    </MessageContent>
                  </Message>
                </MessageContainer>
              ))}
            </AnimatePresence>
            {status === "generating" && (
              <MessageContainer
                key="typing"
                as={motion.div}
                layout
                $sender="assistant"
              >
                <Avatar $sender="assistant">
                  <BiBot size={20} />
                </Avatar>

                <Message $sender="assistant">
                  <MessageContent $sender="assistant">
                    <Typing>
                      <Dot delay={0} />
                      <Dot delay={0.2} />
                      <Dot delay={0.4} />
                    </Typing>
                  </MessageContent>
                </Message>
              </MessageContainer>
            )}

            {error && (
              <MessageContainer key="error-message" $sender="error">
                <Avatar $sender="error">
                  <BiBot size={20} />
                </Avatar>
                <Message $sender="error">
                  <MessageContent $sender="error">
                    Error: {error.message}
                  </MessageContent>
                </Message>
              </MessageContainer>
            )}

            <div ref={chatEndRef} />
          </ChatBody>
        )}
      </ChatScrollContainer>

      <ChatInputContainer onSubmit={handleFormSubmit}>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          placeholder={"Type your message here..."}
          disabled={status !== "ready"}
        />
        <SendButton
          type="submit"
          disabled={status !== "ready"}
          title={"Send message"}
        >
          {status === "generating" ? (
            <BiLoaderAlt size={20} className="spin" />
          ) : (
            <BiSend size={20} />
          )}
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};
export default AIChatbotStream;

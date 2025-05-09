// src/component/AIChatbot/AIChatbot.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiSend, BiBot, BiUser, BiLoaderAlt, BiKey } from "react-icons/bi";
import gemini from "@/libs/gemini/gemini";
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
} from "./styles";

// Default system instruction for the chatbot
const DEFAULT_SYSTEM_INSTRUCTION = `You are a helpful AI assistant. Respond in a friendly, concise, and helpful manner. 
If you don't know the answer to a question, please say so instead of making up information.`;

/**
 * AI Chatbot Component
 * @param {Object} props - Component props
 * @param {string} props.apiKey - Optional API key for Gemini (falls back to env variable)
 * @param {string} props.aiModel - Model name to use for Gemini API
 * @param {string} props.systemInstruction - Custom system instruction (optional)
 * @param {Function} props.onSendMessage - Callback when a message is sent (optional)
 * @param {Function} props.onReceiveMessage - Callback when a message is received (optional)
 */
const AIChatbot = ({
  apiKey,
  aiModel = "gemini-1.5-flash-latest",
  systemInstruction = DEFAULT_SYSTEM_INSTRUCTION,
  onSendMessage,
  onReceiveMessage,
  initialMessages = [],
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle message submission
  const handleSendMessage = async (e) => {
    e && e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    if (onSendMessage) {
      onSendMessage(userMessage);
    }

    try {
      // Get bot response using updated Gemini implementation
      const response = await gemini(
        input,
        systemInstruction,
        null, // no response schema
        aiModel,
        0.5,
        apiKey
      );

      const botMessage = {
        id: Date.now() + 1,
        text: response.text || "Sorry, I couldn't process your request.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);

      if (onReceiveMessage) onReceiveMessage(botMessage);
    } catch (err) {
      console.error("Error getting response from Gemini:", err);
      setError(
        err.message ||
          "Sorry, I couldn't process your request. Please try again later."
      );
    } finally {
      setIsTyping(false);
    }
  };

  // Message animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <Avatar sender="bot">
          <BiBot size={20} />
        </Avatar>
        <h2>AI Assistant {aiModel && `(${aiModel})`}</h2>
      </ChatHeader>

      <ChatScrollContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>
              <BiBot size={40} />
            </EmptyStateIcon>
            <EmptyStateTitle>Hello! I&apos;m your AI assistant</EmptyStateTitle>
            <EmptyStateText>
              Ask me anything and I&apos;ll do my best to help you.
            </EmptyStateText>

            {!apiKey && (
              <ApiKeyWarning>
                <BiKey size={16} />
                No API key configured. Click the &quot;Configure API&quot;
                button to set up your Gemini API key.
              </ApiKeyWarning>
            )}
          </EmptyState>
        ) : (
          <ChatBody>
            <AnimatePresence>
              {messages.map((message) => (
                <MessageContainer
                  key={message.id}
                  as={motion.div}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={messageVariants}
                  transition={{ duration: 0.3 }}
                  sender={message.sender}
                >
                  <Avatar sender={message.sender}>
                    {message.sender === "user" ? (
                      <BiUser size={20} />
                    ) : (
                      <BiBot size={20} />
                    )}
                  </Avatar>
                  <Message sender={message.sender}>
                    <MessageContent sender={message.sender}>
                      {message.text}
                    </MessageContent>
                  </Message>
                </MessageContainer>
              ))}

              {isTyping && (
                <MessageContainer
                  as={motion.div}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  sender="bot"
                >
                  <Avatar sender="bot">
                    <BiBot size={20} />
                  </Avatar>
                  <Message sender="bot">
                    <Typing>
                      <Dot delay={0} />
                      <Dot delay={0.2} />
                      <Dot delay={0.4} />
                    </Typing>
                  </Message>
                </MessageContainer>
              )}

              {error && (
                <MessageContainer
                  as={motion.div}
                  initial="hidden"
                  animate="visible"
                  variants={messageVariants}
                  sender="error"
                >
                  <Message sender="error">
                    <MessageContent sender="error">{error}</MessageContent>
                  </Message>
                </MessageContainer>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </ChatBody>
        )}
      </ChatScrollContainer>

      <ChatInputContainer onSubmit={handleSendMessage}>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            apiKey
              ? "Type your message here..."
              : "Configure API key to start chatting..."
          }
          disabled={isTyping || !apiKey}
        />
        <SendButton
          type="submit"
          disabled={!input.trim() || isTyping || !apiKey}
          title={!apiKey ? "API key required" : "Send message"}
        >
          {isTyping ? (
            <BiLoaderAlt size={20} className="spin" />
          ) : (
            <BiSend size={20} />
          )}
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default AIChatbot;

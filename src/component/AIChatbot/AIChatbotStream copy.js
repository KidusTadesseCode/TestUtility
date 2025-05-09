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

const DEFAULT_SYSTEM_INSTRUCTION = `You are a helpful AI assistant. Respond in a friendly, concise, and helpful manner.
If you don't know the answer to a question, please say so instead of making up information.`;

// Renamed component
const AIChatbotStream = ({
  apiKey,
  aiModel = "gemini-2.5-pro-exp-03-25",
  systemInstruction = DEFAULT_SYSTEM_INSTRUCTION,
  onSendMessage,
  onReceiveMessage,
  initialMessages = [],
}) => {
  const [messagesInit, setMessagesInit] = useState(initialMessages);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messagesInit]);

  useEffect(() => {
    setMessagesInit(initialMessages);
  }, [initialMessages]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSendMessage = async (e) => {
    e && e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
    };
    const currentInput = userInput;
    setMessagesInit((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);
    setError(null);

    if (onSendMessage) {
      onSendMessage({
        id: userMessage.id,
        text: userMessage.text,
        sender: userMessage.sender,
      });
    }

    const botMessageId = Date.now() + 1;
    const placeholderBotMessage = {
      id: botMessageId,
      text: "",
      sender: "bot",
    };
    setMessagesInit((prev) => [...prev, placeholderBotMessage]);

    let accumulatedText = "";

    try {
      // const res = await axios.request({
      //   method: "POST",
      //   url: "/api/chat/conversations/gemini",
      //   data: {
      //     prompt: currentInput,
      //     systemInstruction: systemInstruction,
      //     modelName: aiModel,
      //   },
      // });

      setIsTyping(false);

      for await (const chunk of streamResult) {
        const chunkText =
          chunk?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (chunkText) {
          accumulatedText += chunkText;
          setMessagesInit((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botMessageId
                ? { ...msg, text: msg.text + chunkText }
                : msg
            )
          );
        }
        scrollToBottom();
      }
      // Update the final message state (only text is needed now)
      setMessagesInit((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg
        )
      );

      // Call the receive message callback without cost
      if (onReceiveMessage) {
        onReceiveMessage({
          id: botMessageId,
          text: accumulatedText,
          sender: "bot",
          // REMOVED CHANGE: No cost property passed
          // cost: costInfo
        });
      }
    } catch (err) {
      console.error("Error processing Gemini stream:", err);
      const errorText =
        err.message || "Sorry, an error occurred while getting the response.";
      setError(errorText);

      setMessagesInit((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: errorText, sender: "error" }
            : msg
        )
      );
      setIsTyping(false);
    }
  };

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
        {messagesInit.length === 0 && !isTyping ? (
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
                No API key configured. You might be using a default key, or add
                your own via settings.
              </ApiKeyWarning>
            )}
          </EmptyState>
        ) : (
          <ChatBody>
            <AnimatePresence>
              {messagesInit.map((message) => (
                <MessageContainer
                  key={message.id}
                  as={motion.div}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={messageVariants}
                  transition={{ duration: 0.3 }}
                  sender={message.sender}
                >
                  {(message.sender === "user" || message.sender === "bot") && (
                    <Avatar sender={message.sender}>
                      {message.sender === "user" ? (
                        <BiUser size={20} />
                      ) : (
                        <BiBot size={20} />
                      )}
                    </Avatar>
                  )}
                  <Message sender={message.sender}>
                    <MessageContent sender={message.sender}>
                      {message.text}
                      {message.sender === "bot" && !message.text && (
                        <Typing>
                          <Dot delay={0} />
                          <Dot delay={0.2} />
                          <Dot delay={0.4} />
                        </Typing>
                      )}
                    </MessageContent>
                    {/* REMOVED CHANGE: Removed the TokenInfo rendering block */}
                    {/* {message.cost && message.cost.totalTokens > 0 && (...) } */}
                  </Message>
                </MessageContainer>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </ChatBody>
        )}
      </ChatScrollContainer>

      <ChatInputContainer onSubmit={handleSendMessage}>
        <ChatInput
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={
            apiKey
              ? "Type your message here..."
              : "Configure API key to start chatting..."
          }
          disabled={isTyping || !apiKey}
        />
        <SendButton
          type="submit"
          disabled={!userInput.trim() || isTyping || !apiKey}
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

// Renamed export
export default AIChatbotStream;

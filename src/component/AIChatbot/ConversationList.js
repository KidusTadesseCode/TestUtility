// src/component/ConversationList/ConversationList.js
"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  BiMessageDetail,
  BiTimeFive,
  BiTrash,
  BiLoaderAlt,
} from "react-icons/bi";

// Modify ConversationItem to be a div container, Link will wrap content inside
const ConversationItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // Space out content and button
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary}30;
  transition: ${({ theme }) => theme.motion.subtle};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.elevation.low};
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ConversationLinkContent = styled(Link)`
  // Link wraps the clickable text part
  display: block;
  text-decoration: none;
  color: inherit;
  flex-grow: 1; // Takes available space
  margin-right: ${({ theme }) =>
    theme.spacing(2)}; // Space before delete button

  &:hover ${Title} {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${({ theme }) => theme.motion.quick};
  flex-shrink: 0; // Prevent button from shrinking

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.error}; // Use error color on hover
    background-color: ${({ theme }) =>
      theme.colors.error}15; // Light error background
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// ------------------------------------------------------------------------------
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Timestamp = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const NoConversations = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const ConversationList = ({ conversations = [], onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = async (e, conversationId) => {
    e.stopPropagation();
    e.preventDefault();

    if (deletingId) return;
    if (
      window.confirm(
        "Are you sure you want to delete this conversation? This action cannot be undone."
      )
    ) {
      setDeletingId(conversationId);
      try {
        await onDelete(conversationId); // Call the handler passed from the parent
        // Parent component will update the list, no need to update state here directly
      } catch (error) {
        // Error handling is done in the parent, maybe show a local alert as fallback
        alert("Failed to delete conversation. Please try again.");
        console.error("Deletion failed in list item:", error);
      } finally {
        setDeletingId(null); // Reset deleting state regardless of outcome
      }
    }
  };
  if (conversations.length === 0) {
    return (
      <NoConversations>
        No past conversations found. Start a new one!
      </NoConversations>
    );
  }

  return (
    <ListContainer>
      {conversations.map((conv) => (
        <ConversationItemContainer key={conv.id}>
          <ConversationLinkContent href={`/chat/${conv.id}`}>
            <Title>
              <BiMessageDetail />
              {conv.title ||
                `Chat from ${new Date(conv.updatedAt).toLocaleDateString()}`}
            </Title>
            <Timestamp>
              <BiTimeFive />
              Last updated: {new Date(conv.updatedAt).toLocaleString()}
            </Timestamp>
          </ConversationLinkContent>

          <DeleteButton
            onClick={(e) => handleDeleteClick(e, conv.id)}
            disabled={deletingId === conv.id} // Disable button while deleting this specific item
            aria-label={`Delete conversation: ${conv.title || "Untitled"}`} // Accessibility
            title="Delete Conversation" // Tooltip
          >
            {deletingId === conv.id ? (
              <BiLoaderAlt size={18} className="spin" /> // Show spinner when deleting
            ) : (
              <BiTrash size={18} />
            )}
          </DeleteButton>
        </ConversationItemContainer>
      ))}
    </ListContainer>
  );
};

export default ConversationList;

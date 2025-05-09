// src/component/EditableConversationTitle/EditableConversationTitle.js

import React, { useState } from "react";
import { BiPencil, BiCheck, BiX } from "react-icons/bi";
import styled from "styled-components";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #2a2a2a; /* Example background */
  border-bottom: 1px solid #3a3a3a;
`;

const TitleDisplay = styled.h2`
  color: #e0e0e0;
  font-size: 1.2em;
  margin: 0;
  flex-grow: 1; /* Allow title to take available space */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleInput = styled.input`
  flex-grow: 1;
  padding: 8px 10px;
  font-size: 1.1em;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #333;
  color: #e0e0e0;
  outline: none;
  &:focus {
    border-color: #6d5ae6; /* Use your theme's primary color */
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3; /* Use theme's secondary text color */
  cursor: pointer;
  padding: 5px;
  font-size: 1.3em; /* Adjust icon size */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: #ffffff; /* Use theme's primary text color */
    background-color: #444; /* Subtle hover background */
  }
`;

const EditableConversationTitle = ({
  initialTitle = "New Conversation",
  onSave,
}) => {
  // State for the actual, displayed title
  const [conversationTitle, setConversationTitle] = useState(initialTitle);
  // State to track if we are in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // State for the temporary value in the input field during editing
  const [editableTitle, setEditableTitle] = useState(initialTitle);

  // Function to enter edit mode
  const handleEditClick = () => {
    setEditableTitle(conversationTitle); // Pre-fill input with current title
    setIsEditing(true);
  };

  // Function to handle saving the new title
  const handleSaveClick = () => {
    const trimmedTitle = editableTitle.trim();
    if (trimmedTitle) {
      // Only save if not empty after trimming
      setConversationTitle(trimmedTitle);
      setIsEditing(false);
      if (onSave) onSave(trimmedTitle);
      // -----------------------------------------------------------
    } else {
      // Optionally handle empty input (e.g., show an error, revert, or do nothing)
      console.warn("Conversation title cannot be empty.");
      // Revert input to the last saved title if you want cancel-like behavior on empty save
      // setEditableTitle(conversationTitle);
    }
  };

  // Function to cancel editing
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setEditableTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveClick();
    } else if (event.key === "Escape") {
      handleCancelClick();
    }
  };

  return (
    <TitleContainer>
      {isEditing ? (
        <>
          <TitleInput
            type="text"
            value={editableTitle}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Edit conversation title"
          />
          <IconButton onClick={handleSaveClick} aria-label="Save title">
            <BiCheck />
          </IconButton>
          <IconButton
            onClick={handleCancelClick}
            aria-label="Cancel editing title"
          >
            <BiX />
          </IconButton>
        </>
      ) : (
        <>
          <TitleDisplay title={conversationTitle}>
            {conversationTitle}
          </TitleDisplay>
          <IconButton
            onClick={handleEditClick}
            aria-label="Edit conversation title"
          >
            <BiPencil />
          </IconButton>
        </>
      )}
    </TitleContainer>
  );
};

export default EditableConversationTitle;

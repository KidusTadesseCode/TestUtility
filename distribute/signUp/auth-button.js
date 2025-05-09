// src/component/Auth/AuthButton.js
"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/nextjs";
import { BiUser, BiLogIn } from "react-icons/bi";
import AuthModal from "./AuthModal";

const AuthButton = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) {
    return <LoadingButton />;
  }

  if (isSignedIn) {
    return (
      <UserButton>
        <BiUser size={18} />
        <span>{user.firstName || "Account"}</span>
      </UserButton>
    );
  }

  return (
    <>
      <SignInButton onClick={() => setIsModalOpen(true)}>
        <BiLogIn size={18} />
        <span>Sign In</span>
      </SignInButton>
      
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

// Styled components
const BaseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
`;

const LoadingButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  opacity: 0.7;
`;

const SignInButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const UserButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export default AuthButton;

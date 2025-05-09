// src/component/Auth/AuthModal.js
"use client";
import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BiX, BiLogIn, BiUserPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";

const AuthModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const navigateToSignIn = () => {
    router.push("/sign-in");
    onClose();
  };

  const navigateToSignUp = () => {
    router.push("/sign-up");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>Account Access</ModalTitle>
              <CloseButton onClick={onClose}>
                <BiX size={24} />
              </CloseButton>
            </ModalHeader>

            <ModalBody>
              <Text>Choose an option to continue</Text>
              
              <ButtonContainer>
                <ActionButton onClick={navigateToSignIn}>
                  <BiLogIn size={20} />
                  Sign In to Your Account
                </ActionButton>
                
                <ActionButton 
                  primary 
                  onClick={navigateToSignUp}
                >
                  <BiUserPlus size={20} />
                  Create a New Account
                </ActionButton>
              </ButtonContainer>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Styled components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.high};
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme, primary }) => 
    primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme, primary }) => 
      primary ? theme.colors.primaryHover : theme.colors.surfaceHover};
    transform: translateY(-2px);
  }
`;

export default AuthModal;

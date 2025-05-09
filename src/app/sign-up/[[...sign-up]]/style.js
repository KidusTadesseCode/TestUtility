// src/app/sign-up/[[...sign-up]]/style.js
import styled from "styled-components";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  padding: 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const SignUpWrapper = styled.div`
  /* Customize Clerk's sign-up component styling */
  --clerk-accent-color: ${({ theme }) => theme.colors.primary};
  --clerk-background-color: transparent;
  --clerk-text-color: ${({ theme }) => theme.colors.text.primary};
  
  /* Fix possible overflow issues */
  max-width: 100%;
  overflow: hidden;
  
  /* Center the form */
  display: flex;
  justify-content: center;
`;

export { SignUpContainer, Card, Title, Text, SignUpWrapper };

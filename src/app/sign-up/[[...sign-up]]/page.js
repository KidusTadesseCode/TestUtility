// src/app/sign-up/[[...sign-up]]/page.js
"use client";
import { SignUp } from "@clerk/nextjs";
import {
  SignUpContainer,
  Card,
  Title,
  Text,
  SignUpWrapper
} from "./style";

export default function SignUpPage() {
  return (
    <SignUpContainer>
      <Card>
        <Title>Create an Account</Title>
        <Text>Join our platform to access all features and utilities.</Text>
        <SignUpWrapper>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/"
          />
        </SignUpWrapper>
      </Card>
    </SignUpContainer>
  );
}

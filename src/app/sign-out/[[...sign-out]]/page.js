// src/app/sign-out/[[...sign-out]]/page.js
"use client";
import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  SignOutContainer,
  Card,
  Title,
  Text,
  SignOutButtonStyled,
} from "./style";

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOutComplete = () => {
    router.push("/");
  };

  return (
    <SignOutContainer>
      <Card>
        <Title>Sign Out</Title>
        <Text>Are you sure you want to sign out?</Text>
        <SignOutButton>
          <SignOutButtonStyled onClick={handleSignOutComplete}>
            Sign out
          </SignOutButtonStyled>
        </SignOutButton>
      </Card>
    </SignOutContainer>
  );
}

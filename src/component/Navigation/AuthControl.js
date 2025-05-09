// src/component/Navigation/AuthControl.js
"use client";
import React from "react";
import { BiLogIn } from "react-icons/bi";
import { SignInContainer, SignInButtonStyled } from "./navigation.style";
import { SignInButton } from "@clerk/nextjs";
import UserMenu from "./UserMenu";

function AuthControl({ isSignedIn }) {
  if (isSignedIn) {
    return <UserMenu />;
  } else {
    return (
      <SignInContainer>
        <SignInButton mode="modal">
          <SignInButtonStyled>
            <BiLogIn size={20} />
            Sign In
          </SignInButtonStyled>
        </SignInButton>
      </SignInContainer>
    );
  }
}
export default AuthControl;

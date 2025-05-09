// src/component/Navigation/Logo.js
"use client";
import React from "react";
import { LogoText, LogoAccent, LogoLink } from "./navigation.style";

function Logo({ isCollapsed }) {
  return (
    <LogoLink href="/" passHref>
      {isCollapsed ? (
        <LogoText>
          U<LogoAccent>A</LogoAccent>
        </LogoText>
      ) : (
        <LogoText>
          Utils<LogoAccent>App</LogoAccent>
        </LogoText>
      )}
    </LogoLink>
  );
}

export default Logo;

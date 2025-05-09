// src/providers/ThemeProvider.js
"use client";

import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

export default function ThemeProvider({ children }) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}

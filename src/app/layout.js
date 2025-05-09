"use client";
// src/app/layout.js
import StyledComponentsRegistry from "@/registry";
import { ClerkProvider } from "@clerk/nextjs";
import Navigation from "@/component/Navigation/Navigation";
import {
  LayoutContainer,
  AppContainer,
  MainContent,
} from "@/styles/layout.styles";
//
import ThemeProvider from "@/providers/ThemeProvider";
import GlobalStyles from "@/styles/global-styles";
import { theme } from "@/styles/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClerkProvider>
            <ThemeProvider>
              <GlobalStyles theme={theme} />
              <LayoutContainer>
                <AppContainer>
                  <Navigation />
                  <MainContent>{children}</MainContent>
                </AppContainer>
              </LayoutContainer>
            </ThemeProvider>
          </ClerkProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

// src/styles/layout.styles.js
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
`;

const MainContent = styled.main`
  flex: 1;
  /* padding: ${({ theme }) =>
    `${theme.spacing(14)} ${theme.spacing(4)} ${theme.spacing(4)}`}; */
  padding: ${({ theme }) =>
    `${theme.spacing(1)} ${theme.spacing(6)} ${theme.spacing(6)}`};
  margin-top: ${({ theme }) => theme.spacing(2)};
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: ${({ theme }) =>
      `${theme.spacing(12)} ${theme.spacing(2)} ${theme.spacing(2)}`};
  }

  /* Add a smooth transition when the navigation bar changes */
  transition: ${({ theme }) => theme.motion.smooth};

  /* Optional: add some max-width and center the content for better readability on large screens */
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export { LayoutContainer, AppContainer, MainContent };

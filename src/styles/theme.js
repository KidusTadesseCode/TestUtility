// src/styles/theme.js
export const theme = {
  colors: {
    background: "#121212", // Very dark gray, almost black
    surface: "#1E1E1E", // Slightly lighter dark gray for cards/surfaces
    surfaceHover: "#2D2D2D", // Lighter shade for hover states on surfaces
    primary: "#6D5AE6", // Rich purple for primary actions
    primaryHover: "#8D7BFF", // Lighter purple for hover states
    secondary: "#3D4451", // Dark blue-gray for secondary elements
    accent: "#61DAFB", // Bright cyan for accents and highlights
    success: "#4CAF50", // Green for success states
    error: "#F44336", // Red for errors
    text: {
      primary: "#FFFFFF", // White for main text
      secondary: "#B3B3B3", // Light gray for secondary text
      tertiary: "#757575", // Medium gray for less important text
      inverted: "#121212", // Dark color for text on light backgrounds
    },
  },
  elevation: {
    low: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    medium: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    high: "0px 8px 16px rgba(0, 0, 0, 0.4)",
  },
  radii: {
    sm: "4px",
    md: "8px",
    pill: "999px",
  },
  motion: {
    quick: "all 0.2s ease",
    smooth: "all 0.4s ease-in-out",
  },
  spacing: (multiplier) => `${multiplier * 0.5}rem`,
  typography: {
    font: {
      body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
      heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`,
      mono: `'JetBrains Mono', 'SF Mono', 'Roboto Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
    },
  },
};

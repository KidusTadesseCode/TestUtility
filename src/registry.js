"use client";
// src/registry.js
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // This is important - we need to reset the sheet after extracting styles
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // If we're in the browser, render children normally
  if (typeof window !== "undefined") return <>{children}</>;
  // On the server, wrap children in StyleSheetManager with sheet
  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      enableVendorPrefixes
    >
      {children}
    </StyleSheetManager>
  );
}

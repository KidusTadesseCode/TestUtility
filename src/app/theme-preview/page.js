// src/app/theme-preview/page.js
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BiCopy, BiCheck, BiPalette } from "react-icons/bi";
import { theme as defaultTheme } from "@/styles/theme";
import {
  PageContainer,
  Header,
  Title,
  Subtitle,
  Content,
  ThemeSection,
  SectionTitle,
  TextArea,
  Button,
  ActionBar,
  PreviewContainer,
  ColorsGrid,
  ColorCategory,
  CategoryTitle,
  ColorCard,
  ColorSwatch,
  ColorInfo,
  ColorName,
  ColorValue,
  TypographyContainer,
  FontSection,
  FontSample,
  FontInfo,
  InfoTag,
  SpacingContainer,
  SpacingCategory,
  SpacingSample,
  SpacingBlock,
  SpacingInfo,
  SpacingLabel,
  SpacingValue,
  BorderRadiusSection,
  RadiusPreview,
  RadiusItem,
  RadiusValue,
  ShadowSection,
  ShadowItem,
  ShadowBox,
  ShadowInfo,
  TransitionSection,
  TransitionItem,
  TransitionPreview,
  TransitionBox,
  TransitionInfo,
  ZIndexSection,
  ZIndexVisualizer,
  ZIndexLayer,
  BreakpointsSection,
  BreakpointItem,
  FlexRow,
  ErrorMessage,
  CopyButton,
  TabContainer,
  TabButton,
  TabContent,
} from "./style";

// Helper function to get nested object values
const getNestedValue = (obj, path) => {
  if (!obj) return undefined;

  return path.split(".").reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : undefined;
  }, obj);
};

const removeComments = (codeContent) => {
  const regex = /\/\/\/.*|\/\/[^\n\r]*|\s*\/\*[\s\S]*?\*\//g;
  const trimmedCode = codeContent.replace(regex, "");
  return trimmedCode;
};

const removeEmptyLines = (code) => {
  const lines = code.split("\n");
  const nonEmptyLines = lines.filter((line) => line.trim() !== "");
  const result = nonEmptyLines.join("\n");
  return result;
};

// Helper function to check if a path exists in an object
const pathExists = (obj, path) => {
  return getNestedValue(obj, path) !== undefined;
};

// Helper function to flatten a theme object for easier iteration
const flattenColors = (obj, prefix = "") => {
  if (!obj) return {};

  // Handle both flat and nested color structures
  return Object.keys(obj).reduce((acc, key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;

    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !obj[key].toString().includes("#") &&
      !obj[key].toString().includes("rgb")
    ) {
      return { ...acc, ...flattenColors(obj[key], newPrefix) };
    }

    // Only include color values (assumes colors are strings with # or rgb)
    if (
      typeof obj[key] === "string" &&
      (obj[key].includes("#") || obj[key].includes("rgb"))
    ) {
      return { ...acc, [newPrefix]: obj[key] };
    }

    return acc;
  }, {});
};

// Group colors by category
const groupColorsByCategory = (colors) => {
  const grouped = {};

  Object.keys(colors).forEach((key) => {
    const parts = key.split(".");
    const category = parts[0];

    if (!grouped[category]) {
      grouped[category] = {};
    }

    // Use the full path as the key
    grouped[category][key] = colors[key];
  });

  return grouped;
};

// Function to convert JS object string to actual object
const parseThemeInput = (input) => {
  try {
    return JSON.parse(input);
  } catch (err) {
    try {
      /*
      // WHY IS THIS BROKEN?
      let rmComment = removeComments(input);
      const rmList = ["export", "export default", "const"];
      for (const rm of rmList) {
        rmComment = rmComment.replace(rm, "");
      }
      const openingIndex = rmComment.indexOf("{");
      const closingIndex = rmComment.lastIndexOf("}");
      const splitAtOpen =
        "{" + rmComment.substring(openingIndex + 1, closingIndex) + "}";
      const rmEmptyLines = removeEmptyLines(splitAtOpen);
      return JSON.parse(JSON.stringify(rmEmptyLines));
      */

      // If JSON parsing fails, try evaluating as JavaScript
      // This is safe because we're only evaluating in the client browser context
      // eslint-disable-next-line no-new-func
      return new Function(`return ${input}`)();
    } catch (evalErr) {
      throw new Error(`Invalid theme object: ${evalErr.message}`);
    }
  }
};

const ThemePreview = () => {
  const [themeInput, setThemeInput] = useState("");
  const [parsedTheme, setParsedTheme] = useState(defaultTheme);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("colors");

  // Initialize with the default theme
  useEffect(() => {
    // Check if we should use the default theme or the one from the previous theme input
    if (!themeInput) {
      // Convert theme to string representation
      const themeStr = JSON.stringify(defaultTheme, null, 2);
      setThemeInput(themeStr);
    }
  }, [themeInput]);

  const handleApplyTheme = () => {
    try {
      const newTheme = parseThemeInput(themeInput);
      setParsedTheme(newTheme);
      setError("");
    } catch (err) {
      setError("Error parsing theme: " + err.message);
    }
  };

  const handleResetTheme = () => {
    const defaultThemeStr = JSON.stringify(defaultTheme, null, 2);
    setThemeInput(defaultThemeStr);
    setParsedTheme(defaultTheme);
    setError("");
  };

  const handleCopyTheme = () => {
    navigator.clipboard.writeText(themeInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get all colors from the theme
  const allColors = flattenColors(parsedTheme.colors || {});
  const colorCategories = groupColorsByCategory(allColors);

  // Get font information
  const getFontInfo = () => {
    const fontInfo = [];

    // Check for both font and fontFamily structures
    const fontFamilies =
      getNestedValue(parsedTheme, "typography.font") ||
      getNestedValue(parsedTheme, "typography.fontFamily");

    if (fontFamilies && typeof fontFamilies === "object") {
      Object.keys(fontFamilies).forEach((key) => {
        fontInfo.push({
          name: key,
          family: fontFamilies[key],
        });
      });
    }

    return fontInfo;
  };

  // Get font size information
  const getFontSizes = () => {
    const fontSizes = [];
    const sizes = getNestedValue(parsedTheme, "typography.fontSizes");

    if (sizes && typeof sizes === "object") {
      Object.keys(sizes).forEach((key) => {
        fontSizes.push({
          name: key,
          size: sizes[key],
        });
      });
    }

    return fontSizes;
  };

  // Get font weight information
  const getFontWeights = () => {
    const fontWeights = [];
    const weights = getNestedValue(parsedTheme, "typography.fontWeights");

    if (weights && typeof weights === "object") {
      Object.keys(weights).forEach((key) => {
        fontWeights.push({
          name: key,
          weight: weights[key],
        });
      });
    }

    return fontWeights;
  };

  // Get line height information
  const getLineHeights = () => {
    const lineHeights = [];
    const heights = getNestedValue(parsedTheme, "typography.lineHeights");

    if (heights && typeof heights === "object") {
      Object.keys(heights).forEach((key) => {
        lineHeights.push({
          name: key,
          height: heights[key],
        });
      });
    }

    return lineHeights;
  };

  // Get letter spacing information
  const getLetterSpacing = () => {
    const letterSpacings = [];
    const spacings = getNestedValue(parsedTheme, "typography.letterSpacing");

    if (spacings && typeof spacings === "object") {
      Object.keys(spacings).forEach((key) => {
        letterSpacings.push({
          name: key,
          spacing: spacings[key],
        });
      });
    }

    return letterSpacings;
  };

  // Get spacing values
  const getSpacingValues = () => {
    const spacingValues = [];

    if (typeof parsedTheme.spacing === "function") {
      // If spacing is a function, generate sample values
      for (let i = 1; i <= 12; i += 1) {
        spacingValues.push({
          key: i,
          value: parsedTheme.spacing(i),
        });
      }
    } else if (parsedTheme.spacing && typeof parsedTheme.spacing === "object") {
      // If spacing is an object, use its key-value pairs
      Object.keys(parsedTheme.spacing).forEach((key) => {
        spacingValues.push({
          key,
          value: parsedTheme.spacing[key],
        });
      });
    }

    return spacingValues;
  };

  // Get border radius values
  const getBorderRadiusValues = () => {
    const radiusValues = [];
    const radii =
      parsedTheme.borderRadius ||
      parsedTheme.radii ||
      getNestedValue(parsedTheme, "shape.borderRadius");

    if (radii && typeof radii === "object") {
      Object.keys(radii).forEach((key) => {
        radiusValues.push({
          name: key,
          value: radii[key],
        });
      });
    }

    return radiusValues;
  };

  // Get shadow values
  const getShadowValues = () => {
    const shadowValues = [];
    const shadows =
      parsedTheme.shadows ||
      parsedTheme.elevation ||
      getNestedValue(parsedTheme, "shadows");

    if (shadows && typeof shadows === "object") {
      Object.keys(shadows).forEach((key) => {
        shadowValues.push({
          name: key,
          value: shadows[key],
        });
      });
    }

    return shadowValues;
  };

  // Get transition values
  const getTransitionValues = () => {
    const transitionValues = [];
    const transitions =
      parsedTheme.transitions ||
      parsedTheme.motion ||
      getNestedValue(parsedTheme, "transitions");

    if (transitions && typeof transitions === "object") {
      Object.keys(transitions).forEach((key) => {
        transitionValues.push({
          name: key,
          value: transitions[key],
        });
      });
    }

    return transitionValues;
  };

  // Get z-index values
  const getZIndexValues = () => {
    const zIndexValues = [];
    const zIndices =
      parsedTheme.zIndex || getNestedValue(parsedTheme, "zIndices");

    if (zIndices && typeof zIndices === "object") {
      Object.keys(zIndices)
        .filter((key) => !isNaN(zIndices[key]))
        .sort((a, b) => zIndices[a] - zIndices[b])
        .forEach((key) => {
          zIndexValues.push({
            name: key,
            value: zIndices[key],
          });
        });
    }

    return zIndexValues;
  };

  // Get breakpoint values
  const getBreakpointValues = () => {
    const breakpointValues = [];
    const breakpoints =
      parsedTheme.breakpoints ||
      getNestedValue(parsedTheme, "breakpoints.values");

    if (breakpoints && typeof breakpoints === "object") {
      Object.keys(breakpoints).forEach((key) => {
        if (
          typeof breakpoints[key] === "string" ||
          typeof breakpoints[key] === "number"
        ) {
          breakpointValues.push({
            name: key,
            value: breakpoints[key],
          });
        }
      });
    }

    return breakpointValues;
  };

  return (
    <PageContainer>
      <Header>
        <Title>
          Theme Preview{" "}
          <BiPalette size={32} style={{ verticalAlign: "middle" }} />
        </Title>
        <Subtitle>
          Visualize your theme configuration with this interactive preview tool.
          Paste your theme object in the editor to see a live preview of colors,
          typography, spacing, and more.
        </Subtitle>
      </Header>

      <Content>
        <ThemeSection>
          <FlexRow>
            <SectionTitle>Theme Editor</SectionTitle>
            <CopyButton
              onClick={handleCopyTheme}
              title="Copy theme to clipboard"
            >
              {copied ? <BiCheck size={18} /> : <BiCopy size={18} />}
            </CopyButton>
          </FlexRow>

          <TextArea
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            spellCheck="false"
            placeholder="Paste your theme object here..."
          />

          <ActionBar>
            <Button onClick={handleApplyTheme}>Apply Theme</Button>
            <Button onClick={handleResetTheme} variant="secondary">
              Reset to Default
            </Button>
          </ActionBar>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ThemeSection>

        <ThemeSection>
          <SectionTitle>Preview</SectionTitle>

          <TabContainer>
            <FlexRow>
              <TabButton
                active={JSON.stringify(activeTab === "colors")}
                onClick={() => setActiveTab("colors")}
              >
                Colors
              </TabButton>
              <TabButton
                active={JSON.stringify(
                  JSON.stringify(activeTab === "typography")
                )}
                onClick={() => setActiveTab("typography")}
              >
                Typography
              </TabButton>
              <TabButton
                active={JSON.stringify(JSON.stringify(activeTab === "spacing"))}
                onClick={() => setActiveTab("spacing")}
              >
                Spacing
              </TabButton>
              <TabButton
                active={JSON.stringify(activeTab === "shapes")}
                onClick={() => setActiveTab("shapes")}
              >
                Shapes & Effects
              </TabButton>
              <TabButton
                active={JSON.stringify(activeTab === "responsive")}
                onClick={() => setActiveTab("responsive")}
              >
                Responsive
              </TabButton>
            </FlexRow>

            <TabContent active={JSON.stringify(activeTab === "colors")}>
              <PreviewContainer>
                {Object.keys(colorCategories).length > 0 ? (
                  Object.keys(colorCategories).map((category) => (
                    <ColorCategory key={category}>
                      <CategoryTitle>{category}</CategoryTitle>
                      <ColorsGrid>
                        {Object.keys(colorCategories[category]).map(
                          (colorKey) => (
                            <ColorCard key={colorKey}>
                              <ColorSwatch
                                color={colorCategories[category][colorKey]}
                              />
                              <ColorInfo>
                                <ColorName>
                                  {colorKey.split(".").slice(1).join(".")}
                                </ColorName>
                                <ColorValue>
                                  {colorCategories[category][colorKey]}
                                </ColorValue>
                              </ColorInfo>
                            </ColorCard>
                          )
                        )}
                      </ColorsGrid>
                    </ColorCategory>
                  ))
                ) : (
                  <p>No color values found in theme</p>
                )}
              </PreviewContainer>
            </TabContent>

            <TabContent active={JSON.stringify(activeTab === "typography")}>
              <TypographyContainer>
                {getFontInfo().length > 0 && (
                  <FontSection>
                    <SectionTitle>Font Families</SectionTitle>
                    {getFontInfo().map((font) => (
                      <div key={font.name}>
                        <FontSample $fontFamily={font.family}>
                          {font.name}: The quick brown fox jumps over the lazy
                          dog
                        </FontSample>
                        <FontInfo>
                          <InfoTag>{font.family}</InfoTag>
                        </FontInfo>
                      </div>
                    ))}
                  </FontSection>
                )}

                {getFontSizes().length > 0 && (
                  <FontSection>
                    <SectionTitle>Font Sizes</SectionTitle>
                    {getFontSizes().map((fontSize) => (
                      <div key={fontSize.name}>
                        <FontSample
                          fontFamily={
                            getNestedValue(
                              parsedTheme,
                              "typography.font.body"
                            ) ||
                            getNestedValue(
                              parsedTheme,
                              "typography.fontFamily.primary"
                            )
                          }
                          fontSize={fontSize.size}
                        >
                          {fontSize.name} ({fontSize.size}): The quick brown fox
                        </FontSample>
                      </div>
                    ))}
                  </FontSection>
                )}

                {getFontWeights().length > 0 && (
                  <FontSection>
                    <SectionTitle>Font Weights</SectionTitle>
                    {getFontWeights().map((fontWeight) => (
                      <div key={fontWeight.name}>
                        <FontSample
                          fontFamily={
                            getNestedValue(
                              parsedTheme,
                              "typography.font.body"
                            ) ||
                            getNestedValue(
                              parsedTheme,
                              "typography.fontFamily.primary"
                            )
                          }
                          fontWeight={fontWeight.weight}
                        >
                          {fontWeight.name} ({fontWeight.weight}): The quick
                          brown fox
                        </FontSample>
                      </div>
                    ))}
                  </FontSection>
                )}

                {getLineHeights().length > 0 && (
                  <FontSection>
                    <SectionTitle>Line Heights</SectionTitle>
                    {getLineHeights().map((lineHeight) => (
                      <div key={lineHeight.name}>
                        <FontSample
                          $fontFamily={
                            getNestedValue(
                              parsedTheme,
                              "typography.font.body"
                            ) ||
                            getNestedValue(
                              parsedTheme,
                              "typography.fontFamily.primary"
                            )
                          }
                          lineHeight={lineHeight.height}
                        >
                          {lineHeight.name} ({lineHeight.height}): The quick
                          brown fox jumps over the lazy dog. This is a multiline
                          text example to demonstrate different line heights in
                          the typography system.
                        </FontSample>
                      </div>
                    ))}
                  </FontSection>
                )}

                {getLetterSpacing().length > 0 && (
                  <FontSection>
                    <SectionTitle>Letter Spacing</SectionTitle>
                    {getLetterSpacing().map((letterSpacing) => (
                      <div key={letterSpacing.name}>
                        <FontSample
                          fontFamily={
                            getNestedValue(
                              parsedTheme,
                              "typography.font.body"
                            ) ||
                            getNestedValue(
                              parsedTheme,
                              "typography.fontFamily.primary"
                            )
                          }
                          letterSpacing={letterSpacing.spacing}
                        >
                          {letterSpacing.name} ({letterSpacing.spacing}): The
                          quick brown fox jumps over the lazy dog
                        </FontSample>
                      </div>
                    ))}
                  </FontSection>
                )}
              </TypographyContainer>
            </TabContent>

            <TabContent active={JSON.stringify(activeTab === "spacing")}>
              <SpacingContainer>
                {getSpacingValues().length > 0 ? (
                  <SpacingCategory>
                    <SectionTitle>Spacing Scale</SectionTitle>
                    {getSpacingValues().map((spacing) => (
                      <SpacingSample key={spacing.key}>
                        <SpacingBlock width={spacing.value} />
                        <SpacingInfo>
                          <SpacingLabel>spacing({spacing.key})</SpacingLabel>
                          <SpacingValue>{spacing.value}</SpacingValue>
                        </SpacingInfo>
                      </SpacingSample>
                    ))}
                  </SpacingCategory>
                ) : (
                  <p>No spacing values found in theme</p>
                )}
              </SpacingContainer>
            </TabContent>

            <TabContent active={JSON.stringify(activeTab === "shapes")}>
              <PreviewContainer>
                {getBorderRadiusValues().length > 0 && (
                  <BorderRadiusSection>
                    <SectionTitle>Border Radius</SectionTitle>
                    <RadiusPreview>
                      {getBorderRadiusValues().map((radius) => (
                        <RadiusItem key={radius.name} radius={radius.value}>
                          <RadiusValue>{radius.name}</RadiusValue>
                          <span>{radius.value}</span>
                        </RadiusItem>
                      ))}
                    </RadiusPreview>
                  </BorderRadiusSection>
                )}

                {getShadowValues().length > 0 && (
                  <ShadowSection>
                    <SectionTitle>Shadows</SectionTitle>
                    {getShadowValues().map((shadow) => (
                      <ShadowItem key={shadow.name}>
                        <ShadowBox shadow={shadow.value} />
                        <ShadowInfo>
                          <div>{shadow.name}</div>
                          <code>{shadow.value}</code>
                        </ShadowInfo>
                      </ShadowItem>
                    ))}
                  </ShadowSection>
                )}

                {getTransitionValues().length > 0 && (
                  <TransitionSection>
                    <SectionTitle>Transitions</SectionTitle>
                    {getTransitionValues().map((transition) => (
                      <TransitionItem key={transition.name}>
                        <TransitionPreview>
                          <TransitionBox transition={transition.value} />
                        </TransitionPreview>
                        <TransitionInfo>
                          <div>{transition.name}</div>
                          <code>{transition.value}</code>
                        </TransitionInfo>
                      </TransitionItem>
                    ))}
                  </TransitionSection>
                )}

                {getZIndexValues().length > 0 && (
                  <ZIndexSection>
                    <SectionTitle>Z-Index</SectionTitle>
                    <ZIndexVisualizer>
                      {getZIndexValues().map((zIndex, index) => (
                        <ZIndexLayer
                          key={zIndex.name}
                          index={index}
                          total={getZIndexValues().length}
                        >
                          <div>
                            <strong>{zIndex.name}</strong>: {zIndex.value}
                          </div>
                        </ZIndexLayer>
                      ))}
                    </ZIndexVisualizer>
                  </ZIndexSection>
                )}
              </PreviewContainer>
            </TabContent>

            <TabContent active={JSON.stringify(activeTab === "responsive")}>
              <BreakpointsSection>
                <SectionTitle>Breakpoints</SectionTitle>
                {getBreakpointValues().length > 0 ? (
                  getBreakpointValues().map((breakpoint) => (
                    <BreakpointItem key={breakpoint.name}>
                      <strong>{breakpoint.name}</strong>: {breakpoint.value}
                    </BreakpointItem>
                  ))
                ) : (
                  <p>No breakpoint values found in theme</p>
                )}
              </BreakpointsSection>
            </TabContent>
          </TabContainer>
        </ThemeSection>
      </Content>
    </PageContainer>
  );
};

export default ThemePreview;

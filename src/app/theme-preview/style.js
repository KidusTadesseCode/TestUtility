// src/app/theme-preview/style.js
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ThemeSection = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.elevation.low};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 300px;
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}30`};
  background-color: ${({ theme }) => `${theme.colors.background}`};
  color: ${({ theme }) => theme.colors.text.primary};
  resize: vertical;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing(3)};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme, variant }) =>
    variant === "secondary" ? theme.colors.secondary : theme.colors.primary};
  color: white;
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.9rem;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "secondary"
        ? theme.colors.surfaceHover
        : theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => `${theme.colors.secondary}50`};
    cursor: not-allowed;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const PreviewContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ColorCategory = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const CategoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-transform: capitalize;
`;

const ColorCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const ColorSwatch = styled.div`
  height: 100px;
  background-color: ${({ color }) => color};
`;

const ColorInfo = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => `${theme.colors.surface}`};
`;

const ColorName = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ColorValue = styled.p`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TypographyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const FontSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};

  &:last-child {
    border-bottom: none;
  }
`;

const FontSample = styled.p`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight }) => lineHeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => `${theme.colors.background}`};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const FontInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const InfoTag = styled.span`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => `${theme.colors.surface}`};
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1)}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const SpacingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const SpacingCategory = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SpacingSample = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SpacingBlock = styled.div`
  height: 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ width }) => width};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const SpacingInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpacingLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

const SpacingValue = styled.span`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const BorderRadiusSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const RadiusPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
`;

const RadiusItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  &::before {
    content: "";
    width: 100px;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ radius }) => radius};
  }
`;

const RadiusValue = styled.div`
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const ShadowSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const ShadowItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const ShadowBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ shadow }) => shadow};
  flex-shrink: 0;
`;

const ShadowInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  & > div {
    font-weight: bold;
  }

  & > code {
    font-family: ${({ theme }) => theme.typography.font.mono};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => `${theme.colors.background}`};
    padding: ${({ theme }) => theme.spacing(1)};
    border-radius: ${({ theme }) => theme.radii.sm};
    max-width: 300px;
    overflow-wrap: break-word;
  }
`;

const TransitionSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const TransitionItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const TransitionPreview = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TransitionBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ transition }) => transition};

  &:hover {
    transform: scale(1.2);
  }
`;

const TransitionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};

  & > div {
    font-weight: bold;
  }

  & > code {
    font-family: ${({ theme }) => theme.typography.font.mono};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => `${theme.colors.background}`};
    padding: ${({ theme }) => theme.spacing(1)};
    border-radius: ${({ theme }) => theme.radii.sm};
  }
`;

const ZIndexSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const ZIndexVisualizer = styled.div`
  position: relative;
  height: 300px;
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => `${theme.colors.background}`};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ZIndexLayer = styled.div`
  position: absolute;
  width: ${({ index, total }) => `${100 - index * 8}%`};
  height: ${({ index, total }) => `${100 - index * 8}%`};
  background-color: ${({ theme, index }) =>
    `${theme.colors.primary}${40 + index * 10}`};
  border-radius: ${({ theme }) => theme.radii.md};
  left: ${({ index }) => `${4 + index * 4}%`};
  top: ${({ index }) => `${4 + index * 4}%`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing(2)};
  z-index: ${({ index }) => index + 1};
`;

const BreakpointsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const BreakpointItem = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => `${theme.colors.background}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border-radius: ${({ theme }) => theme.radii.md};
  border-left: 4px solid ${({ theme }) => theme.colors.error};
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => `${theme.colors.surfaceHover}50`};
  }
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const TabButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  background-color: ${({ theme, active }) =>
    active === "true" ? theme.colors.primary : "transparent"};
  color: ${({ theme, active }) =>
    active === "true" ? "white" : theme.colors.text.secondary};
  border: 1px solid
    ${({ theme, active }) =>
      active === "true" ? theme.colors.primary : `${theme.colors.secondary}30`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme, active }) =>
      active === "true"
        ? theme.colors.primary
        : `${theme.colors.surfaceHover}50`};
    color: ${({ theme, active }) =>
      active === "true" ? "white" : theme.colors.text.primary};
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(1.5)}`};
    font-size: 0.8rem;
  }
`;

const TabContent = styled.div`
  display: ${({ active }) => (active === "true" ? "block" : "none")};
  max-height: 600px;
  overflow-y: auto;
`;

// Export statement for the extracted components
export {
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
};

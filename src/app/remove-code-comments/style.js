import styled from "styled-components";

export const RemoveCodeCommentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    height: 4px;
    width: 60px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;

export const SubContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(4)};

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "input actions"
      "input output";
  }
`;

export const EditorContainer = styled.div`
  position: relative;
  grid-area: input;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.motion.smooth};

  &:focus-within {
    box-shadow: ${({ theme }) => theme.elevation.high};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const EditorLabel = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.85rem;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-top-left-radius: ${({ theme }) => theme.radii.md};
  border-top-right-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: calc(100% - 44px);
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 1rem;
  border: none;
  padding: ${({ theme }) => theme.spacing(3)};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const ButtonContainer = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  align-self: start;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme, variant }) =>
    variant === "primary"
      ? theme.colors.primary
      : variant === "secondary"
      ? theme.colors.secondary
      : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  box-shadow: ${({ theme }) => theme.elevation.low};
  width: 100%;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${({ theme, variant }) =>
      variant === "primary"
        ? theme.colors.primaryHover
        : variant === "secondary"
        ? theme.colors.surfaceHover
        : theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.elevation.medium};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: ${({ theme }) => theme.motion.smooth};
  }

  &:hover::before {
    left: 100%;
  }
`;

export const DisplayTextContainer = styled.div`
  grid-area: output;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  padding: 0;
  overflow: hidden;
  position: relative;
`;

export const OutputLabel = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.85rem;
  padding: ${({ theme }) => theme.spacing(1.5)};
  border-top-left-radius: ${({ theme }) => theme.radii.md};
  border-top-right-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OutputContent = styled.pre`
  width: 100%;
  height: calc(100% - 44px);
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 1rem;
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(3)};
  margin: 0;
  white-space: pre-wrap;
`;

export const StatusIndicator = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme, active }) =>
    active === "true" ? theme.colors.accent : theme.colors.text.tertiary};
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

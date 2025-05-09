// src/app/styled-extractor/style.js
import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  text-align: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const LogoIcon = styled.span`
  font-size: 2rem;
  margin-right: ${({ theme }) => theme.spacing(2)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1rem;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(6)};

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const InputSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const SectionInfo = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.body};
  resize: vertical;
  transition: ${({ theme }) => theme.motion.quick};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export const NamesInput = styled(StyledTextarea)`
  min-height: 48px;
  font-family: ${({ theme }) => theme.typography.font.body};
`;

export const StyledCodeTextarea = styled(StyledTextarea)`
  min-height: 300px;
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateY(-2px);
  }
`;

export const OutputSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

export const ResultContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing(3)};
  min-height: 400px;
  overflow: auto;
  position: relative;
`;

export const ResultCode = styled.pre`
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.6;
`;

export const CopyButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text.inverted};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  min-height: 400px;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

export const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 80%;
`;

export const Footer = styled.footer`
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.surface};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.875rem;
`;

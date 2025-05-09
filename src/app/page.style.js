// src/app/page.style.js
import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 80px; // Space for the navbar
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(4)}`};
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const UtilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  max-width: 1200px;
  padding: ${({ theme }) => `0 ${theme.spacing(4)}`};
  margin: 0 auto;
`;

const UtilityCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(6)};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.low};
  transition: ${({ theme }) => theme.motion.smooth};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.elevation.medium};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverted};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-align: center;
`;

const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

export {
  PageContainer,
  HeroSection,
  Title,
  Subtitle,
  UtilitiesGrid,
  UtilityCard,
  IconWrapper,
  CardTitle,
  CardDescription,
  StyledLink,
};

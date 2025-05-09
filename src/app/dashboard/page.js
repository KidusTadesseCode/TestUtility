"use client";
// src/app/dashboard/page.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiBookReader, BiCog, BiHomeAlt } from "react-icons/bi";
import { FiCodepen, FiFilter } from "react-icons/fi";
import { SiPrisma } from "react-icons/si";
import { useUser } from "@clerk/nextjs";
import styled from "styled-components";

// Styled Components
const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
  margin-top: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing(10)} ${theme.spacing(4)}`};
  }
`;

const WelcomeSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const WelcomeTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const WelcomeSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  max-width: 600px;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const ToolCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.motion.smooth};
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ToolHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(5)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $color }) => $color || theme.colors.primary}20;
  color: ${({ theme, $color }) => $color || theme.colors.primary};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $color }) => $color || theme.colors.primary}30;
  font-size: 1.5rem;
`;

const ToolContent = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ToolTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 1.2rem;
`;

const ToolDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  line-height: 1.6;
  flex-grow: 1;
`;

const ToolLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const ToolButton = styled.div`
  display: inline-block;
  background-color: ${({ theme, $color }) => $color || theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: ${({ theme }) => theme.motion.quick};
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  font-size: 1.8rem;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -8px;
    width: 40px;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

// Define tools with their metadata
const tools = [
  {
    name: "Screen Reader",
    path: "/screen-reader",
    icon: BiBookReader,
    description:
      "Convert text to speech with natural-sounding voices. Perfect for accessibility or content consumption on the go.",
    color: "#61DAFB", // Cyan
  },
  {
    name: "Remove Code Comments",
    path: "/remove-code-comments",
    icon: FiCodepen,
    description:
      "Clean up your code by removing comments. Useful for minification or when preparing code for production.",
    color: "#F44336", // Red
  },
  {
    name: "Component Extractor",
    path: "/component-extractor",
    icon: FiFilter,
    description:
      "Extract and isolate components from your codebase. Helps in understanding and refactoring complex applications.",
    color: "#4CAF50", // Green
  },
  {
    name: "Prisma Schema Fusion",
    path: "/prisma-schema-fusion",
    icon: SiPrisma,
    description:
      "Merge multiple Prisma schema files into a single unified schema. Ideal for large projects with modular database designs.",
    color: "#6D5AE6", // Purple
  },
  {
    name: "Settings",
    path: "/settings",
    icon: BiCog,
    description:
      "Customize your experience by adjusting application settings and preferences.",
    color: "#FF9800", // Orange
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

// Dashboard Component
export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || "there";

  return (
    <DashboardContainer>
      <WelcomeSection
        as={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <WelcomeTitle>Welcome, {firstName}!</WelcomeTitle>
        <WelcomeSubtitle>
          Your developer toolbox awaits. Access powerful utilities designed to
          streamline your workflow.
        </WelcomeSubtitle>
      </WelcomeSection>

      <SectionTitle
        as={motion.h2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Available Tools
      </SectionTitle>

      <ToolsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool, index) => (
          <ToolLink href={tool.path} key={tool.path}>
            <ToolCard variants={itemVariants}>
              <ToolHeader $color={tool.color}>
                <IconWrapper $color={tool.color}>
                  <tool.icon size={24} />
                </IconWrapper>
              </ToolHeader>
              <ToolContent>
                <ToolTitle>{tool.name}</ToolTitle>
                <ToolDescription>{tool.description}</ToolDescription>
                <ToolButton $color={tool.color}>Launch Tool</ToolButton>
              </ToolContent>
            </ToolCard>
          </ToolLink>
        ))}
      </ToolsGrid>
    </DashboardContainer>
  );
}

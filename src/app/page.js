// src/app/page.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import { BiBookReader, BiBarChartAlt2, BiCodeAlt, BiCog } from "react-icons/bi";
import {
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
} from "./page.style";
// Home Page Component
export default function Home() {
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
        stiffness: 100,
      },
    },
  };

  const utilities = [
    {
      title: "Screen Reader",
      description:
        "Clean up text for optimal accessibility and readability by removing markdown characters.",
      icon: <BiBookReader size={32} />,
      color: "primary",
      path: "/screen-reader",
    },
    {
      title: "Data Visualizer",
      description:
        "Create beautiful charts and graphs from your data with a simple interface.",
      icon: <BiBarChartAlt2 size={32} />,
      color: "accent",
      path: "/data-visualizer",
    },
    {
      title: "Code Formatter",
      description:
        "Format and beautify code snippets in various programming languages.",
      icon: <BiCodeAlt size={32} />,
      color: "secondary",
      path: "/code-formatter",
    },
    {
      title: "Settings",
      description:
        "Customize your experience with personalized settings and preferences.",
      icon: <BiCog size={32} />,
      color: "success",
      path: "/settings",
    },
  ];

  return (
    <PageContainer>
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Utility Tools for Everyday Tasks
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A collection of helpful utilities to streamline your workflow and
          boost productivity. Simple, fast, and designed with a focus on user
          experience.
        </Subtitle>
      </HeroSection>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <UtilitiesGrid>
          {utilities.map((utility, index) => (
            <StyledLink href={utility.path} key={utility.title}>
              <UtilityCard
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconWrapper color={utility.color}>{utility.icon}</IconWrapper>
                <CardTitle>{utility.title}</CardTitle>
                <CardDescription>{utility.description}</CardDescription>
              </UtilityCard>
            </StyledLink>
          ))}
        </UtilitiesGrid>
      </motion.div>
    </PageContainer>
  );
}

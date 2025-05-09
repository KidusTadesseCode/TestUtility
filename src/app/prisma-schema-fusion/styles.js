// src/app/prisma-schema-fusion/styles.js
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiFile, FiUploadCloud } from "react-icons/fi";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  overflow: hidden;
  transition: ${({ theme }) => theme.motion.smooth};
`;

const UploadArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  border: 2px dashed ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  transition: ${({ theme }) => theme.motion.smooth};
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const UploadIcon = styled(FiUploadCloud)`
  width: 48px;
  height: 48px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const UploadText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const BrowseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(4)}`};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
`;

const FileListContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing(3)};
  max-height: 300px;
  overflow-y: auto;
`;

const FileListTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 1.125rem;
`;

const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FileItemCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  background-color: ${({ theme }) => theme.colors.surfaceHover};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const FileIcon = styled(FiFile)`
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

const FileName = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SchemaOutput = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SchemaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;

const SchemaTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-size: 1.125rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const SchemaContent = styled.pre`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.font.mono};
  font-size: 0.875rem;
  line-height: 1.6;
  padding: ${({ theme }) => theme.spacing(4)};
  margin: 0;
  overflow-x: auto;
  border-radius: 0 0 ${({ theme }) => `${theme.radii.md} ${theme.radii.md}`};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;

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
      damping: 20,
    },
  },
};

export {
  Container,
  Card,
  UploadArea,
  UploadIcon,
  UploadText,
  BrowseButton,
  FileListContainer,
  FileListTitle,
  FileGrid,
  FileItemCard,
  FileIcon,
  FileName,
  SchemaOutput,
  SchemaHeader,
  SchemaTitle,
  ActionButtons,
  IconButton,
  SchemaContent,
  EmptyState,
  containerVariants,
  itemVariants,
};

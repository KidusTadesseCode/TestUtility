"use client";
// src/app/prisma-schema-fusion/page.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiCheck, FiTrash2 } from "react-icons/fi";
import { parsePrismaFiles } from "./helper";
import {
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
} from "./styles";

// Main component
function PrismaSchemaFusion({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [mergedSchema, setMergedSchema] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length > 0) {
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles) => {
    const filteredFiles = newFiles.filter((file) =>
      file.name.endsWith(".prisma")
    );
    if (filteredFiles.length === 0) return;

    setFiles((prevFiles) => {
      // Filter out duplicates
      const uniqueNewFiles = filteredFiles.filter(
        (newFile) =>
          !prevFiles.some((existingFile) => existingFile.name === newFile.name)
      );
      return [...prevFiles, ...uniqueNewFiles];
    });

    processFiles([...files, ...filteredFiles]);

    if (onFilesSelected) {
      onFilesSelected(filteredFiles);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(event.dataTransfer.files);
    addFiles(newFiles);
  };

  const processFiles = async (filesToProcess) => {
    const prismaFiles = filesToProcess.filter((file) =>
      file.name.endsWith(".prisma")
    );
    if (prismaFiles.length > 0) {
      try {
        const mergedSchemaContent = await parsePrismaFiles(prismaFiles);
        setMergedSchema(mergedSchemaContent);
      } catch (error) {
        console.error("Error processing Prisma files:", error);
        // Here you could add error handling UI
      }
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mergedSchema).then(() => {
      setCopySuccess(true);
    });
  };

  const handleClearFiles = () => {
    setFiles([]);
    setMergedSchema("");
  };

  return (
    <Container
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        style={{ color: "white", marginBottom: "1rem" }}
        variants={itemVariants}
      >
        Prisma Schema Fusion
      </motion.h2>

      <motion.div variants={itemVariants}>
        <UploadArea
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          whileHover={{ scale: 1.01 }}
          animate={{
            borderColor: isDragging ? "#6D5AE6" : "#3D4451",
            backgroundColor: isDragging
              ? "rgba(109, 90, 230, 0.05)"
              : "transparent",
          }}
        >
          <UploadIcon />
          <UploadText>
            Drag and drop .prisma files here, or click to select files
          </UploadText>
          <input
            type="file"
            multiple
            accept=".prisma"
            onChange={handleFileChange}
            hidden
            id="fileInput"
          />
          <label htmlFor="fileInput">
            <BrowseButton as="span">Browse Files</BrowseButton>
          </label>
        </UploadArea>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <FileListContainer
            variants={itemVariants}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FileListTitle>Uploaded Files ({files.length})</FileListTitle>
            <FileGrid>
              {files.map((file, index) => (
                <FileItemCard
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <FileIcon />
                  <FileName>{file.name}</FileName>
                </FileItemCard>
              ))}
            </FileGrid>
          </FileListContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mergedSchema ? (
          <SchemaOutput
            key="output"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card>
              <SchemaHeader>
                <SchemaTitle>Merged Prisma Schema</SchemaTitle>
                <ActionButtons>
                  <IconButton
                    onClick={handleCopyToClipboard}
                    whileTap={{ scale: 0.95 }}
                    title="Copy to clipboard"
                  >
                    {copySuccess ? (
                      <FiCheck size={18} color="#4CAF50" />
                    ) : (
                      <FiCopy size={18} />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={handleClearFiles}
                    whileTap={{ scale: 0.95 }}
                    title="Clear all files"
                  >
                    <FiTrash2 size={18} />
                  </IconButton>
                </ActionButtons>
              </SchemaHeader>
              <SchemaContent>{mergedSchema}</SchemaContent>
            </Card>
          </SchemaOutput>
        ) : files.length > 0 ? (
          <EmptyState as={motion.div} variants={itemVariants}>
            <p>Processing your Prisma schema files...</p>
          </EmptyState>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}

export default PrismaSchemaFusion;

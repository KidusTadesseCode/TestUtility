// src/component/MulipleIntoSingleSchema/MulipleIntoSingleSchema.js
import React, { useEffect, useState } from "react";
import {
  MulipleIntoSingleSchemaContainer,
  FileList,
  UploadContainer,
  FileItem,
  DisplaySchemaContainer,
  CopyIcon,
  IconContainer,
  CheckIcon,
  TrashIcon,
} from "./MulipleIntoSingleSchema_style";
import { parsePrismaFiles } from "./helper";

function MulipleIntoSingleSchema({ onFilesSelected }) {
  const [files, setFiles] = useState([]);
  const [mergedSchema, setMergedSchema] = useState("");
  const [iconsClicked, setIconsClicked] = useState(false);

  useEffect(() => {
    if (iconsClicked) {
      setTimeout(() => {
        setIconsClicked(false);
      }, 3000);
    }
  }, [iconsClicked]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    processFiles(newFiles);
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    processFiles(newFiles);
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };

  const processFiles = async (files) => {
    const prismaFiles = files.filter((file) => file.name.endsWith(".prisma"));
    if (prismaFiles.length > 0) {
      const mergedSchemaContent = await parsePrismaFiles(prismaFiles);
      setMergedSchema(mergedSchemaContent);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mergedSchema);
  };

  const handleClearFiles = () => {
    setFiles([]);
    setMergedSchema("");
  };

  const iconOnClick = () => {
    setIconsClicked(true);
    handleCopyToClipboard();
  };

  return (
    <MulipleIntoSingleSchemaContainer>
      <UploadContainer onDragOver={handleDragOver} onDrop={handleDrop}>
        <p>Drag and drop .prisma files here, or click to select files</p>
        <input
          type="file"
          multiple
          accept=".prisma"
          onChange={handleFileChange}
          hidden
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer", color: "blue" }}>
          Browse Files
        </label>
      </UploadContainer>
      {files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>{file.name}</FileItem>
          ))}
        </FileList>
      )}

      {mergedSchema && (
        <DisplaySchemaContainer>
          <IconContainer>
            <TrashIcon onClick={handleClearFiles} />
            {iconsClicked ? <CheckIcon /> : <CopyIcon onClick={iconOnClick} />}
          </IconContainer>
          <h3>Merged Prisma Schema</h3>
          <pre>{mergedSchema}</pre>
        </DisplaySchemaContainer>
      )}
    </MulipleIntoSingleSchemaContainer>
  );
}

export default MulipleIntoSingleSchema;

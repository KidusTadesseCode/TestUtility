// src/components/GitHub/RepoSelectionModal.jsx
"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { BiGitRepoForked, BiX, BiSearch, BiCheck } from "react-icons/bi";

const RepoSelectionModal = ({ isOpen, onClose, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's repositories from GitHub
  useEffect(() => {
    if (!isOpen) return;

    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/github/available-repositories");
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setRepositories(data.repositories || []);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("Failed to fetch repositories from GitHub");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [isOpen]);

  // Toggle repository selection
  const toggleRepo = (repoId) => {
    setSelectedRepos((prevSelected) => {
      if (prevSelected.includes(repoId)) {
        return prevSelected.filter((id) => id !== repoId);
      } else {
        return [...prevSelected, repoId];
      }
    });
  };

  // Filter repositories based on search term
  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(selectedRepos);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContainer
        as={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <ModalHeader>
          <ModalTitle>
            <BiGitRepoForked size={22} />
            Select GitHub Repositories
          </ModalTitle>
          <CloseButton onClick={onClose}>
            <BiX size={24} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <SearchBar>
            <BiSearch size={20} />
            <SearchInput
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          {loading ? (
            <LoadingMessage>Loading repositories...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : filteredRepos.length === 0 ? (
            <EmptyMessage>
              {searchTerm
                ? "No repositories match your search"
                : "No repositories found in your GitHub account"}
            </EmptyMessage>
          ) : (
            <RepositoryList>
              {filteredRepos.map((repo) => (
                <RepositoryItem
                  key={repo.id}
                  $selected={selectedRepos.includes(repo.id)}
                  onClick={() => toggleRepo(repo.id)}
                >
                  <CheckboxContainer>
                    {selectedRepos.includes(repo.id) ? (
                      <CheckboxChecked>
                        <BiCheck size={16} />
                      </CheckboxChecked>
                    ) : (
                      <CheckboxUnchecked />
                    )}
                  </CheckboxContainer>
                  <RepoInfo>
                    <RepoName>{repo.name}</RepoName>
                    <RepoVisibility $private={repo.private}>
                      {repo.private ? "Private" : "Public"}
                    </RepoVisibility>
                  </RepoInfo>
                </RepositoryItem>
              ))}
            </RepositoryList>
          )}
        </ModalContent>

        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConnectButton
            onClick={handleSubmit}
            disabled={selectedRepos.length === 0}
          >
            Connect Selected Repositories
          </ConnectButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.high};
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  overflow-y: auto;
  flex: 1;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(2)}`};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.secondary};

  & > svg {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  padding: ${({ theme }) => theme.spacing(1)};
  flex: 1;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const RepositoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const RepositoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  background-color: ${({ theme, $selected }) =>
    $selected ? `${theme.colors.primary}15` : theme.colors.background};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : `${theme.colors.secondary}30`};
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme, $selected }) =>
      $selected ? `${theme.colors.primary}20` : theme.colors.surfaceHover};
  }
`;

const CheckboxContainer = styled.div`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const CheckboxUnchecked = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const CheckboxChecked = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const RepoInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RepoName = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

const RepoVisibility = styled.span`
  background-color: ${({ theme, $private }) =>
    $private ? `${theme.colors.error}30` : `${theme.colors.success}30`};
  color: ${({ theme, $private }) =>
    $private ? theme.colors.error : theme.colors.success};
  font-size: 0.8rem;
  padding: ${({ theme }) => `${theme.spacing(0.5)} ${theme.spacing(1.5)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.error};
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const ConnectButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  font-size: 0.9rem;
  font-weight: 500;
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

export default RepoSelectionModal;

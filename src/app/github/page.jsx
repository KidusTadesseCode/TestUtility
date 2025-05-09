// src/app/github/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiGitBranch,
  BiSync,
  BiGitRepoForked,
  BiLinkExternal,
  BiGitPullRequest,
  BiPlus,
  BiSearchAlt,
  BiChevronDown,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import RepoSelectionModal from "@/components/GitHub/RepoSelectionModal";
import {
  PageContainer,
  Header,
  Title,
  Subtitle,
  LoadingContainer,
  ErrorMessage,
  ConnectSection,
  ConnectCard,
  ConnectButton,
  RepositoriesSection,
  SectionHeader,
  ConnectedText,
  LayoutContainer,
  SearchContainer,
  SearchInputContainer,
  SearchInput,
  DropdownContainer,
  DropdownButton,
  SelectedRepo,
  DropdownList,
  DropdownItem,
  RepoVisibilityTag,
  RepositoryDetail,
  RepoHeader,
  RepoTitle,
  RepoVisibility,
  ActionButtons,
  AddButton,
  RefreshButton,
  RepoDescription,
  RepoBranches,
  BranchesTitle,
  BranchesList,
  BranchItem,
  BranchName,
  BranchCommitInfo,
  RepoActions,
  ActionButton,
  ViewRepoButton,
  EmptyState,
} from "./style";

const GitHubPage = () => {
  const { user, isLoaded } = useUser();
  const [isConnected, setIsConnected] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRepoSelectionOpen, setIsRepoSelectionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const checkGitHubConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Checking GitHub connection by fetching repositories...");

        // Make the API request to repositories endpoint instead of status
        const response = await fetch("/api/github/repositories");

        // Handle server errors gracefully
        if (response.status >= 500) {
          console.error(
            "Server error when fetching repositories:",
            response.status
          );
          setError(
            "Unable to verify GitHub connection. Server error occurred."
          );
          setIsConnected(false);
          setLoading(false);
          return;
        }

        // If we get a 404 with "GitHub account not connected" message, user is not connected
        if (response.status === 404) {
          console.log("GitHub account is not connected");
          setIsConnected(false);
          setLoading(false);
          return;
        }

        // Handle other HTTP errors
        if (!response.ok) {
          console.error(
            "API error when fetching repositories:",
            response.status
          );
          setError(`API error: ${response.status}`);
          setIsConnected(false);
          setLoading(false);
          return;
        }

        // Parse the response data
        const data = await response.json();

        // If we successfully got repositories, user is connected
        if (data.repositories) {
          console.log("GitHub account is connected, found repositories");
          setIsConnected(true);
          setRepositories(data.repositories);
          if (data.repositories.length > 0) {
            setSelectedRepo(data.repositories[0]);
          }
          setLoading(false);
        } else {
          // No repositories but no error either - user is connected but has no repos
          console.log("GitHub account is connected but no repositories found");
          setIsConnected(true);
          setRepositories([]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking GitHub connection:", error);
        setError(`Failed to check GitHub connection: ${error.message}`);
        setIsConnected(false);
        setLoading(false);
      }
    };

    checkGitHubConnection();
  }, [isLoaded, user]);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      console.log("Fetching GitHub repositories...");
      const response = await fetch("/api/github/repositories");
      if (response.status >= 500) {
        console.error(
          "Server error when fetching repositories:",
          response.status
        );
        setError("Unable to fetch repositories. Server error occurred.");
        setLoading(false);
        return;
      }

      // If we get a 404 with "GitHub account not connected" message, user is not connected
      if (response.status === 404) {
        console.log("GitHub account is not connected");
        setIsConnected(false);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        console.error("API error when fetching repositories:", response.status);
        setError(`API error: ${response.status}`);
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setRepositories(data.repositories || []);
      if (data.repositories && data.repositories.length > 0) {
        setSelectedRepo(data.repositories[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      setError(`Failed to fetch GitHub repositories: ${error.message}`);
      setLoading(false);
    }
  };

  // Connect GitHub account
  const connectGitHub = async () => {
    try {
      const response = await fetch("/api/github/authorize");
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error(
            "Server error during authorization. Please try again later."
          );
        } else {
          throw new Error(`Authorization API error: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to GitHub's installation page which has its own repo selector
      window.location.href = data.url;
    } catch (error) {
      console.error("Error connecting to GitHub:", error);
      setError(`Failed to initiate GitHub connection: ${error.message}`);
    }
  };

  // Handle repository selection
  const handleRepoSelection = async (selectedRepoIds) => {
    try {
      const response = await fetch(
        `/api/github/authorize?repositories=${selectedRepoIds.join(",")}`
      );

      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error(
            "Server error during authorization. Please try again later."
          );
        } else {
          throw new Error(`Authorization API error: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to GitHub OAuth URL
      window.location.href = data.url;
    } catch (error) {
      console.error("Error connecting to GitHub:", error);
      setError(`Failed to initiate GitHub connection: ${error.message}`);
    }
  };

  // Select repository from dropdown
  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setIsDropdownOpen(false);
  };

  // Set up webhook for a repository
  const setupWebhook = async (repositoryId) => {
    try {
      const response = await fetch("/api/github/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repositoryId }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update local repositories state
      setRepositories((prevRepositories) =>
        prevRepositories.map((repo) =>
          repo.id === repositoryId
            ? { ...repo, webhookId: data.webhookId }
            : repo
        )
      );
    } catch (error) {
      console.error("Error setting up webhook:", error);
      setError(`Failed to set up webhook for repository: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!isConnected) return;
    // setLoading(true);

    let ws;
    const setupWebSocket = async () => {
      try {
        // First, get a WebSocket token
        const tokenResponse = await fetch("/api/github/websocket");
        const tokenData = await tokenResponse.json();
        console.log("tokenData: ", tokenData);

        if (tokenData.error) {
          console.error("Error getting WebSocket token:", tokenData.error);
          return;
        }

        // Create WebSocket connection with the token
        ws = new WebSocket(tokenData.url);

        ws.onopen = () => {
          console.log("WebSocket connection established");
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "REPOSITORY_UPDATE") {
              // Update repository data in state
              setRepositories((prevRepositories) =>
                prevRepositories.map((repo) =>
                  repo.id === data.repositoryId
                    ? { ...repo, ...data.updates }
                    : repo
                )
              );
            } else if (data.type === "BRANCH_UPDATE") {
              // Update branch data in repository
              setRepositories((prevRepositories) =>
                prevRepositories.map((repo) => {
                  if (repo.id === data.repositoryId) {
                    return {
                      ...repo,
                      branches: repo.branches.map((branch) =>
                        branch.name === data.branchName
                          ? { ...branch, ...data.updates }
                          : branch
                      ),
                    };
                  }
                  return repo;
                })
              );
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onerror = (error) => {
          console.log("error:", error);
          setError("WebSocket connection error. Please refresh the page.");
        };

        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } catch (error) {
        console.error("Error setting up WebSocket:", error);
        setError(
          "Failed to establish real-time connection. Please refresh the page."
        );
      }
    };

    setupWebSocket();
    // setLoading(false);

    // Clean up WebSocket on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [isConnected]);

  if (!isLoaded) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <PageContainer>
      <Header>
        <Title>GitHub Integration</Title>
        <Subtitle>
          Connect your GitHub account to monitor repositories and receive
          real-time updates
        </Subtitle>
      </Header>

      {error && (
        <ErrorMessage>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </ErrorMessage>
      )}

      {!isConnected ? (
        <ConnectSection>
          <ConnectCard>
            <h2>Connect to GitHub</h2>
            <p>
              Connect your GitHub account to access your repositories and set up
              automatic updates. You'll be able to select which repositories you
              want to give access to.
            </p>
            <ConnectButton onClick={connectGitHub}>
              Connect GitHub Account
            </ConnectButton>
          </ConnectCard>
        </ConnectSection>
      ) : loading ? (
        <LoadingContainer>
          <BiSync className="spin" size={40} />
          <p>Loading repositories...</p>
        </LoadingContainer>
      ) : (
        <RepositoriesSection>
          <SectionHeader>
            <div>
              <h2>Your Repositories</h2>
              <ConnectedText>
                Connected as{" "}
                <strong>
                  {repositories[0]?.githubAccount?.githubUsername}
                </strong>
              </ConnectedText>
            </div>
          </SectionHeader>

          {repositories.length === 0 ? (
            <EmptyState>
              <p>
                No repositories connected. Click "Add Repositories" to select
                repositories to monitor.
              </p>
              <AddButton onClick={() => setIsRepoSelectionOpen(true)}>
                <BiPlus size={18} />
                Add Repositories
              </AddButton>
            </EmptyState>
          ) : (
            <>
              {selectedRepo && (
                <RepositoryDetail>
                  <RepoHeader>
                    <RepoTitle>
                      <BiGitRepoForked size={22} />
                      {selectedRepo.name}
                      <RepoVisibility $private={selectedRepo.private}>
                        {selectedRepo.private ? "Private" : "Public"}
                      </RepoVisibility>
                    </RepoTitle>

                    <ActionButtons>
                      <AddButton onClick={() => setIsRepoSelectionOpen(true)}>
                        <BiPlus size={18} />
                        Add Repositories
                      </AddButton>
                      <RefreshButton onClick={fetchRepositories}>
                        <BiSync size={18} />
                        Refresh
                      </RefreshButton>
                    </ActionButtons>
                  </RepoHeader>

                  {selectedRepo.description && (
                    <RepoDescription>
                      {selectedRepo.description}
                    </RepoDescription>
                  )}

                  <RepoBranches>
                    <BranchesTitle>
                      <BiGitBranch size={16} />
                      Branches
                    </BranchesTitle>

                    <BranchesList>
                      {selectedRepo.branches?.map((branch) => (
                        <BranchItem key={branch.name}>
                          <BranchName
                            $isDefault={
                              branch.name === selectedRepo.defaultBranch
                            }
                          >
                            {branch.name}
                          </BranchName>
                          {branch.lastCommitDate && (
                            <BranchCommitInfo>
                              Last commit:{" "}
                              {new Date(branch.lastCommitDate).toLocaleString()}
                            </BranchCommitInfo>
                          )}
                        </BranchItem>
                      ))}
                    </BranchesList>
                  </RepoBranches>

                  <RepoActions>
                    <ViewRepoButton
                      href={`https://github.com/${selectedRepo.fullName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BiLinkExternal size={16} />
                      View on GitHub
                    </ViewRepoButton>
                  </RepoActions>
                </RepositoryDetail>
              )}
            </>
          )}
          <LayoutContainer>
            <SearchContainer>
              <SearchInputContainer>
                <BiSearchAlt size={20} />
                <SearchInput
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchInputContainer>
            </SearchContainer>
            <DropdownContainer>
              <DropdownButton
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <SelectedRepo>
                  <BiGitRepoForked size={18} />
                  {selectedRepo ? selectedRepo.name : "Select a repository"}
                </SelectedRepo>
                <BiChevronDown
                  size={20}
                  style={{
                    transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </DropdownButton>

              {isDropdownOpen && (
                <DropdownList>
                  {repositories.map((repo) => (
                    <DropdownItem
                      key={repo.id}
                      onClick={() => handleSelectRepo(repo)}
                      $isSelected={selectedRepo?.id === repo.id}
                    >
                      <BiGitRepoForked size={16} />
                      {repo.name}
                      <RepoVisibilityTag $private={repo.private}>
                        {repo.private ? "Private" : "Public"}
                      </RepoVisibilityTag>
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </DropdownContainer>
          </LayoutContainer>
        </RepositoriesSection>
      )}

      {/* Repository Selection Modal */}
      <AnimatePresence>
        {isRepoSelectionOpen && (
          <RepoSelectionModal
            isOpen={isRepoSelectionOpen}
            onClose={() => setIsRepoSelectionOpen(false)}
            onSubmit={handleRepoSelection}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
export default GitHubPage;

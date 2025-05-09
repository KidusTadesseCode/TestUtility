// src/services/githubService.js
import prisma from "@/libs/prisma/prisma";
import {
  buildGitHubApiUrl,
  REPOS_PER_PAGE,
  BRANCHES_PER_REPO,
} from "../config/github";

class GitHubService {
  /**
   * Get a user's GitHub account from the database
   * @param {string} userId - The user's ID in our system
   * @returns {Promise<Object|null>} - The GitHub account or null if not found
   */
  async getGitHubAccount(userId) {
    return prisma.githubAccount.findFirst({
      where: { userId },
    });
  }

  /**
   * Check if a GitHub OAuth token is valid by making a simple API call
   * @param {string} accessToken - The GitHub OAuth access token
   * @returns {Promise<boolean>} - True if token is valid, false otherwise
   */
  async isTokenValid(accessToken) {
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error validating GitHub token:", error);
      return false;
    }
  }

  /**
   * Refresh a GitHub OAuth token using the refresh token
   * @param {string} githubAccountId - The GitHub account ID in our database
   * @returns {Promise<boolean>} - True if token was refreshed, false otherwise
   */
  async refreshToken(githubAccountId) {
    try {
      const githubAccount = await prisma.githubAccount.findUnique({
        where: { id: githubAccountId },
      });

      if (!githubAccount || !githubAccount.refreshToken) {
        return false;
      }

      const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            refresh_token: githubAccount.refreshToken,
            grant_type: "refresh_token",
          }),
        }
      );

      const data = await response.json();

      if (data.error || !data.access_token) {
        return false;
      }

      // Update token in database
      await prisma.githubAccount.update({
        where: { id: githubAccountId },
        data: {
          accessToken: data.access_token,
          refreshToken: data.refresh_token || githubAccount.refreshToken,
          expiresAt: data.expires_in
            ? new Date(Date.now() + data.expires_in * 1000)
            : null,
          updatedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error("Error refreshing GitHub token:", error);
      return false;
    }
  }

  /**
   * Fetch all repositories for a user from GitHub
   * @param {string} accessToken - The GitHub OAuth access token
   * @returns {Promise<Array>} - Array of repositories
   */
  async fetchRepositories(accessToken) {
    try {
      const url = buildGitHubApiUrl("user/repos", {
        per_page: REPOS_PER_PAGE,
        sort: "updated",
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      throw error;
    }
  }

  /**
   * Fetch branches for a repository from GitHub
   * @param {string} accessToken - The GitHub OAuth access token
   * @param {string} repoFullName - The full name of the repository (owner/repo)
   * @returns {Promise<Array>} - Array of branches
   */
  async fetchBranches(accessToken, repoFullName) {
    try {
      const url = buildGitHubApiUrl(`repos/${repoFullName}/branches`, {
        per_page: BRANCHES_PER_REPO,
      });

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching branches for ${repoFullName}:`, error);
      throw error;
    }
  }

  /**
   * Fetch the latest commit for a branch
   * @param {string} accessToken - The GitHub OAuth access token
   * @param {string} repoFullName - The full name of the repository (owner/repo)
   * @param {string} branchName - The name of the branch
   * @returns {Promise<Object>} - Commit data
   */
  async fetchLatestCommit(accessToken, repoFullName, branchName) {
    try {
      const url = buildGitHubApiUrl(
        `repos/${repoFullName}/commits/${branchName}`
      );

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching latest commit for ${repoFullName}/${branchName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Create a webhook for a repository
   * @param {string} accessToken - The GitHub OAuth access token
   * @param {string} repoFullName - The full name of the repository (owner/repo)
   * @param {string} webhookUrl - The URL to send webhook events to
   * @param {string} secret - The webhook secret for signature verification
   * @param {Array} events - Array of event types to subscribe to
   * @returns {Promise<Object>} - Webhook data
   */
  async createWebhook(accessToken, repoFullName, webhookUrl, secret, events) {
    try {
      const url = buildGitHubApiUrl(`repos/${repoFullName}/hooks`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "web",
          active: true,
          events,
          config: {
            url: webhookUrl,
            content_type: "json",
            secret,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${errorData.message}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error creating webhook for ${repoFullName}:`, error);
      throw error;
    }
  }

  /**
   * Delete a webhook from a repository
   * @param {string} accessToken - The GitHub OAuth access token
   * @param {string} repoFullName - The full name of the repository (owner/repo)
   * @param {string} webhookId - The ID of the webhook to delete
   * @returns {Promise<boolean>} - True if webhook was deleted, false otherwise
   */
  async deleteWebhook(accessToken, repoFullName, webhookId) {
    try {
      const url = buildGitHubApiUrl(`repos/${repoFullName}/hooks/${webhookId}`);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });

      return response.status === 204;
    } catch (error) {
      console.error(
        `Error deleting webhook ${webhookId} from ${repoFullName}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Sync a repository's branches and commits in our database
   * @param {string} repositoryId - The repository ID in our database
   * @returns {Promise<Object>} - The updated repository with branches
   */
  async syncRepository(repositoryId) {
    try {
      // Get repository with GitHub account
      const repository = await prisma.repository.findUnique({
        where: { id: repositoryId },
        include: {
          githubAccount: true,
          branches: true,
        },
      });

      if (!repository) {
        throw new Error("Repository not found");
      }

      // Check if token is valid
      const isTokenValid = await this.isTokenValid(
        repository.githubAccount.accessToken
      );
      if (!isTokenValid) {
        // Try to refresh token
        const refreshed = await this.refreshToken(repository.githubAccount.id);
        if (!refreshed) {
          throw new Error("Invalid GitHub token and unable to refresh");
        }

        // Get updated GitHub account with new token
        const updatedAccount = await prisma.githubAccount.findUnique({
          where: { id: repository.githubAccount.id },
        });

        repository.githubAccount = updatedAccount;
      }

      // Fetch branches from GitHub
      const branchesData = await this.fetchBranches(
        repository.githubAccount.accessToken,
        repository.fullName
      );

      // Process each branch
      for (const branchData of branchesData) {
        // Fetch latest commit
        const commitData = await this.fetchLatestCommit(
          repository.githubAccount.accessToken,
          repository.fullName,
          branchData.name
        );

        // Find existing branch
        const existingBranch = repository.branches.find(
          (b) => b.name === branchData.name
        );

        if (existingBranch) {
          // Update existing branch
          await prisma.branch.update({
            where: { id: existingBranch.id },
            data: {
              lastCommitSha: commitData?.sha || existingBranch.lastCommitSha,
              lastCommitMsg:
                commitData?.commit?.message || existingBranch.lastCommitMsg,
              lastCommitDate: commitData?.commit?.author?.date
                ? new Date(commitData.commit.author.date)
                : existingBranch.lastCommitDate,
              updatedAt: new Date(),
            },
          });
        } else {
          // Create new branch
          await prisma.branch.create({
            data: {
              repositoryId: repository.id,
              name: branchData.name,
              lastCommitSha: commitData?.sha || null,
              lastCommitMsg: commitData?.commit?.message || null,
              lastCommitDate: commitData?.commit?.author?.date
                ? new Date(commitData.commit.author.date)
                : null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }
      }

      // Update repository last synced time
      const updatedRepository = await prisma.repository.update({
        where: { id: repositoryId },
        data: {
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        },
        include: { branches: true },
      });

      return updatedRepository;
    } catch (error) {
      console.error(`Error syncing repository ${repositoryId}:`, error);
      throw error;
    }
  }
}

const githubService = new GitHubService();
export default githubService;

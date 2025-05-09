// src/config/github.js

// GitHub OAuth scopes needed for repository access and webhook management
export const GITHUB_OAUTH_SCOPES = [
  "repo", // Full control of private repositories
  "read:user", // Read user profile data
  "user:email", // Access user email addresses
];

// GitHub webhook events to subscribe to
export const GITHUB_WEBHOOK_EVENTS = [
  "push", // Any Git push to a repository
  "pull_request", // Pull request opened, closed, reopened, etc.
];

// Constants for webhook URL configuration
export const WEBHOOK_CONFIG = {
  // The URL where GitHub will send webhook events
  // This should be publicly accessible
  url: `${process.env.NEXT_PUBLIC_APP_URL}/api/github/webhook/receive`,

  // The content type for webhook payloads
  contentType: "json",
};

// Maximum number of repositories to fetch per page
export const REPOS_PER_PAGE = 100;

// Maximum number of branches to fetch per repository
export const BRANCHES_PER_REPO = 100;

// Function to build GitHub API URLs
export const buildGitHubApiUrl = (endpoint, params = {}) => {
  const url = new URL(`https://api.github.com/${endpoint}`);

  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
};

// GitHub API rate limit information
export const RATE_LIMITS = {
  // Core API rate limit for authenticated requests
  // 5,000 requests per hour per authenticated user
  CORE: 5000,

  // Search API rate limit
  // 30 requests per minute per authenticated user
  SEARCH: 30,

  // GraphQL API rate limit
  // 5,000 points per hour per authenticated user
  GRAPHQL: 5000,
};

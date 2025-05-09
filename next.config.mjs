/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    UTILITY_GEMINI_API_KEY: process.env.UTILITY_GEMINI_API_KEY,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;

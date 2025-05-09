// src/component/Navigation/navigation.data.js
import {
  BiHomeAlt,
  BiBookReader,
  BiCog,
  BiGitBranch,
  BiHelpCircle,
  BiPalette,
  BiBot,
  BiCodeAlt,
  BiText,
  BiCategoryAlt,
  BiShieldAlt,
} from "react-icons/bi";
import { FiCodepen } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { SiPrisma } from "react-icons/si";
import { FaFileCode } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { TbComponents } from "react-icons/tb";

const unauthenticatedNavItems = [
  { name: "Home", path: "/", icon: BiHomeAlt },
  { name: "Help", path: "/help", icon: BiHelpCircle },
  { name: "Sign Up", path: "/sign-up", icon: BiCodeAlt },
];

// Restructure authenticated nav items with categories
const authenticatedNavItems = [
  { name: "Home", path: "/", icon: BiHomeAlt },
  {
    name: "GitHub",
    path: "/github",
    icon: BiGitBranch,
  },
  {
    name: "Code Tools",
    icon: BiCodeAlt,
    isCategory: true,
    items: [
      {
        name: "Filter Code",
        path: "/component-extractor",
        icon: FiFilter,
      },
      {
        name: "Styled Extractor",
        path: "/styled-extractor",
        icon: TbComponents,
      },
      {
        name: "Style Stripper", // Add this new item
        path: "/style-stripper",
        icon: FiCodepen, // Reusing an existing icon
      },
      {
        name: "Remove Comments",
        path: "/remove-code-comments",
        icon: FiCodepen,
      },
      {
        name: "Prisma Fusion",
        path: "/prisma-schema-fusion",
        icon: SiPrisma,
      },
      {
        name: "Theme Preview",
        path: "/theme-preview",
        icon: BiPalette,
      },
    ],
  },
  {
    name: "Text Tools",
    icon: BiText,
    isCategory: true,
    items: [
      {
        name: "Reader",
        path: "/screen-reader",
        icon: BiBookReader,
      },
      {
        name: "Diff Viewer",
        path: "/text-diff-viewer",
        icon: BiGitCompare,
      },
      {
        name: "Parse Question",
        path: "/parse-question",
        icon: FaFileCode,
      },
    ],
  },
  {
    name: "AI",
    icon: BiCategoryAlt,
    isCategory: true,
    items: [
      {
        name: "AI Chat",
        path: "/chat",
        icon: BiBot,
      },
    ],
  },
  {
    name: "Admin",
    icon: BiShieldAlt,
    isCategory: true,
    items: [
      {
        name: "Webhooks",
        path: "/admin/webhooks",
        icon: BiBot,
      },
    ],
  },
  { name: "Settings", path: "/settings", icon: BiCog },
];

export { unauthenticatedNavItems, authenticatedNavItems };

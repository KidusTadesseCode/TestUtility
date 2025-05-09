// src/component/Navigation/navigation.style.js
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ $isCollapsed }) => ($isCollapsed ? "70px" : "240px")};
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.elevation.medium};
  transition: ${({ theme }) => theme.motion.smooth};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  /* Mobile styles - full width on small screens */
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    bottom: auto;
    flex-direction: row;
    align-items: center;
  }
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme, $isCollapsed }) =>
    $isCollapsed
      ? theme.spacing(2)
      : `${theme.spacing(2)} ${theme.spacing(3)}`};

  /* Mobile styles */
  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? "center" : "flex-start"};
  padding: ${({ theme, $isCollapsed }) =>
    $isCollapsed
      ? theme.spacing(1)
      : `${theme.spacing(1)} ${theme.spacing(2)}`};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const LogoText = styled.h1`
  font-family: ${({ theme }) => theme.typography.font.heading};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  white-space: nowrap;
`;

const LogoAccent = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    opacity: 0.9;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${({ theme }) => theme.spacing(1)};
  overflow-y: auto;
  padding-right: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(2)};

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary}40;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};

  /* Center icon when collapsed */
  ${({ $isCollapsed }) =>
    $isCollapsed &&
    `
    display: flex;
    justify-content: center;
  `}
`;

const NavLinkStyled = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  padding: ${({ theme, $isCollapsed }) =>
    $isCollapsed
      ? theme.spacing(1.5)
      : `${theme.spacing(1.5)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.motion.quick};
  cursor: pointer;
  white-space: nowrap;
  width: 100%;
  justify-content: ${({ $isCollapsed }) =>
    $isCollapsed ? "center" : "flex-start"};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  ${({ $isCollapsed }) =>
    $isCollapsed
      ? `
      top: 50%;
      left: 0;
      width: 3px;
      height: 20px;
      transform: translateY(-50%);
    `
      : `
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 3px;
    `}
  border-radius: ${({ theme }) => theme.radii.pill};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  margin-top: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  @media (min-width: 769px) {
    display: ${({ $isCollapsed }) => ($isCollapsed ? "flex" : "none")};
    margin: ${({ theme }) => theme.spacing(2)} auto;
  }

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.elevation.high};
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.secondary}20`};
`;

const MobileMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const MobileNavLinkStyled = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.secondary};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: ${({ theme }) => theme.motion.quick};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1000;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  box-shadow: ${({ theme }) => theme.elevation.low};
`;

const SignInContainer = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const SignInButtonStyled = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverted};
  font-family: ${({ theme }) => theme.typography.font.body};
  font-size: 0.9rem;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(1.5)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.motion.quick};
  width: 100%;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const UserMenuContainer = styled.div`
  position: relative;
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.radii.pill};
  transition: ${({ theme }) => theme.motion.quick};
  width: 100%;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.surfaceHover}80`};
  }
`;

const UserMenuDropdown = styled(motion.div)`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.high};
  min-width: 220px;
  z-index: 1010;
  overflow: hidden;
`;

const UserMenuHeader = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const UserName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  font-size: 0.95rem;
`;

const UserEmail = styled.span`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 0.8rem;
`;

const UserMenuDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => `${theme.colors.secondary}20`};
  margin: 0;
`;

const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(3)}`};
  text-decoration: none;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:last-child {
    color: ${({ theme }) => theme.colors.error};

    &:hover {
      background-color: ${({ theme }) => `${theme.colors.error}15`};
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

const NavItemWithDropdown = styled(NavItem)`
  position: relative;
`;

const NavDropdownTrigger = styled(NavLinkStyled)`
  cursor: pointer;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  z-index: 1010;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.elevation.high};
  min-width: 220px;
  overflow: hidden;

  ${({ $isCollapsed }) =>
    $isCollapsed
      ? `
      left: 100%;
      top: 0;
      margin-left: 5px;
    `
      : `
      top: 100%;
      left: 0;
      margin-top: 5px;
    `}
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text.secondary};
  padding: ${({ theme }) => `${theme.spacing(2.5)} ${theme.spacing(3)}`};
  text-decoration: none;
  transition: ${({ theme }) => theme.motion.quick};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Mobile dropdown styles
const MobileNavCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const MobileCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
  cursor: pointer;
`;

const MobileCategoryItems = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
`;

// Main content wrapper to make space for the side navigation
const ContentWrapper = styled.div`
  margin-left: ${({ $isCollapsed }) => ($isCollapsed ? "70px" : "240px")};
  transition: ${({ theme }) => theme.motion.smooth};
  width: calc(
    100% - ${({ $isCollapsed }) => ($isCollapsed ? "70px" : "240px")}
  );
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 60px;
    width: 100%;
  }
`;

export {
  NavContainer,
  NavContent,
  LogoContainer,
  LogoText,
  LogoAccent,
  LogoLink,
  DesktopMenu,
  NavItem,
  NavLinkStyled,
  ActiveIndicator,
  MobileMenuButton,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuItems,
  MobileNavLinkStyled,
  Overlay,
  UserAvatar,
  SignInContainer,
  SignInButtonStyled,
  UserMenuContainer,
  UserMenuButton,
  UserMenuDropdown,
  UserMenuHeader,
  UserMenuDivider,
  UserMenuItem,
  UserInfo,
  UserName,
  UserEmail,
  NavItemWithDropdown,
  NavDropdownTrigger,
  DropdownMenu,
  DropdownItem,
  MobileNavCategory,
  MobileCategoryHeader,
  MobileCategoryItems,
  ContentWrapper,
};

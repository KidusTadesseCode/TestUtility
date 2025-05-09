// src/component/Navigation/Navigation.js
"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMenu, BiX, BiLogIn, BiLogOut, BiChevronDown } from "react-icons/bi";
import {
  NavContainer,
  NavContent,
  LogoContainer,
  DesktopMenu,
  NavItem,
  NavItemWithDropdown,
  NavDropdownTrigger,
  ActiveIndicator,
  MobileMenuButton,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuItems,
  MobileNavLinkStyled,
  MobileNavCategory,
  MobileCategoryHeader,
  MobileCategoryItems,
  DropdownMenu,
  DropdownItem,
  Overlay,
} from "./navigation.style";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  authenticatedNavItems,
  unauthenticatedNavItems,
} from "@/data/navigation.data";
import NavLink from "./NavLink";
import Logo from "./Logo";
import AuthControl from "./AuthControl";
import MobileNavLink from "./MobileNavLink";

// Navigation Bar Component
function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded) return;
    setNavItems(isSignedIn ? authenticatedNavItems : unauthenticatedNavItems);
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMobileCategory = (name) => {
    setMobileCategoryOpen(mobileCategoryOpen === name ? null : name);
  };

  // Hover handlers for collapsed navigation
  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <NavContainer
      $scrolled={scrolled}
      $isCollapsed={isCollapsed}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavContent $isCollapsed={isCollapsed}>
        <LogoContainer $isCollapsed={isCollapsed}>
          <Logo isCollapsed={isCollapsed} />
        </LogoContainer>

        <DesktopMenu $isCollapsed={isCollapsed}>
          {navItems &&
            navItems.map((item) => {
              // For regular menu items
              if (!item.isCategory) {
                return (
                  <NavItem key={item.path} $isCollapsed={isCollapsed}>
                    <NavLink href={item.path} isCollapsed={isCollapsed}>
                      {item.icon && <item.icon size={20} />}
                      {!isCollapsed && <span>{item.name}</span>}
                    </NavLink>
                    {pathname === item.path && (
                      <ActiveIndicator
                        layoutId="activeIndicator"
                        $isCollapsed={isCollapsed}
                      />
                    )}
                  </NavItem>
                );
              }

              // For category dropdown
              return (
                <NavItemWithDropdown
                  key={item.name}
                  className="nav-dropdown"
                  $isCollapsed={isCollapsed}
                >
                  <NavDropdownTrigger
                    onClick={() => toggleDropdown(item.name)}
                    $active={openDropdown === item.name}
                    $isCollapsed={isCollapsed}
                  >
                    {item.icon && <item.icon size={20} />}
                    {!isCollapsed && (
                      <>
                        <span>{item.name}</span>
                        <BiChevronDown
                          size={16}
                          style={{
                            transform:
                              openDropdown === item.name
                                ? "rotate(180deg)"
                                : "rotate(0)",
                            transition: "transform 0.3s ease",
                            marginLeft: "4px",
                          }}
                        />
                      </>
                    )}
                  </NavDropdownTrigger>

                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <DropdownMenu
                        initial={{
                          opacity: 0,
                          y: -10,
                          x: isCollapsed ? 60 : 0,
                        }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -10, x: isCollapsed ? 60 : 0 }}
                        transition={{ duration: 0.2 }}
                        $isCollapsed={isCollapsed}
                      >
                        {item.items.map((subItem) => (
                          <DropdownItem
                            key={subItem.path}
                            href={subItem.path}
                            $active={pathname === subItem.path}
                            onClick={() => setOpenDropdown(null)}
                          >
                            {subItem.icon && <subItem.icon size={20} />}
                            {subItem.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </NavItemWithDropdown>
              );
            })}
        </DesktopMenu>

        {!isCollapsed && (
          <div className="nav-auth-container">
            <AuthControl isSignedIn={isSignedIn} />
          </div>
        )}

        <MobileMenuButton
          onClick={() => setMobileMenuOpen(true)}
          $isCollapsed={isCollapsed}
        >
          <BiMenu size={24} />
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <MobileMenu
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <MobileMenuHeader>
                <Logo />
                <MobileMenuButton onClick={() => setMobileMenuOpen(false)}>
                  <BiX size={24} />
                </MobileMenuButton>
              </MobileMenuHeader>

              <MobileMenuItems>
                {navItems &&
                  navItems.map((item) => {
                    // Regular menu item
                    if (!item.isCategory) {
                      return (
                        <MobileNavLink
                          key={item.path || item.name}
                          href={item.path}
                        >
                          {item.icon && <item.icon size={20} />}
                          {item.name}
                        </MobileNavLink>
                      );
                    }

                    // Category with subitems
                    return (
                      <MobileNavCategory key={item.name}>
                        <MobileCategoryHeader
                          onClick={() => toggleMobileCategory(item.name)}
                        >
                          {item.icon && <item.icon size={20} />}
                          {item.name}
                          <BiChevronDown
                            size={18}
                            style={{
                              transform:
                                mobileCategoryOpen === item.name
                                  ? "rotate(180deg)"
                                  : "rotate(0)",
                              transition: "transform 0.3s ease",
                            }}
                          />
                        </MobileCategoryHeader>

                        <AnimatePresence>
                          {mobileCategoryOpen === item.name && (
                            <MobileCategoryItems
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {item.items.map((subItem) => (
                                <MobileNavLink
                                  key={subItem.path}
                                  href={subItem.path}
                                >
                                  {subItem.icon && <subItem.icon size={20} />}
                                  {subItem.name}
                                </MobileNavLink>
                              ))}
                            </MobileCategoryItems>
                          )}
                        </AnimatePresence>
                      </MobileNavCategory>
                    );
                  })}

                {!isSignedIn ? (
                  <SignInButton mode="modal">
                    <MobileNavLinkStyled as="button">
                      <BiLogIn size={20} />
                      Sign In
                    </MobileNavLinkStyled>
                  </SignInButton>
                ) : (
                  <Link href="/sign-out" passHref>
                    <MobileNavLinkStyled>
                      <BiLogOut size={20} />
                      Sign Out
                    </MobileNavLinkStyled>
                  </Link>
                )}
              </MobileMenuItems>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </NavContainer>
  );
}

export default Navigation;

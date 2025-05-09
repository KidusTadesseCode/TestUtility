// src/component/Navigation/Navigation.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { BiUser, BiLogOut, BiChevronDown } from "react-icons/bi";
import {
  UserAvatar,
  UserMenuContainer,
  UserMenuButton,
  UserMenuDropdown,
  UserMenuHeader,
  UserMenuDivider,
  UserMenuItem,
  UserInfo,
  UserName,
  UserEmail,
} from "./navigation.style";
import { useUser } from "@clerk/nextjs";

// User menu component that includes sign-out functionality
function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const initials = user?.firstName
    ? `${user.firstName.charAt(0)}${
        user.lastName ? user.lastName.charAt(0) : ""
      }`
    : user?.emailAddresses?.[0]?.emailAddress?.charAt(0).toUpperCase() || "U";

  return (
    <UserMenuContainer ref={menuRef}>
      <UserMenuButton onClick={() => setIsOpen(!isOpen)}>
        <UserAvatar>{initials}</UserAvatar>
        <BiChevronDown size={16} />
      </UserMenuButton>

      <AnimatePresence>
        {isOpen && (
          <UserMenuDropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <UserMenuHeader>
              <UserInfo>
                <UserName>{user?.fullName || "User"}</UserName>
                <UserEmail>
                  {user?.emailAddresses?.[0]?.emailAddress || ""}
                </UserEmail>
              </UserInfo>
            </UserMenuHeader>

            <UserMenuDivider />

            <UserMenuItem
              href="/settings"
              passHref
              onClick={() => setIsOpen(false)}
            >
              <BiUser size={18} />
              My Account
            </UserMenuItem>

            <UserMenuItem
              href="/sign-out"
              passHref
              onClick={() => setIsOpen(false)}
            >
              <BiLogOut size={18} />
              Sign Out
            </UserMenuItem>
          </UserMenuDropdown>
        )}
      </AnimatePresence>
    </UserMenuContainer>
  );
}

export default UserMenu;

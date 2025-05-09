// src/component/Navigation/NavLink.js
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkStyled } from "./navigation.style";

const NavLink = ({ href, children, isCollapsed, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <NavLinkStyled $active={isActive} $isCollapsed={isCollapsed} {...props}>
        {children}
      </NavLinkStyled>
    </Link>
  );
};

export default NavLink;

// src/component/Navigation/MobileNavLink.js
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MobileNavLinkStyled } from "./navigation.style";
const MobileNavLink = ({ href, children, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref legacyBehavior>
      <MobileNavLinkStyled $active={isActive} {...props}>
        {children}
      </MobileNavLinkStyled>
    </Link>
  );
};
export default MobileNavLink;

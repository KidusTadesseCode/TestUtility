import styled from "styled-components";
import { Link } from "react-router-dom";

// background-color: ${({ open, navbackgroundcolor }) => open ? navbackgroundcolor : "none"};
// background-color: ${({ open }) => (open ? "white" : "none")};

const seconds = ".5s";
export const Nav = styled.nav`
  box-sizing: border-box;
  position: fixed;
  display: ${({ displaynavigation }) =>
    displaynavigation === "true" ? "flex" : "none"};
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0rem 1rem 1rem;
  width: ${({ open }) => (open ? "100%" : "50%")};
  transition: width ${seconds}, background-color ${seconds}, opacity ${seconds};
  background: ${({ open, navbackgroundcolor }) =>
    open ? navbackgroundcolor : "none"};
  z-index: 1000;
`;

export const NavContent = styled.div`
  transition: opacity ${seconds};
  opacity: ${({ open }) => (open ? "1" : "0")};
  padding-right: ${({ open }) => (open ? "1rem" : "0")};
`;

export const Logo = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #fff;
`;

export const Links = styled.div`
  display: flex;
`;

export const NavLink = styled(Link)`
  /* color: black; */
  color: ${({ navtextcolor }) => (navtextcolor ? navtextcolor : "black")};
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  text-decoration: none;
  margin-right: 20px;
  opacity: 1;
  &:hover {
    opacity: 0.9;
  }
`;

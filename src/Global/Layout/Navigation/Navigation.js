import React, { useEffect, useState } from "react";
import { Nav, NavLink, Links, NavContent } from "./Navigation_style";
import Hamburger from "./HamburgerIcon";
import NavigationHandler from "./libs/NavigationHandler";
import NavigationValidation from "./libs/Validation/NavigationValidation";
import { useLocation } from "react-router-dom";
import { sortIncrements } from "./libs/sortLibs/sort";
// import { l } from "@zufan_devops/console";
function Navigation({ routes }) {
  const subpath = useLocation()["pathname"];
  const [displayNavigation, setDisplayNavigation] = useState("true");
  const handleNav = new NavigationHandler(window.scrollY, subpath);
  const [colipaseNav, setColipaseNav] = useState(false);
  const [NavigationItems, setNavigationItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(!true);
  const [hamburgerLineColor_Open, setHamburgerLineColor_Open] = useState(
    handleNav.styled("hamburgerLineColor_Open")
  );
  const [hamburgerLineColor_Close, setHamburgerLineColor_Close] = useState(
    handleNav.styled("hamburgerLineColor_Close")
  );
  const [navBackgroundColor, setNavBackgroundColor] = useState(
    handleNav.styled("navBackgroundColor")
  );
  const [navTextColor, setNavTextColor] = useState(
    handleNav.styled("setNavTextColor")
  );

  useEffect(() => {
    const validation = NavigationValidation(routes);
    if (validation instanceof Error) {
      console.log(validation);
      return validation;
    }
    const currentRoute = routes.filter((route) => {
      if (route["navigation"]) return route;
    });
    setNavigationItems(sortIncrements(currentRoute));

    if (subpath === "" || !subpath) return;

    const currentRoutes = routes
      .filter((route) => {
        if (route["path"].toLowerCase() === subpath.toLowerCase()) return route;
      })
      .pop();

    if (currentRoutes["navigation"] === false)
      return setDisplayNavigation("false");
    setDisplayNavigation("true");
    const currentColipaseNav = routes.filter((v) => {
      if (v.path.toLowerCase() === subpath.toLowerCase())
        return v.path.toLowerCase();
    })[0];

    if (currentColipaseNav["colipaseNav"] === false)
      return setColipaseNav(true);

    const handleScroll = () => {
      const handleNav = new NavigationHandler(window.scrollY, subpath);
      setHamburgerLineColor_Open(handleNav.styled("hamburgerLineColor_Open"));
      setHamburgerLineColor_Close(handleNav.styled("hamburgerLineColor_Close"));
      setNavBackgroundColor(handleNav.styled("navBackgroundColor"));
      setNavTextColor(handleNav.styled("setNavTextColor"));
      setMenuOpen(handleNav.styled("setMenuOpen"));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [subpath]);

  const toggleMenu = () => {
    if (colipaseNav) return;
    setMenuOpen(!menuOpen);
  };

  if (!Array.isArray(routes)) return;
  if (routes.length <= 0) return;
  return (
    <Nav
      open={menuOpen}
      navbackgroundcolor={navBackgroundColor}
      displaynavigation={displayNavigation}
    >
      <Hamburger
        linecolor={
          menuOpen ? hamburgerLineColor_Open : hamburgerLineColor_Close
        }
        onClick={toggleMenu}
        width={50}
        height={4}
        thickness={5}
      />
      <NavContent open={menuOpen}>
        <Links>
          {NavigationItems &&
            NavigationItems.map((route) => {
              return (
                <NavLink
                  key={route.id}
                  to={route["path"]}
                  navtextcolor={navTextColor}
                >
                  {route["navigationName"]}
                </NavLink>
              );
            })}
        </Links>
      </NavContent>
    </Nav>
  );
}

export default Navigation;

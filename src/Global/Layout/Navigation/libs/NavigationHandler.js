// import { l } from "@zufan_devops/console";

const bkColors = [
  "linear-gradient(135deg, #ff7eb3, #ff758c)",
  "linear-gradient(135deg, #2575fc, #6a11cb)",
  "linear-gradient(135deg, #89f7fe, #66a6ff)",
  "linear-gradient(135deg, #fddb92, #d1fdff)",
  "linear-gradient(90deg, #d1fdff, #fddb92)",
];

const hamburgerIconColors = [
  "#ff789a",
  "#4174dc",
  "#77d7ff",
  "#f2e8c4",
  "#eaeed7",
];

// const linkColor = ["#ffffff"];
// const linkHoverEffect = [
//   "linear-gradient(90deg, #ff758c, #ff7eb3)",
//   "linear-gradient(90deg, #6a11cb, #2575fc)",
//   "linear-gradient(90deg, #66a6ff, #89f7fe)",
//   "linear-gradient(90deg, #d1fdff, #fddb92)",
//   "#66a6ff",
// ];

// hamburgerLineColor_Open: hamburgerIconColor,
// hamburgerLineColor_Close: hamburgerLineColor_Close
// navBackgroundColor: navBackgroundColor
// navTextColor: setNavTextColor

const navCases = {
  hamburgerLineColor_Open: (isScrollPositionBottom, isOnLandingPage) => {
    return hamburgerIconColors[4];
  },
  hamburgerLineColor_Close: () => {
    return hamburgerIconColors[2];
  },
  navBackgroundColor: (isScrollPositionBottom, isOnLandingPage) => {
    return bkColors[1];
  },
  setNavTextColor: (isScrollPositionBottom, isOnLandingPage) => {
    return hamburgerIconColors[4];
  },
  setMenuOpen: (isScrollPositionBottom, isOnLandingPage) => {
    if (isScrollPositionBottom) return false;
    else return true;
  },
};

export default class NavigationHandler {
  constructor(ScrollPosition, subpath) {
    this.ScrollPosition = ScrollPosition;
    this.subpath = subpath;
  }
  styled(statename) {
    try {
      const isScrollPositionBottom = this.ScrollPosition > 80;
      const isOnLandingPage = this.subpath === "/";
      if (!Object.keys(navCases).includes(statename))
        throw new Error(
          "Property does not exist. Please check your spelling. Available properties: " +
            Object.keys(navCases)
        );
      return navCases[statename](isScrollPositionBottom, isOnLandingPage);
    } catch (error) {
      throw error;
    }
  }
}

// const colors = {
//   light: bkColors[1],
//   dark: bkColors[0],
// };
// const navCases_backup = {
//   hamburgerLineColor_Open: (isScrollPositionBottom, isOnLandingPage) => {
//     if (isScrollPositionBottom && isOnLandingPage) {
//       return colors.light;
//     } else if (!isScrollPositionBottom && isOnLandingPage) {
//       return colors.dark;
//     } else {
//       return colors.light;
//     }
//   },
//   hamburgerLineColor_Close: () => colors.dark,

//   navBackgroundColor: (isScrollPositionBottom, isOnLandingPage) => {
//     if (isScrollPositionBottom && isOnLandingPage) {
//       return colors.dark;
//     } else if (!isScrollPositionBottom && isOnLandingPage) {
//       return colors.light;
//     } else {
//       return colors.dark;
//     }
//   },
//   setNavTextColor: (isScrollPositionBottom, isOnLandingPage) => {
//     if (isScrollPositionBottom && isOnLandingPage) {
//       return colors.light;
//     } else if (!isScrollPositionBottom && isOnLandingPage) {
//       return colors.dark;
//     } else {
//       return colors.light;
//     }
//   },
//   setMenuOpen: (isScrollPositionBottom, isOnLandingPage) => {
//     if (isScrollPositionBottom) return false;
//     else return true;
//   },
// };

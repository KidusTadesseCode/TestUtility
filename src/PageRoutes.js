import Home from "./component/Home/Home";
import ScreenReader from "./component/ScreenReader/ScreenReader";
import Test from "./component/Test/Test";
import RemoveCodeComments from "./component/RemoveCodeComments/RemoveCodeComments";
import Word from "./component/Word/Word";
import WordCount from "./component/WordCount/WordCount";
import ParseQuestion from "./component/ParseQuestion/ParseQuestion";
// *****  Documention  *****
// private 1=private 0=public -1=private public
// navigation: true= navigationName will displayed in the navigation bar and false= will not
// footer true= navigationName will displayed in the footer and false= will not
// errorComponent true= will only be used if there is error. It for error only be for an error Component
// colipaseNav
/* Not Implemented yet */
// displayRoutesOnThisPage = if true it will display the navigation on that page or  else if false , it will not display the navigation on that page

// const PageRoutes = [
//   {
//     id: "Home",
//     navigationName: "Home",
//     element: <Home />,
//     children: [
//       {
//         id: "test",
//         navigationName: "Sub Home",
//         element: <Test />,
//         path: "test",
//         order: 1,
//         private: -1,
//         navigation: true,
//         footer: false,
//         errorComponent: false,
//         displayRoutesOnThisPage: true,
//         colipaseNav: true,
//       },
//     ],
//     path: "/Home",
//     order: 1,
//     private: -1,
//     navigation: true,
//     footer: false,
//     errorComponent: false,
//     displayRoutesOnThisPage: true,
//     colipaseNav: true,
//   },
// ];

const PageRoutes = [
  {
    id: "Home",
    navigationName: "Home",
    element: <Home />,
    path: "/",
    order: 1,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "ScreenReader",
    navigationName: "Screen Reader",
    element: <ScreenReader />,
    path: "/ScreenReader",
    order: 2,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "Format",
    navigationName: "Code Comments",
    element: <RemoveCodeComments />,
    path: "/removeCodeComments",
    order: 3,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "word",
    navigationName: "Word",
    element: <Word />,
    path: "/Word",
    order: 4,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "wordCount",
    navigationName: "Word Count",
    element: <WordCount />,
    path: "/WordCount",
    order: 5,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "ParseQuestion",
    navigationName: "Parse Question",
    element: <ParseQuestion />,
    path: "/ParseQuestion",
    order: 6,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
  {
    id: "Test",
    navigationName: "Test",
    element: <Test />,
    path: "/Test",
    order: 5000,
    private: -1,
    navigation: true,
    footer: false,
    errorComponent: false,
    displayRoutesOnThisPage: true,
    colipaseNav: true,
  },
];

export default PageRoutes;

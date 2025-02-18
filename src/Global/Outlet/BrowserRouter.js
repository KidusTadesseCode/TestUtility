import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
//
import { createHashRouter } from "react-router-dom";
// import routes from "./routes";
import PageRoutes from "../../PageRoutes";

// import { l } from "@zufan_devops/console";

// const BrowserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: PageRoutes.map((route) => ({
//       path: route.path,
//       element: route.element,
//     })),
//   },
// ]);
// export default BrowserRouter;

function BrowserRouter(routeList) {
  const routes = routeList.map((route) => ({
    path: route["path"],
    element: route["element"],
    children: route["children"] && route["children"],
  }));

  // l(routes);
  const created_Browser_Route = createHashRouter([
    {
      path: "/",
      element: <Layout PageRoutes={routeList} />,
      children: routes,
    },
  ]);
  return created_Browser_Route;
}

export default BrowserRouter;

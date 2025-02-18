import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
// import { l } from "@zufan_devops/console";
function BrowserRouter(routeList) {
  const routes = routeList.map((route) => ({
    path: route["path"],
    element: route["element"],
    children: route["children"] && route["children"],
  }));

  // l(routes);
  const created_Browser_Route = createBrowserRouter([
    {
      path: "/",
      element: <Layout PageRoutes={routeList} />,
      children: routes,
    },
  ]);
  return created_Browser_Route;
}

export default BrowserRouter;

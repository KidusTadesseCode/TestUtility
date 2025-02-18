import { RouterProvider } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import BrowserRouter from "./Global/Outlet/BrowserRouter";

export default function App() {
  return <RouterProvider router={BrowserRouter(PageRoutes)} />;
}

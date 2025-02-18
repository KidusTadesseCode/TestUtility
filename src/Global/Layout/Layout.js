import React from "react";
import {
  LayoutContainer,
  // NavigationWrapper,
  OutletRapper,
} from "./Layout_style";
import { Outlet } from "react-router-dom";
// import { useLocation } from "react-router-dom";
//
import Footer from "./Footer/Footer";
import Navigation from "./Navigation/Navigation";

function Layout({ PageRoutes }) {
  // const [addPadding, setAddPadding] = useState(false);
  // const path = useLocation()["pathname"];
  // useEffect(() => {
  //   setAddPadding(path !== "/");
  // }, [path]);
  return (
    <LayoutContainer className="LayoutContainer">
      {/* <NavigationWrapper addpadding={addPadding.toString()}> */}
      <Navigation routes={PageRoutes} />
      {/* </NavigationWrapper> */}
      <OutletRapper className="OutletRapper">
        <Outlet />
      </OutletRapper>
      {/* <Outlet /> */}
      <Footer />
    </LayoutContainer>
  );
}
export default Layout;

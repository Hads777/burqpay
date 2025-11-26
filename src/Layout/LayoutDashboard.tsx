import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DasbhboardHeader from "../components/DashboardHeader/Header";
import DasbhboardSideBar from "../components/DashboardSideBar/DashboardSideBar";
import { RootState } from "../redux/rootReducer";
import { themeStyle } from "../components/Config/Theme";
import DashboardInfoSubHeader from "../components/DashboardHeader/DashboardSubheader";
import { filterUtils } from "../utils/const.utils";
import { useLocation } from "react-router-dom";
const LayoutDashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  console.log(location, "location");
  const themeBuilder = useSelector((state: RootState) => state.block.theme);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(filterUtils, "layout");
  return (
    <>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <div
        className={`bp-layout flex ${isMobile ? "sidebar-mobile" : "side-bar"}`}
      >
        <div
          className={`bp-sidebar-wrapper flex ${isMobile ? "" : "colOne"}`}
          style={{
            backgroundColor:
              themeStyle?.dashboardSibeBarFlow.flowDashboardSideBarBg,
          }}
        >
          <DasbhboardSideBar />
        </div>
        <div className={`bp-main flex ${isMobile ? "" : "colTwo"}`}>
          <DasbhboardHeader />
          {location.pathname != "/profile" &&
            location.pathname != "/Dashboard/ProfileSetting" && (
              <DashboardInfoSubHeader />
            )}
          <div
            className="p-3"
            style={
              location.pathname === "/profile" ||
              location.pathname === "/Dashboard/ProfileSetting"
                ? {
                    backgroundColor: themeBuilder?.appBackgroundColor,
                    height: "94vh",
                  }
                : {
                    backgroundColor: themeBuilder?.appBackgroundColor,
                  }
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default LayoutDashboard;

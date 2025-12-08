import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import OnboardingHeader from "../components/DashboardHeader/OnboardingHeader";
import { RootState } from "../redux/rootReducer";
import { themeStyle } from "../components/Config/Theme";
import OnboardingSidebar from "../components/DashboardSideBar/OnboardingSidebar";

const LayoutOnboarding = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const themeBuilder = useSelector((state: RootState) => state.block.theme);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          <OnboardingSidebar />
        </div>
        <div className={`bp-main flex ${isMobile ? "" : "colTwo"}`}>
          <OnboardingHeader />
          <div
            className="p-3"
            style={{
              backgroundColor: themeBuilder?.appBackgroundColor,
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};
export default LayoutOnboarding;

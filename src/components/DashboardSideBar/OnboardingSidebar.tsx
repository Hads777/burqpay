import React from "react";
import { Sidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { authSlice } from "../../redux/apis/apisSlice";
import { themeStyle } from "../Config/Theme";
import {
  UserOutlined,
  FileTextOutlined,
  CheckSquareOutlined,
  UploadOutlined,
  BankOutlined,
  LockOutlined,
  FlagOutlined,
} from "@ant-design/icons";

interface OnboardingStep {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const OnboardingSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const toggled = useSelector((state: RootState) => state.block.toggled);

  const onboardingSteps: OnboardingStep[] = [
    {
      label: "Personal Information",
      path: "/Onboarding/PersonalInformation",
      icon: <UserOutlined />,
    },
    {
      label: "Terms & Conditions",
      path: "/Onboarding/TermsConditions",
      icon: <FileTextOutlined />,
    },
    {
      label: "Verification",
      path: "/Onboarding/Verification",
      icon: <CheckSquareOutlined />,
    },
    {
      label: "Upload Document",
      path: "/Onboarding/UploadDocument",
      icon: <UploadOutlined />,
    },
    {
      label: "Bank Info",
      path: "/Onboarding/BankInfo",
      icon: <BankOutlined />,
    },
    {
      label: "Set Password",
      path: "/Onboarding/SetPassword",
      icon: <LockOutlined />,
    },
    {
      label: "Finish",
      path: "/Onboarding/Finish",
      icon: <FlagOutlined />,
    },
  ];

  const getActiveStepIndex = (): number => {
    const index = onboardingSteps.findIndex((step) =>
      pathname.includes(step.path.split("/")[2])
    );
    return index >= 0 ? index : 0;
  };

  const activeStepIndex = getActiveStepIndex();

  return (
    <Sidebar
      transitionDuration={1000}
      onBackdropClick={() => dispatch(authSlice.actions.toggleSidebar())}
      toggled={toggled}
      customBreakPoint="768px"
      collapsedWidth="80px"
      width="290px"
      style={{
        backgroundColor: themeStyle?.dashboardSibeBarFlow.flowDashboardSideBarBg || "#1A1A1A",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "24px 0",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Vertical teal bar for active step */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: `${activeStepIndex * 72 + 24}px`,
            width: "4px",
            height: "48px",
            backgroundColor: "#0B8085",
            borderRadius: "0 2px 2px 0",
            transition: "top 0.3s ease",
          }}
        />

        {/* Steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            paddingLeft: "24px",
          }}
        >
          {onboardingSteps.map((step, index) => {
            const isActive = index === activeStepIndex;

            return (
              <div key={index} style={{ position: "relative" }}>
                <Link
                  to={step.path}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 0",
                    paddingLeft: "8px",
                    cursor: "pointer",
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? "#0B8085" : "#2A2A2A",
                      border: isActive ? "none" : "1px solid #3A3A3A",
                      transition: "all 0.3s ease",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        color: "#FFFFFF",
                        fontSize: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      color: isActive ? "#FFFFFF" : "#8A8A8A",
                      fontSize: isActive ? "14px" : "13px",
                      fontWeight: isActive ? 700 : 400,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {step.label}
                  </span>
                </Link>

                {/* Connecting line */}
                {index < onboardingSteps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "28px",
                      top: "52px",
                      width: "2px",
                      height: "20px",
                      backgroundColor: "#3A3A3A",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Sidebar>
  );
};

export default OnboardingSidebar;

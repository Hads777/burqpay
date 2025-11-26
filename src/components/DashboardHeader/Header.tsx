import { useRef, useState } from "react";
import { FaBars, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { authSlice, setToken } from "../../redux/apis/apisSlice";
import type { RootState } from "../../redux/rootReducer";
import { Images } from "../Config/Images";
import { themeStyle } from "../Config/Theme";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { RiArrowDropDownFill } from "react-icons/ri";
import toast from "react-hot-toast";
import { logOutApi } from "../../redux/apis/apisCrud";
import Notifications from "./Notifications";
const DashboardHeader = () => {
  const navigate = useNavigate();
  const [showSuperAdmin, setShowSuperAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const themeBuilder = useSelector((state: RootState) => state.block.theme);
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const view = parts[1];
  const storedUserData = localStorage.getItem("userData");
  const user = storedUserData ? JSON.parse(storedUserData) : null;
  const GlobalStyle = createGlobalStyle`
    .header_layout {
      background: ${themeBuilder?.sideBarmenuBackgroundColor} !important;
    }
  `;

  const backgroundColorClass = themeStyle?.headerColor?.backgroundColor;
  const toggleMenu = () => {
    setOpen(!open);
  };
  dispatch(authSlice.actions.closeSidebar());

  // To open sidebar (if you want)
  dispatch(authSlice.actions.openSidebar());

  // Close when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };
  const logOut = async () => {
    try {
      const body = {};
      await toast.promise(
        logOutApi(body), // The promise to track
        {
          loading: "Loging Out...", // Loading state message
          success: (res) => {
            console.log(res,"11")
            if (res?.data?.success) {
              dispatch(setToken({ token: "" }));
              navigate("/login");
              return res?.data?.message;
            } else if (res?.data?.errors) {
              throw new Error(res.data.errors[0]); // Force error handling
            }
          },
          error: (err) => {
            console.error("Error occurred:", err);
            return err?.message || "Something went wrong!";
          },
        }
      );
    } catch (error: any) {
      console.error("Error during log out", error);
    }
  };

  return (
    <>
      <div
        className={
          view === "view"
            ? "border-bottom"
            : view === "account"
            ? ""
            : "header_layout"
        }
      >
        <div className="d-flex">
          {isMobile && (
            <div>
              <button
                className="bar-btn"
                onClick={() => dispatch(authSlice.actions.toggleSidebar())}
              >
                <FaBars />
              </button>
            </div>
          )}
          {(view === "view" || view === "account") && (
            <div
              className="border-left"
              style={{
                width: "290px",
                background: themeStyle?.dashboardSibeBarFlow.flowSideBarLogoBg,
              }}
            >
              <span
                onClick={() => navigate("/lms/dashboard")}
                className="d-flex justify-content-center p-2"
              >
                <img
                  onClick={() => dispatch(authSlice.actions.closeSidebar())}
                  src={Images.finovaLogo || "/placeholder.svg"}
                  alt="logo"
                />
              </span>
            </div>
          )}
          <div
            className={`d-flex col-md-12 ${backgroundColorClass}`}
            style={
              view === "view" || view === "account"
                ? { width: "calc(100% - 290px)" }
                : {}
            }
          >
            <div
              className="col-md-8 navbar-brand gap-2"
              style={{ color: themeBuilder?.color?.headingTextColor }}
            >
              <div>
                <img src={Images.BarIconClose} alt="" />
              </div>
              <div className="col-md-7 d-flex">
                <div
                  className="col-md-4 d-flex justify-content-start"
                  style={{ color: themeStyle?.color?.headingTextColor }}
                >
                  Dashboard
                </div>
              </div>
            </div>
            <div
              className={
                view === "view"
                  ? "d-flex col-md-4 justify-content-end gap-4 p-2"
                  : "d-flex col-md-4 justify-content-end gap-4"
              }
              style={{ alignItems: "center" }}
            >
              {/* <Notifications /> */}
              {/* <button
                style={{
                  border: "none",
                  background: "transparent",
                  alignItems: "center",
                }}
                className="d-flex gap-2"
                onClick={toggleMenu}
              >
                <img
                  style={{
                    backgroundColor: "lightgray",
                    borderRadius: "50%",
                    padding: "4px",
                  }}
                  src={Images.userLogo || "/placeholder.svg"}
                  alt="User"
                />
                <span>Admin</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 3.5L6 6.5L9 3.5L10 4.5L6 8.5L2 4.5L3 3.5Z"
                    fill="#A0A0A0"
                  />
                </svg>
              </button> */}
              <div className="d-flex align-items-center">
                <div style={{ justifySelf: "left", marginRight: "4px" }}>
                  <Notifications />
                  {/* <img src={Images.notification} alt="Notifications" /> */}
                </div>
                <div
                  className="user-profile-trigger d-flex align-items-center"
                  onClick={toggleMenu}
                >
                  <img
                    src={Images.userIcon}
                    alt="User Icon"
                    className="user-avatar"
                  />
                  <span className="user-name d-flex align-items-center ps-1">
                    <div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#090909",
                        }}
                      >
                        {user?.user?.name}
                      </div>
                      <div
                        className="mt-1"
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "#999797",
                        }}
                      >
                        {user[0]?.email}
                      </div>
                    </div>

                    <RiArrowDropDownFill />
                  </span>
                </div>
              </div>
              {open && (
                <div ref={menuRef} className="profile-dropdown">
                  {/* Close Button */}
                  <Button
                    variant="light"
                    className="close-btn"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </Button>

                  {/* Profile Picture */}
                  <div className="profile-picture">
                    <img src={Images.userIcon} alt="Super Admin" />
                    <span className="edit-icon">✎</span>
                  </div>

                  {/* User Name */}
                  <h4 className="profile-name">{user[0]?.name}</h4>

                  {/* Profile Actions */}
                  <div className="profile-actions">
                    <button
                      className="profile-btn left"
                      onClick={() => {navigate("/Dashboard/ProfileSetting");setOpen(false)}}
                    >
                      <FaCog className="icon" /> Settings
                    </button>
                    <div className="divider"></div>
                    <button
                      className="profile-btn right"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      <FaSignOutAlt className="icon" /> Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <GlobalStyle />
    </>
  );
};

export default DashboardHeader;

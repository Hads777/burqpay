import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Images } from "../Config/Images";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { authSlice } from "../../redux/apis/apisSlice";
import { themeStyle } from "../Config/Theme";
import { WalletOutlined } from "@ant-design/icons";
const DasbhboardSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const tokenValue = localStorage.getItem("accessToken");
  localStorage.setItem("activeBar", `Dashboard`);
  localStorage.setItem("activeSubBar", "All Customers");

  const [activeSubBar, setActiveSubBar] = useState(
    localStorage.getItem("activeSubBar") || ""
  );
  const toggled = useSelector((state: RootState) => state.block.toggled);
  const permissionData = useSelector(
    (state: RootState) => state.block.permissions
  );

  // Helper to check module and permission
  const hasAccess = (moduleNames: string | string[]): boolean => {
    if (!permissionData || !permissionData.modules) return false;

    // Convert to array if a single string is passed
    const namesToCheck = Array.isArray(moduleNames)
      ? moduleNames
      : [moduleNames];

    return permissionData.modules.some((m) => namesToCheck.includes(m.name));
  };

  const sidebarItems: any = [
    hasAccess("dashboard_module") && {
      label: "Collection Dashboard",
      Link: "Dashboard",
      img: Images.dashboardIcon,
      active: pathname.split("/").includes("Dashboard"),
      // menu: [
      //   {
      //     label: "Onboarding",
      //     Link: "Onboarding",
      //     LinkLabel: "Dashboard",
      //     active: pathname == "/Dashboard/Onboarding",
      //   },
      //   {
      //     label: "Incoming / Outgoing Funds",
      //     Link: "IncomingOutgoingFunds",
      //     LinkLabel: "Dashboard",
      //     active: pathname == "/Dashboard/IncomingOutgoingFunds",
      //   },
      //   {
      //     label: "Services",
      //     Link: "Services",
      //     LinkLabel: "Dashboard",
      //     active: pathname == "/Dashboard/Services",
      //   },
      //   {
      //     label: "Game Center",
      //     Link: "GameCenter",
      //     LinkLabel: "Dashboard",
      //     active: pathname == "/Dashboard/GameCenter",
      //   },
      // ],
    },

    hasAccess("customer_module") && {
      label: "Manage Customers",
      Link: "/Customers/AllCustomers",
      // img: Images.customerManagement,
      active: pathname.split("/").includes("Customers"),
      menu: [
        {
          label: "All Customers",
          Link: "AllCustomers",
          LinkLabel: "Customers",
          img: Images.accountIcon,
          active: pathname == "/Customers/AllCustomers",
        }
      ],
    },
    hasAccess(["roles_module", "department_module", "employee_module"]) && {
      label: "ACL",
      Link: "UserRoleManagement/Employees",
      // img: Images.customer,
      active: pathname.split("/").includes("UserRoleManagement"),
      menu: [
        hasAccess("employee_module") && {
          label: "Employees",
          Link: "Employees",
          LinkLabel: "UserRoleManagement",
          img: Images.accountIcon,
          active: pathname == "/UserRoleManagement/Employees",
        },
        hasAccess("roles_module") && {
          label: "Roles",
          Link: "Role",
          LinkLabel: "UserRoleManagement",
          img: Images.accountIcon,
          active: pathname == "/UserRoleManagement/Role",
        },
        // hasAccess("permissions_module")&&
        {
          label: "Permission",
          Link: "Permission",
          LinkLabel: "UserRoleManagement",
          img: Images.accountIcon,
          active: pathname == "/UserRoleManagement/Permission",
        },
        hasAccess("department_module") && {
          label: "Departments",
          Link: "Departments",
          LinkLabel: "UserRoleManagement",
          img: Images.accountIcon,
          active: pathname == "/UserRoleManagement/Departments",
        },
      ],
    },

    hasAccess(["orders_module"]) && {
      label: "Orders",
      Link: "/Booking/Flights",
      // img: Images.setting,
      active: pathname.split("/").includes("Booking"),
      menu: [
        hasAccess("orders_module") && {
          label: "Flights",
          Link: "Flights",
          LinkLabel: "Booking",
          img: Images.accountIcon,
          active: pathname == "/Booking/Flights",
          activePaths:['/Booking/Flights/FlightDetails']
        },
        {
          label: "E-commerce",
          Link: "Ecommerce",
          LinkLabel: "Orders",
          img: Images.accountIcon,
          active: pathname == "/Orders/Ecommerce",
          activePaths:['/Orders/Ecommerce/Details']
        },
        {
          label: "Packages",
          Link: "Packages",
          LinkLabel: "Orders",
          img: Images.accountIcon,
          active: pathname == "/Orders/Packages",
          activePaths:['/Orders/Packages/Details']
        },
      ],
    },
    hasAccess(["topup_module"]) && {
      label: "Wallet Top-UP",
      Link: "/Wallet/TopUp",
      active: pathname.split("/").includes("TopUp"),
      // img: Images.accountIcon,
      menu: [
        {
          label: "Top-UP",
          Link: "TopUp",
          LinkLabel: "Wallet",
          img: Images.accountIcon,
          active: pathname == "/Wallet/TopUp",
        },
      ],
    },
     {
      label: "Withdrawal Management",
      Link: "/WithdrawalManagement/ManageBanks",
      active: pathname.split("/").includes("WithdrawalManagement"),
      // img: Images.accountIcon,
      menu: [
           {
          label: "Manage Banks",
          Link: "ManageBanks",
          LinkLabel: "WithdrawalManagement",
          img: Images.accountIcon,
          active: pathname == "/WithdrawalManagement/ManageBanks",
        }
      ],
    },
    {
      label: "Transactions",
      Link:  "Transactions/PackagesList",
      LinkLabel: "Transactions",
      active: pathname.split("/").includes("Transactions"),
      menu: [
        // hasAccess("terms&conditions_module") && 
        {
          label: "Packages List",
          Link: "PackagesList",
          LinkLabel: "Transactions",
          img: Images.accountIcon,
          active: pathname == "/Transactions/PackagesList",
        },

        {
          label: "Vendors",
          Link: "Vendors",
          LinkLabel: "Transactions",
          img: Images.accountIcon,
          active: pathname == "/Transactions/Vendors",
        },

        
      ],
    },
    {
      label: "Reports",
      Link:  "Reports/CustomerReports",
      LinkLabel: "Reports",
      active: pathname.split("/").includes("Reports"),
      menu: [
        // hasAccess("terms&conditions_module") && 
        {
          label: "Customer Report",
          Link: "CustomerReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/CustomerReports",
        },

        {
          label: "Orders Report",
          Link: "OrderReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/OrderReports",
        },

        {
          label: "Packages Report",
          Link: "PackagesReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/PackagesReports",
        },
        {
          label: "Complaints Report",
          Link: "ComplaintReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/ComplaintReports",
        },
        {
          label: "Wallet Top-Up Report",
          Link: "WalletTopUpReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/WalletTopUpReports",
        },
        {
          label: "Spending Report",
          Link: "SpendingReports",
          LinkLabel: "Reports",
          img: Images.accountIcon,
          active: pathname == "/Reports/SpendingReports",
        },
      ],
    },
    hasAccess(["faq_module"]) && {
      label: "Settings",
      Link:  hasAccess("terms&conditions_module")?"Settings/TermsPrivacyPolicy":hasAccess("mabrour_module")?"Settings/AboutMabrour":"Settings/Faqs",
      LinkLabel: "Settings",
      active: pathname == "/Settings/TermsPrivacyPolicy",
      menu: [
        // hasAccess("terms&conditions_module") && 
        {
          label: "Terms & Privacy Policy",
          Link: "TermsPrivacyPolicy",
          LinkLabel: "Settings",
          img: Images.accountIcon,
          active: pathname == "/Settings/TermsPrivacyPolicy",
        },

        hasAccess("mabrour_module") && {
          label: "About Mabrour",
          Link: "AboutMabrour",
          LinkLabel: "Settings",
          img: Images.accountIcon,
          active: pathname == "/Settings/AboutMabrour",
        },

        hasAccess("faq_module") && {
          label: "FAQ's",
          Link: "Faqs",
          LinkLabel: "Settings",
          img: Images.accountIcon,
          active: pathname == "/Settings/Faqs",
        },
        {
          label: "Acitivity Logs",
          Link: "ActivityLogs",
          LinkLabel: "Settings",
          img: Images.accountIcon,
          active: pathname == "/Settings/ActivityLogs",
        },
        {
          label: "Campaign System",
          Link: "CampaignSystem",
          LinkLabel: "Settings",
          img: Images.accountIcon,
          active: pathname == "/Settings/CampaignSystem",
        },
      ],
    },
    
  ];
  const [activeBar, setActiveBar] = useState(
    () =>
      sidebarItems?.find((item) => pathname.includes(item?.Link))?.label || ""
  );

  // Persist activeBar in localStorage when it changes
  useEffect(() => {
    const currentItem = sidebarItems.find((item) =>
      pathname.includes(item?.Link)
    );
    if (currentItem) {
      setActiveBar(currentItem.label);
    }
  }, [pathname]);

  const onSmash = (itemLabel) => {
    setActiveBar(itemLabel);
    setActiveSubBar("");
  };

  const renderSubmenu = (item) => (
    <div className="menu-items css-12w9als" key={item.label}>
      <SubMenu
        label={item.label}
        icon={item.img ? <img src={item.img} alt="" /> : ""}
        defaultOpen={item.active}
        onClick={() => {
          setActiveBar(item.label);
          navigate(`${item.Link}`);
        }}
      >
        {item.menu?.filter(Boolean).map((submenuItem, subIndex) => {
          const isSubActive =
            pathname === `/${submenuItem.LinkLabel}/${submenuItem.Link}` ||  submenuItem?.activePaths?.some((path: string) =>pathname.startsWith(path));

          return (
            <Link
              to={`/${submenuItem.LinkLabel}/${submenuItem.Link}`}
              key={subIndex}
              style={{
                textDecoration: "none",
                color: isSubActive
                  ? themeStyle?.dashboardSibeBarFlow.activeTextColor
                  : themeStyle?.dashboardSibeBarFlow.inActiveTextColor,
                backgroundColor: isSubActive
                  ? themeStyle?.dashboardSibeBarFlow.activeColorBg
                  : themeStyle?.dashboardSibeBarFlow.subMenuSideBarBg,
                fontSize: "13px",
              }}
            >
              <MenuItem
                active={isSubActive}
                onClick={() => setActiveSubBar(submenuItem?.label)}
                style={{ fontSize: "12px", fontWeight: "400" }}
                prefix={
                  submenuItem?.img ? (
                    <img
                      src={submenuItem?.img}
                      alt=""
                      style={{ background: "none", filter: "invert(1)" }}
                      width={16}
                      height={16}
                    />
                  ) : null
                }
              >
                {submenuItem?.label}
              </MenuItem>
            </Link>
          );
        })}
      </SubMenu>
    </div>
  );

  const filteredSidebarItems = sidebarItems?.filter(Boolean);
  return (
    <>
      <Sidebar
        transitionDuration={1000}
        onBackdropClick={() => dispatch(authSlice.actions.toggleSidebar())}
        toggled={toggled}
        customBreakPoint="768px"
        collapsedWidth="80px"
        width="290px"
        className="bp-sidebar col-12 fw-bold menu-items css-12w9als"
        style={{
          fontSize: "13px",
          backgroundColor:
            themeStyle?.dashboardSibeBarFlow.flowDashboardSideBarBg,
        }}
        >
        {/* Logo */}
        <div
          className="bp-sidebar-logo"
          onClick={() => {
            navigate("/Dashboard");
          }}
        >
          <img src={Images.mabrourLogo} alt="logo" />
        </div>
        <Menu>
          {filteredSidebarItems.map((item, index) => (
            <React.Fragment key={index}>
              {item?.menu?.filter(Boolean) ? (
                renderSubmenu(item)
              ) : (
                <div className="menu-items css-12w9als">
                  <Link
                    to={`${item?.Link}`}
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      textDecoration: "none",
                      // backgroundColor: item.active ? "#181818" : "transparent",
                      // color: item.active ? "#ffffff" : "#000000",
                    }}
                    // className={item.active ? "active" : ""}
                  >
                    <MenuItem
                      active={item?.active}
                      onClick={() => onSmash(item.label)}
                      prefix={
                        <img
                          width={16}
                          height={16}
                          src={item?.img ? item?.img : Images?.BlackIcon}
                          style={{ background: "none" }}
                        />
                      }
                    >
                      {item?.label}
                    </MenuItem>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </Menu>
      </Sidebar>
    </>
  );
};

export default DasbhboardSidebar;

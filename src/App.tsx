import { RouterProvider, useNavigate } from "react-router-dom";
import { store, persistor, RootState } from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { router } from "./Routes/path";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from "./components/i18n";
import Loader from "./components/Loader/Loader";
import { themeStyle } from "./components/Config/Theme";

import { useEffect, useState } from "react";
import {
  setCities,
  setCountries,
  setLanguages,
  setProdId,
  setRelations,
  setStates,
} from "./redux/apis/apisSlice";
import { setNavigator } from "./utils/const.utils";
const App = () => {
  const dispatch = useDispatch();
  // dispatch(authSlice.actions.setTheme( {themeStyle} ));
  localStorage.setItem("tenantId", "980fb848-9a36-425e-4632-08dc7fb833c6");
  const GlobalStyle = createGlobalStyle`
  .application-btn{
  background: ${themeStyle.secondary} !important;
  }
  .theme-btn-next{
  background: ${themeStyle.secondary} !important;
  }
  .invoice-btn{
  background: ${themeStyle.otherActionsColor} !important;
  }
  .revert-btn{
  background: ${themeStyle.revertActionColor} !important;
  }
  .nav-tabs .nav-link.active{
  background: ${themeStyle.activeTab} !important;
  }
  .nav-tabs .nav-link{
  background: ${themeStyle.inaActiveTab} !important;
  }
  .gradient-btn{
  background: ${themeStyle.gradientBackgroundColor} !important;
  width: 69px;
  height: 29px;
  font-size:12px;
  color:#fff !important;
  }
  .subheader_layout{
  background: ${themeStyle?.headerColor.subHeaderBgColor} !important;
  color: ${themeStyle?.headerColor.subheaderTextColor} !important;
  }
  .css-vj11vy.ps-menu-root {
  background: ${themeStyle?.dashboardSibeBarFlow.flowDashboardSideBarBg} !important;
  }
  .ps-submenu-content ul {
  background: ${themeStyle?.dashboardSibeBarFlow.subMenuSideBarBg} !important;
  color: ${themeStyle?.dashboardSibeBarFlow.subMenuSideBarBg} !important;
  }
  span.ps-menu-label.ps-active.css-12w9als {
  background: ${themeStyle?.dashboardSibeBarFlow.activeColorBg} !important;
  color: ${themeStyle?.dashboardSibeBarFlow.activeTextColor} !important;

  }

li.ps-menuitem-root.ps-active> .ps-menu-button {
 background-color: ${themeStyle?.dashboardSibeBarFlow.activeColorBg} !important;
  color: ${themeStyle?.dashboardSibeBarFlow.activeTextColor} !important;
      margin-left: 20px;
}


 .css-12w9als {
  color:  ${themeStyle?.dashboardSibeBarFlow.inActiveTextColor} !important ;
}
  .menu-items > li a:hover span , .menu-items > a:hover span {
  color: ${themeStyle?.dashboardSibeBarFlow.activeTextColor} !important ;
}
  .ps-submenu-content ul {
    background: #000 !important;
    color: #fff !important;
}
    span.ps-submenu-expand-icon.ps-open.css-1cuxlhl span:after {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
}
    span.ps-submenu-expand-icon.ps-open.css-1cuxlhl span:before {
    display:none !important;
}
   
    span.ps-submenu-expand-icon.ps-open.css-1cuxlhl span.css-jn69v9 {
    border: 0px !important;
}
    span.ps-submenu-expand-icon.ps-open.css-1cuxlhl span:after {
    width: 15px;
    height: 2px;
    left: -10px;
    top: 0px;
    transform: translateX(0);
    transform: rotate(315deg) !important;
}

   nav.ps-menu-root.css-vj11vy .ps-submenu-content ul a.ps-menu-button {
    margin-left: 0px !important;
    margin-top:0px !important;
    padding-left: 10px !important;
}
    .ps-submenu-content.ps-open , .ps-submenu-content {
    background: #000 !important;
}
    .ps-submenu-content ul {
    background: #090909 !important;;
    color: #fff !important;
    margin-left: 34px;
    margin-top: 10px;
}
   .ps-submenu-content .css-1wc703o {
    margin-right: 10px !important;
}
    .ps-submenu-content a.ps-menu-button {
    text-transform: capitalize !important;
}
    .ps-submenu-content.ps-open ul a li a {
    width: 100% !important;
}
}
  
`;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <I18nextProvider i18n={i18n}>
        {/* <Provider store={store}> */}
        <ThemeProvider theme={theme}>
          {/* <PersistGate persistor={persistor}> */}
          <GlobalStyle />
          <RouterProvider router={router} />
          {/* </PersistGate> */}
        </ThemeProvider>
        {/* </Provider> */}
      </I18nextProvider>
    </>
  );
};

export default App;
export const NumberFormatter = ({ value }) => {
  const formattedNumber = new Intl.NumberFormat("en-US").format(value);

  return <div className="formatted-number">{formattedNumber}</div>;
};
export function formatDate(dateString) {
  if (!dateString) return null; // Return null if date is not provided
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return null; // Ensure it's a valid date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based in JS
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

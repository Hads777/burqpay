import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { DatePicker, Radio, Menu } from "antd"; // Import necessary components from Ant Design
import { RootState } from "../../redux/rootReducer";
import { themeStyle } from "../Config/Theme";
import { Button } from "antd";
import blackPrint from "../../assets/images/blac-print.png";
import { setFilterUtils } from "../../utils/const.utils";
import { authSlice } from "../../redux/apis/apisSlice";
import { formatDate } from "../../App";
const { RangePicker } = DatePicker;

const DashboardInfoSubHeader = () => {
  const navigate = useNavigate();
  const themeBuilder = useSelector((state: RootState) => state.block.theme);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const pathname = window.location.pathname;
  const parts = pathname.split("/"); // ["", "view", "customerservices"]
  const view = parts[1]; // "view"

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const GlobalStyle = createGlobalStyle`
    .header_layout {
      background: ${themeStyle?.headerColor.dashboardHeaderBgColor} !important;
    }
      .subheader_layout{
     background: ${themeStyle?.headerColor.dashboardSubheaderBgColor} !important;
      }
  `;
  const [selectedValue, setSelectedValue] = useState("today");

  const handleButtonClick = (value) => {
    setSelectedValue(value);
    dispatch(authSlice.actions.setTheme({ theme: value }));
    console.log(value, "filter");
    setFilterUtils(value);
    localStorage.setItem("filter", value);
    setFromDate("");
    setToDate("");
    dispatch(
      authSlice.actions.setFromFilter({
        fromFilter: formatDate(""),
      })
    );
    dispatch(
      authSlice.actions.setToFilter({
        toFilter: formatDate(""),
      })
    );
  };
  return (
    <>
      <div className="subheader_layout">
        <div className="d-flex align-items-center">
          {/* <div style={{ marginRight: "0px" }}>
              <Button.Group>
                <Button
                  onClick={() => handleButtonClick("today")}
                  type={selectedValue === "today" ? "primary" : "default"}
                  style={{
                    marginRight: "8px",
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "today" ? "#0B8085" : "#ffffff", // selected button background color
                    color: selectedValue === "today" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Today
                </Button>
                <Button
                  onClick={() => handleButtonClick("Yesterday")}
                  type={selectedValue === "Yesterday" ? "primary" : "default"}
                  style={{
                    marginRight: "8px",
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "Yesterday" ? "#0B8085" : "#ffffff", // selected button background color
                    color:
                      selectedValue === "Yesterday" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Yesterday
                </Button>
                <Button
                  onClick={() => handleButtonClick("last_7_days")}
                  type={selectedValue === "last_7_days" ? "primary" : "default"}
                  style={{
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "last_7_days" ? "#0B8085" : "#ffffff", // selected button background color
                    color:
                      selectedValue === "last_7_days" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Last 7 Days
                </Button>
                <Button
                  onClick={() => handleButtonClick("last_30_days")}
                  type={
                    selectedValue === "last_30_days" ? "primary" : "default"
                  }
                  style={{
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "last_30_days" ? "#0B8085" : "#ffffff", // selected button background color
                    color:
                      selectedValue === "last_30_days" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Last 30 Days
                </Button>
                <Button
                  onClick={() => handleButtonClick("last_6_months")}
                  type={
                    selectedValue === "last_6_months" ? "primary" : "default"
                  }
                  style={{
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "last_6_months" ? "#0B8085" : "#ffffff", // selected button background color
                    color:
                      selectedValue === "last_6_months" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Last 6 Months
                </Button>
                <Button
                  onClick={() => handleButtonClick("last_year")}
                  type={selectedValue === "last_year" ? "primary" : "default"}
                  style={{
                    borderColor: "#CCCCCC", // border color
                    backgroundColor:
                      selectedValue === "last_year" ? "#0B8085" : "#ffffff", // selected button background color
                    color:
                      selectedValue === "last_year" ? "#ffffff" : "#0B8085", // selected button text color
                    borderWidth: "1px", // adding border thickness
                  }}
                  className="button-custom"
                >
                  Last Year
                </Button>
              </Button.Group>
            </div> */}
          <div className="d-flex col-12 align-items-center">
            <div className="col-6 header-label mt-2 mb-2 p-4">Overview</div>
            <div
              className="d-flex gap-1 p-2 col-6 d-flex justify-content-end"
              style={{ paddingLeft: "0px !important" }}
            >
              <DatePicker
                className="date-picker"
                placeholder="From"
                value={fromDate}
                onChange={(date) => {
                  setFromDate(date);
                  dispatch(
                    authSlice.actions.setFromFilter({
                      fromFilter: formatDate(date ? date : null),
                    })
                  );
                }}
                allowClear
              />
              <DatePicker
                className="date-picker"
                placeholder="To"
                value={toDate}
                onChange={(date) => {
                  setToDate(date);
                  dispatch(
                    authSlice.actions.setToFilter({
                      toFilter: formatDate(date),
                    })
                  );
                  setSelectedValue(!toDate ? "" : "today");
                  dispatch(authSlice.actions.setTheme({ theme: "" }));
                }}
                allowClear
              />
            </div>

            {/* <div className="csv-print">
              <img
                src={blackPrint}
                alt=""
                width={15}
                height={15}
                style={{ cursor: "pointer" }} // Add pointer cursor
              />
              Print CSV
            </div> */}
          </div>
        </div>
      </div>
      <GlobalStyle />
    </>
  );
};
export default DashboardInfoSubHeader;

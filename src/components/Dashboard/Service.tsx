import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import icon from "../../assets/images/Vector-11.png";
import circle from "../../assets/images/circle-icon.png";
import time from "../../assets/images/gg_time.png";
import { Skeleton, Tabs } from "antd";
import blackPrint from "../../assets/images/blac-print.png";
import BusTickets from "./BusTickets";
import AirTickets from "./AirTickets";
import TopUp from "./TopUp";
import Bundles from "./Bundles";
import { serviceDashboardList } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { filterUtils, NumberFormatter } from "../../utils/const.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import ChartSkeleton from "../ChartSkeleton";
import SkeletonLabel from "../SkeletonLabel";

const Service = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [legends, setLegends] = useState<any>();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>();
  const [activeTab, setActiveTab] = useState("numbers"); // State for active tab
  const popupRef = useRef(null); // Ref for the popup
  const { TabPane } = Tabs;
  const filterValue = useSelector((state: RootState) => state.block.theme);
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const fromFilter = useSelector((state: RootState) => state.block.fromFilter);
  const toFilter = useSelector((state: RootState) => state.block.toFilter);
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false); // Close the popup
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getList = async (filter: any, from: any, to: any) => {
    try {
      setSkelitonLoading(true);
      setLoading(true);
      const response = await serviceDashboardList(filter, from, to);
      if (response) {
        console.log(response, "123");
        const data = response?.data?.data;
        setDashboardData(data);
        setLoading(false);
        // setData(data || []);
        setSkelitonLoading(false);
        // setTotalRows(response?.data?.data?.total || 0);
        // setFrom(response?.data?.data?.from || 0);
        // setTo(response?.data?.data?.to || 0);
        // setPage(response?.data?.data?.current_page);
        // setTotalPage(response?.data?.data?.last_page);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setLoading(false);
      setSkelitonLoading(false);
    } finally {
      setLoading(false);
      setSkelitonLoading(false);
    }
    console.log(data, "appdata");
  };
  useEffect(() => {
    getList(filterValue, fromFilter, toFilter);
  }, [filterValue, fromFilter, toFilter]);

  // Bar chart options for "Numbers" tab
  const busBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.bus_tickets?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Series 1", // Name for the first set of bars
        data: dashboardData?.bus_tickets?.graph?.map((day) => day?.amount), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#614FA2", // Color for the first set of bars
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        // Custom tooltip to show both series values
        let tooltip = `Day ${params[0].axisValue}:<br>`;
        params.forEach((item) => {
          tooltip += `${item.marker} ${item.seriesName}: ${item.data}<br>`;
        });
        return tooltip;
      },
    },
    grid: {
      containLabel: true, // Ensure labels fit within the chart
      left: "5%", // Add space on the left for the legend
      right: "5%",
      bottom: "15%", // Add space at the bottom for the x-axis label
    },
  };
  const airBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.air_tickets?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Series 1", // Name for the first set of bars
        data: dashboardData?.air_tickets?.graph?.map((day) => day?.amount), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#614FA2", // Color for the first set of bars
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        // Custom tooltip to show both series values
        let tooltip = `Day ${params[0].axisValue}:<br>`;
        params.forEach((item) => {
          tooltip += `${item.marker} ${item.seriesName}: ${item.data}<br>`;
        });
        return tooltip;
      },
    },
    grid: {
      containLabel: true, // Ensure labels fit within the chart
      left: "5%", // Add space on the left for the legend
      right: "5%",
      bottom: "15%", // Add space at the bottom for the x-axis label
    },
  };
  const topUpBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.topups?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Series 1", // Name for the first set of bars
        data: dashboardData?.topups?.graph?.map((day) => day?.amount), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#614FA2", // Color for the first set of bars
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        // Custom tooltip to show both series values
        let tooltip = `Day ${params[0].axisValue}:<br>`;
        params.forEach((item) => {
          tooltip += `${item.marker} ${item.seriesName}: ${item.data}<br>`;
        });
        return tooltip;
      },
    },
    grid: {
      containLabel: true, // Ensure labels fit within the chart
      left: "5%", // Add space on the left for the legend
      right: "5%",
      bottom: "15%", // Add space at the bottom for the x-axis label
    },
  };
  const bundlesBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.bundles?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle",
      nameGap: 30,
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Series 1", // Name for the first set of bars
        data: dashboardData?.bundles?.graph?.map((day) => day?.amount), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#614FA2", // Color for the first set of bars
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        // Custom tooltip to show both series values
        let tooltip = `Day ${params[0].axisValue}:<br>`;
        params.forEach((item) => {
          tooltip += `${item.marker} ${item.seriesName}: ${item.data}<br>`;
        });
        return tooltip;
      },
    },
    grid: {
      containLabel: true, // Ensure labels fit within the chart
      left: "5%", // Add space on the left for the legend
      right: "5%",
      bottom: "15%", // Add space at the bottom for the x-axis label
    },
  };
  // Bar chart options for "Average"
  const handleTabChange = (key) => {
    setActiveTab(key); // Update active tab
  };

  const handleClick = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility on click
  };

  // Function to handle finished event

  const data = [
    { name: "Available", value: 4 },
    { name: "Locked", value: 6 },
    { name: "Pleadge", value: 0 },
  ];
  const totalTickets = data.reduce((sum, item) => sum + item.value, 0);

  const seriesData = [
    {
      symbolSize: 1,
      data: [
        {
          name: "Available",
          value: 4,
        },
        { name: "Locked", value: 6 },
        { name: "Pleadge", value: 0 },
      ],
      name: "test",
      type: "pie",
      radius: ["60%", "80%"],
      center: isMobile ? ["50%", "50%"] : ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        disabled: true, // Disable hover effects
      },
      labelLine: {
        show: false,
      },
    },
  ];

  const systemPieGraph = {
    color: ["#D52C48", "#03BB86"],
    tooltip: {
      trigger: "item",
    },
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: `Total Tickets\n${totalTickets}`, // Display "Total Tickets" and the value
        fontSize: 12, // Font size for the text
        fontWeight: "bold",
        fill: "#333", // Text color
        textAlign: "center", // Center-align the text
        lineHeight: 15,
      },
    },
    series: seriesData,
  };
  const tabData = [
    { key: "Bus", label: "Bus", chartOptions: busBarChartOptions },
    { key: "Air", label: "Air", chartOptions: airBarChartOptions },
    { key: "Topup", label: "Top-up", chartOptions: topUpBarChartOptions },
    { key: "Bundles", label: "Bundles", chartOptions: bundlesBarChartOptions },
  ];
  console.log(dashboardData, "332211");
  return (
    <div className="service">
      {isPopupVisible && (
        <div
          ref={popupRef} // Attach the ref to the popup container
          style={{
            position: "absolute",
            top: "60px",
            left: "0",
            right: "0",
            margin: "0 auto",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            padding: "0px",
            zIndex: 1000,
            maxWidth: "630px",
            height: "380px",
            borderRadius: "16px",
          }}
        >
          <label className="label-tag" style={{ position: "absolute" }}>
            Services
          </label>
          <Tabs
            defaultActiveKey="numbers"
            onChange={handleTabChange}
            tabBarStyle={{
              backgroundColor: "#6C727F",
              borderRadius: "50px",
              padding: "10px",
              border: "none",
            }}
            tabBarGutter={16}
            renderTabBar={(props, DefaultTabBar) => (
              <DefaultTabBar {...props} style={{ borderRadius: "20px" }} />
            )}
          >
            {tabData.map(({ key, label, chartOptions }) => (
              <TabPane
                tab={
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: "#6C727F",
                      color: "#FFFFFF",
                    }}
                  >
                    {label}
                  </span>
                }
                key={key}
              >
                <ReactECharts
                  option={chartOptions}
                  style={{ width: "100%", height: "300px" }}
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
      )}

      <div className="dash-service col-12 gap-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h4>Services</h4>
          <div className="csv-print">
            <img
              src={blackPrint}
              alt=""
              width={15}
              height={15}
              style={{ cursor: "pointer" }} // Add pointer cursor
            />
            Print CSV
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row onboard-stats">
              <div className="col-md-3">
                <div className="onboarding-stats p-2 mt-3">
                  <span>No of Services Sold</span>
                  <label>{skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    
                            {NumberFormatter(
               dashboardData?.total_amount_of_services
                            )}{" "}
                          </>
                        )}</label>
                </div>
                <div className="stats-values p-2 mb-3">
                  <span>Total Sale Amount</span>
                  <label> {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    
                            {NumberFormatter(
             dashboardData?.total_number_of_services
                            )}{" "}
                          </>
                        )}</label>
                </div>
              </div>
              <div className="col-md-9">
                <div
                  style={{
                    position: "relative",

                    maxWidth: "100%",
                    height: "340px",
                    borderRadius: "16px",
                  }}
                >
                  <Tabs
                    defaultActiveKey="numbers"
                    onChange={handleTabChange}
                    tabBarStyle={{
                      backgroundColor: "#6C727F",
                      borderRadius: "50px",
                      padding: "10px",
                      border: "none",
                    }}
                    tabBarGutter={16}
                    renderTabBar={(props, DefaultTabBar) => (
                      <DefaultTabBar
                        {...props}
                        style={{ borderRadius: "20px" }}
                      />
                    )}
                  >
                    {tabData.map(({ key, label, chartOptions }) => (
                      <TabPane
                        tab={
                          <span
                            style={{
                              display: "inline-block",
                              padding: "5px 20px",
                              borderRadius: "50px",
                              backgroundColor: "#6C727F",
                              color: "#FFFFFF",
                            }}
                          >
                            {label}
                          </span>
                        }
                        key={key}
                      >
                        <div className="w-100" style={{ height: "400px" }}>
                          {loading ? (
                            <ChartSkeleton value={17} />
                          ) : (
                            <ReactECharts
                              option={chartOptions}
                              style={{ width: "100%", height: "300px" }}
                            />
                          )}
                        </div>
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12" style={{ padding: "0px" }}>
            <div className="row stats-block onborading-stats">
              <div className="col-md-3">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span
                      className="img-span"
                      style={{ backgroundColor: "#D3E5E4" }}
                    >
                      <img src={icon} alt="" />
                    </span>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Bus Tickets</span>
                      <label>
                
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                           PKR{" "}
                            {NumberFormatter(
                             dashboardData?.bus_tickets?.total_amount
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">Total Tickets</span>
                      <label>   {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    
                            {NumberFormatter(
                       dashboardData?.bus_tickets?.total_number
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span
                      className="img-span"
                      style={{ backgroundColor: "#EBEBFF" }}
                    >
                      <img src={icon} alt="" />
                    </span>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Air Tickets</span>
                      <label>
                
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    PKR
                            {NumberFormatter(
                 dashboardData?.air_tickets?.total_amount
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">Total Tickets</span>
                      <label>
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
              
                            {NumberFormatter(
                 dashboardData?.air_tickets?.total_number
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span
                      className="img-span"
                      style={{ backgroundColor: "#E2FFF7" }}
                    >
                      <img src={icon} alt="" />
                    </span>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Top-up</span>
                      <label>   {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    PKR
                            {NumberFormatter(
                 dashboardData?.topups?.total_amount
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">Total Top-up</span>
                      <label> {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    
                            {NumberFormatter(
                dashboardData?.topups?.total_number
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span
                      className="img-span"
                      style={{ backgroundColor: "#FCDEE6" }}
                    >
                      <img src={icon} alt="" />
                    </span>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Bundles</span>
                      <label> {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    PKR
                            {NumberFormatter(
                dashboardData?.bundles?.total_amount
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">Total Bundles</span>
                      <label> {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                    
                            {NumberFormatter(
                dashboardData?.bundles?.total_number
                            )}{" "}
                          </>
                        )}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="user-detail-bg"
              style={{ backgroundColor: "#E1F4FF", borderRadius: "16px" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="service-tickets">
        <BusTickets dashboardData={dashboardData} loading={loading} />
      </div>
      <div className="air-tickets">
        <AirTickets dashboardData={dashboardData} loading={loading} />
      </div>
      <div className="topup-tickets">
        <TopUp dashboardData={dashboardData} loading={loading} />
      </div>
      <div className="bundle-tickets">
        <Bundles dashboardData={dashboardData} loading={loading} />
      </div>

      <div className="col-12 mt-3"></div>
    </div>
  );
};

export default Service;

import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import circle from "../../assets/images/circle-icon.png";
import { Tabs } from "antd";
import blackPrint from "../../assets/images/blac-print.png";

import Ibft from "./Ibft";
import OutgoingGames from "./OutgoingGames";
import OutgoingServices from "./OutgoingServices";
import { incomingOutgoingDashboardList } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import ChartSkeleton from "../ChartSkeleton";
import SkeletonLabel from "../SkeletonLabel";
import { NumberFormatter } from "../../utils/const.utils";
const IncomingOutgoingFund = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const filterValue = useSelector((state: RootState) => state.block.theme);
  const [legends, setLegends] = useState<any>();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>();
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const fromFilter = useSelector((state: RootState) => state.block.fromFilter);
  const toFilter = useSelector((state: RootState) => state.block.toFilter);
  const [activeTab, setActiveTab] = useState("numbers"); // State for active tab
  const popupRef = useRef(null); // Ref for the popup
  const { TabPane } = Tabs;
  const getList = async (filter: any, from: any, to: any) => {
    try {
      setSkelitonLoading(true);
      const response = await incomingOutgoingDashboardList(filter, from, to);
      if (response) {
        console.log(response, "123");
        const data = response?.data?.data;
        setDashboardData(data);
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
      setSkelitonLoading(false);
    } finally {
      setSkelitonLoading(false);
    }
    console.log(data, "appdata");
  };
  useEffect(() => {
    getList(filterValue, fromFilter, toFilter);
  }, [filterValue, fromFilter, toFilter]);
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
  const ibftBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.ibft_report_card?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle", // Position the label in the middle
      nameGap: 30, // Increase the gap between the label and the axis
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Incoming", // Name for the first set of bars
        data: dashboardData?.ibft_report_card?.graph?.map(
          (day) => day?.total_fund
        ), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "20%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#03BB86", // Color for the first set of bars
        },
      },
      {
        name: "Outgoing", // Name for the first set of bars
        data: dashboardData?.ibft_report_card?.outgoing_graph?.map(
          (day) => day?.total_fund
        ), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "20%", // Adjust the width of the bars (e.g., 40% of the category width)

        itemStyle: {
          color: "#D52C48", // Color for the first set of bars
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
      bottom: "5%", // Add space at the bottom for the x-axis label
    },
  };
  const serviceBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.services_report_card?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle", // Position the label in the middle
      nameGap: 30, // Increase the gap between the label and the axis
    },
    yAxis: {
      type: "value",
      name: "Numbers", // Y-axis label
    },
    series: [
      {
        name: "Service", // Name for the first set of bars
        data: dashboardData?.services_report_card?.graph?.map(
          (day) => day?.total_fund
        ), // Data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "20%", // Adjust the width of the bars (e.g., 40% of the category width)
        itemStyle: {
          color: "#03BB86", // Color for the first set of bars
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
      bottom: "5%", // Add space at the bottom for the x-axis label
    },
  };
  // Bar chart options for "Average" tab
  const gameBarChartOptions = {
    xAxis: {
      type: "category",
      data: dashboardData?.games_report_card?.graph?.map((day) => day?.name), // Days in Feb 2025
      nameLocation: "middle", // Position the label in the middle
      nameGap: 30, // Increase the gap between the label and the axis
    },
    yAxis: {
      type: "value",
      name: "Average", // Y-axis label
    },
    series: [
      {
        name: "Incoming", // Name for the first set of bars
        data: dashboardData?.games_report_card?.graph?.map(
          (day) => day?.total_fund
        ), // Average data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)
        itemStyle: {
          color: "#6C727F", // Color for the first set of bars
        },
      },
      {
        name: "Outgoing", // Name for the first set of bars
        data: dashboardData?.games_report_card?.outgoing_graph?.map(
          (day) => day?.total_fund
        ), // Average data for the first set of bars
        type: "bar",
        barGap: "0%", // No gap between bars in different series
        barCategoryGap: "0%", // No gap between bars in the same category
        barWidth: "40%", // Adjust the width of the bars (e.g., 40% of the category width)
        itemStyle: {
          color: "red", // Color for the first set of bars
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
      bottom: "5%", // Add space at the bottom for the x-axis label
    },
  };
  const handleTabChange = (key) => {
    setActiveTab(key); // Update active tab
  };

  const handleClick = () => {
    setPopupVisible(!isPopupVisible); // Toggle popup visibility on click
  };

  const chartRef: any = useRef(null);
  let colors: any = "";

  // Function to handle finished event
  const handleChartFinish = () => {
    // Access echarts instance
    const instance = chartRef.current.getEchartsInstance();
    // Get colors used in the chart
    colors = instance.getOption().color;
    // Log colors to the console
    console.log("Colors:", colors);
    if (!legends) {
      setLegends(colors);
    }
  };

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
    { key: "IBFT", label: "IBFT", chartOptions: ibftBarChartOptions },
    { key: "Games", label: "Games", chartOptions: gameBarChartOptions },
    {
      key: "Services",
      label: "Services",
      chartOptions: serviceBarChartOptions,
    },
  ];
  return (
    <div className="outgoing">
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
            Incoming / Outgoing Funds
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

      <div className="dash-outgoing col-12 gap-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h4>Incoming / Outgoing Funds</h4>
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
                  <span>Avg Incoming Funds</span>
                  <label style={{ color: "#03BB86" }}>
                 
                     {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                           PKR{" "}
                            {NumberFormatter(
                                 dashboardData?.funds_report?.incoming_funds
                                 ?.average_amount
                            )}{" "}
                          </>
                        )}
                  </label>
                  <br />
                  <span>Avg Outgoing Funds</span>
                  <label style={{ color: "#D52C48" }}>
                 
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                     
                            {NumberFormatter(
                                    dashboardData?.funds_report?.outgoing_funds
                                    ?.average_amount
                            )}{" "}
                          </>
                        )}
                  </label>
                </div>
                <div className="stats-values p-2 mb-3">
                  <span>
                    Incoming Funds{" "}
                    <span className="ps-1 pb-2">
                      <img
                        src={circle}
                        alt=""
                        width={16}
                        height={16}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </span>
                  <label style={{ color: "#03BB86" }}>
          
                    {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                  dashboardData?.funds_report?.incoming_funds?.total_amount
                            )}{" "}
                          </>
                        )}
                  </label>
                  <br />
                  <span>
                    Outgoing Funds{" "}
                    <span className="ps-1 pb-2">
                      <img
                        src={circle}
                        alt=""
                        width={16}
                        height={16}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </span>
                  <label style={{ color: "#D52C48" }}>
                  
    

                    {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                   dashboardData?.funds_report?.outgoing_funds?.total_amount
                            )}{" "}
                          </>
                        )}
                  </label>
                </div>
              </div>
              <div className="col-md-9">
                <div
                  style={{
                    position: "relative",

                    maxWidth: "100%",
                    height: "380px",
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
                        {skelitonLoading ? (
                          <ChartSkeleton value={17} />
                        ) : (
                          <ReactECharts
                          // ref={chartRef}
                            option={chartOptions}
                            style={{ width: "100%", height: "300px" }}
                          />
                        )}
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12" style={{ padding: "0px" }}>
            <div className="row stats-block onborading-stats">
              <div className="col-md-4">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <label>IBFT</label>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span>
                        Incoming{" "}
                        <span>
                          <img
                            src={circle}
                            alt=""
                            width={16}
                            height={16}
                            onClick={handleClick}
                            style={{ cursor: "pointer" }}
                          />
                        </span>
                      </span>
                      <label style={{ color: "#03BB86" }}>
   
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                   dashboardData?.ibft_report_card?.incoming
                            )}{" "}
                          </>
                        )}
                      </label>
                      <br />
                      <span>Avg Incoming</span>
                      <label style={{ color: "#03BB86" }}>
                        
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                  dashboardData?.ibft_report_card?.average_incoming
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span>Outgoing</span>
                      <label style={{ color: "#D52C48" }}>
          
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                  dashboardData?.ibft_report_card?.outgoing
                            )}{" "}
                          </>
                        )}
                      </label>
                      <br />
                      <span>Outgoing</span>
                      <label style={{ color: "#D52C48" }}>
                   
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                                dashboardData?.ibft_report_card?.average_outgoing
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <label>Games</label>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span>Incoming</span>
                      <label style={{ color: "#03BB86" }}>
                
                         
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                              dashboardData?.games_report_card?.incoming
                            )}{" "}
                          </>
                        )}
                      </label>
                      <br />
                      <span>Avg Incoming</span>
                      <label style={{ color: "#03BB86" }}>
                      
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                              dashboardData?.games_report_card?.average_incoming
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span>Outgoing</span>
                      <label style={{ color: "#D52C48" }}>
                       
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                              dashboardData?.games_report_card?.outgoing
                            )}{" "}
                          </>
                        )}
                      </label>
                      <br />
                      <span>Avg Outgoing</span>
                      <label style={{ color: "#D52C48" }}>
                       
                             {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                               dashboardData?.games_report_card?.average_outgoing ||
                                "0"
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <label>Services</label>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span>Incoming</span>
                      <label style={{ color: "#03BB86" }}>
          
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                               dashboardData?.services_report_card?.incoming ||
                                "0"
                            )}{" "}
                          </>
                        )}
                      </label>
                      <br />
                      <span>Avg Incoming</span>
                      <label style={{ color: "#03BB86" }}>
          

                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                       PKR{" "}
                            {NumberFormatter(
                              dashboardData?.services_report_card?.average_incoming ||
                                "0"
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    {/* <div className="av-time">
                      <span>Outgoing</span>
                      <label style={{ color: "#D52C48" }}>PKR 152,320 </label>
                      <br />
                      <span>Outgoing</span>
                      <label style={{ color: "#D52C48" }}>PKR 152,320 </label>
                    </div> */}
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
      <div className="ibft-tickets">
        <Ibft dashboardData={dashboardData} loading={skelitonLoading} />
      </div>
      <div className="outgoing-tickets">
        <OutgoingGames
          dashboardData={dashboardData}
          loading={skelitonLoading}
        />
      </div>
      <div className="ibft-tickets">
        <OutgoingServices
          dashboardData={dashboardData}
          loading={skelitonLoading}
        />
      </div>

      <div className="col-12 mt-3"></div>
    </div>
  );
};

export default IncomingOutgoingFund;

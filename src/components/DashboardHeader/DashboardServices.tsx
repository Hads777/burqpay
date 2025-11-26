import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

import icon5 from "../../assets/images/dashboardicon5.svg";
import { Tabs } from "antd";
import SkeletonLabel from "../SkeletonLabel";
import { NumberFormatter } from "../../utils/const.utils";
import ChartSkeleton from "../ChartSkeleton";

import { Images } from "../Config/Images";
import toast from "react-hot-toast";
import { getDashboardData, getGraphData } from "../../redux/apis/apisCrud";
import PackagesGraph from "../Dashboard/PackagesGraph";

const DashboardServices = (props: any) => {
  const [graphData, setGraphData] = useState<any>([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Citizens"); // State for active tab
  const popupRef = useRef(null); // Ref for the popup
  const { TabPane } = Tabs;
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [graphType, setGraphType] = useState<number>(1);
  const [graphDataAll, setGraphDataAll] = useState<{
    citizens: any[];
    residents: any[];
    visitors: any[];
  }>({
    citizens: [],
    residents: [],
    visitors: [],
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    getDataDashboard();
  }, []);
  useEffect(() => {
    getGraph(graphType);
  }, [graphType]);
  const getDataDashboard = async () => {
    setSkelitonLoading(true);
    try {
      const response = await getDashboardData();
      if (response) {
        // const [res1, res2, res3] = await Promise.all([
        //   getGraphData(1),
        //   getGraphData(2),
        //   getGraphData(3),
        // ]);
        setDashboardData(response?.data?.data);
        // setGraphDataAll({
        //   citizens: res1?.data.data || [],
        //   residents: res2?.data.data || [],
        //   visitors: res3?.data.data || [],
        // });
        setSkelitonLoading(false);
      }
    } catch (error: any) {
      setSkelitonLoading(false);
      setSkelitonLoading(true);
      toast.error(error?.message);
    }
  };
  const getGraph = async (type: any) => {
    try {
      setLoading(true);
      const response = await getGraphData(type);
      if (response) {
        setLoading(false);
        const [res1, res2, res3] = await Promise.all([
          getGraphData(1),
          getGraphData(2),
          getGraphData(3),
        ]);
        setGraphDataAll({
          citizens: res1?.data.data || [],
          residents: res2?.data.data || [],
          visitors: res3?.data.data || [],
        });
      }
    } catch (error: any) {
      setLoading(false);
      // toast.error(error?.message);
    }
  };
  const dates = graphDataAll.citizens.map((item) => item.date);

  const averageBarChartOptions = {
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Citizens",
        type: "bar",
        data: graphDataAll.citizens.map((item) => item.count),
        itemStyle: {
          color: graphType === 1 ? "#0B8443" : "rgba(11, 132, 67, 0.3)",
        },
        barWidth: "20%",
      },
      {
        name: "Residents",
        type: "bar",
        data: graphDataAll.residents.map((item) => item.count),
        itemStyle: {
          color: graphType === 2 ? "#0B8443" : "rgb(203, 202, 201)",
        },
        barWidth: "20%",
      },
      {
        name: "Visitors",
        type: "bar",
        data: graphDataAll.visitors.map((item) => item.count),
        itemStyle: {
          color: graphType === 3 ? "#0B8443" : "rgba(11,132,67,0.3)",
        },
        barWidth: "20%",
      },
    ],
    // legend: { show: true, selectedMode: false },
    tooltip: { trigger: "axis" },
    grid: {
      containLabel: true,
      left: "5%",
      right: "5%",
      bottom: "15%",
    },
  };
  const handleTabChange = (key) => {
    setActiveTab(key); // Update active tab
  };
  const handleButtonClick = (type: number) => {
    setGraphType(type);
  };

  const tabData = [
    {
      key: "Citizens",
      label: "Citizens",
      chartOptions: averageBarChartOptions,
      onClick: () => handleButtonClick(1),
    },
    {
      key: "Residents",
      label: "Residents",
      chartOptions: averageBarChartOptions,
      onClick: () => handleButtonClick(2),
    },
    {
      key: "Visitor",
      label: "Visitors",
      chartOptions: averageBarChartOptions,
      onClick: () => handleButtonClick(3),
    },
  ];
  return (
    <div className="dashboard">
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
            Total Onboarding
          </label>
          <Tabs
            defaultActiveKey="numbers"
            onChange={handleTabChange}
            tabBarStyle={{
              backgroundColor: "#6C727F", // Background color for the tabs
              borderRadius: "20px", // Border radius for the tabs
              padding: "8px", // Add padding for better spacing
              border: "none", // Remove the border
            }}
            tabBarGutter={16} // Add spacing between tabs
            renderTabBar={(props, DefaultTabBar) => (
              <DefaultTabBar
                {...props}
                style={{
                  borderRadius: "20px", // Ensure the active tab has rounded corners
                }}
              />
            )}
          >
            <TabPane
              tab={
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    backgroundColor: "#6C727F", // Default background color
                    color: "#FFFFFF", // Default text color
                  }}
                >
                  Numbers
                </span>
              }
              key="numbers"
            >
              {/* <ReactECharts
                option={numbersBarChartOptions}
                style={{ width: "100%", height: "300px" }}
              /> */}
            </TabPane>
            <TabPane
              tab={
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    backgroundColor: "#6C727F", // Default background color
                    color: "#FFFFFF", // Default text color
                  }}
                >
                  Average
                </span>
              }
              key="average"
            >
              <ReactECharts
                option={averageBarChartOptions}
                style={{ width: "100%", height: "300px" }}
              />
            </TabPane>
          </Tabs>
        </div>
      )}

      <div className="dash-onboarding board-services col-12 gap-3">
        {/* <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h4>
            Services <span className="on-view">View More</span>
          </h4>
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
        </div> */}

        <div className="row">
          <div className="col-md-12 px-2" style={{ padding: "5px" }}>
            <div className="row stats-block onborading-stats">
              <div className="col-md-4">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span className="img-span">
                      <img src={Images.amountIcon} alt="" />
                    </span>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Total Spent Amount</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span style={{ fontSize: "16px" }} className="pe-2">
                              SAR
                            </span>
                            {NumberFormatter(
                              dashboardData[0]?.total_spendings?.amount || "0"
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">No. of Transactions</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              dashboardData[0]?.total_spendings?.transactions ||
                                0
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
                    <span className="img-span">
                      <img src={Images.topup} alt="" />
                    </span>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Total Top-up Amount</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span style={{ fontSize: "16px" }} className="pe-2">
                              SAR
                            </span>
                            {NumberFormatter(
                              dashboardData[0]?.total_topups?.amount || 0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">
                        {/* <img
                          src={time}
                          alt=""
                          style={{ marginRight: "10px" }}
                        /> */}
                        No. of Transactions
                      </span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              dashboardData[0]?.total_topups?.transactions || 0
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
                    <span className="img-span">
                      <img src={Images.giftIcon} alt="" />
                    </span>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Memorial Gifts Spending</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span style={{ fontSize: "16px" }} className="pe-2">
                              SAR
                            </span>
                            {NumberFormatter(
                              dashboardData[0]?.memorial_gift?.amount || 0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">
                        {/* <img
                          src={time}
                          alt=""
                          style={{ marginRight: "10px" }}
                        /> */}
                        No. of Transactions
                      </span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              dashboardData[0]?.memorial_gift?.transactions || 0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row stats-block onborading-stats mt-3">
              <div className="col-md-6">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span className="img-span">
                      <img src={Images.airIcon} alt="" />
                    </span>
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Flight Booking Amount</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span style={{ fontSize: "16px" }} className="pe-2">
                              SAR
                            </span>
                            {NumberFormatter(
                              dashboardData[0]?.flight_booking?.amount || 0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">
                        {/* <img
                          src={time}
                          alt=""
                          style={{ marginRight: "10px" }}
                        /> */}
                        No. of Transactions
                      </span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              dashboardData[0]?.flight_booking?.transactions ||
                                0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tail-one">
                  <div className="onboard-tail">
                    <span className="img-span">
                      <img src={icon5} alt="" />
                    </span>
                    {/* <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={handleClick}
                      style={{ cursor: "pointer" }}
                    /> */}
                  </div>
                  <div className="onboard-tail">
                    <div className="av-time">
                      <span className="lite-h5">Hotel Booking Amount</span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span style={{ fontSize: "16px" }} className="pe-2">
                              SAR
                            </span>
                            {NumberFormatter(
                              dashboardData[0]?.hotel_booking?.amount || 0
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                    <div className="av-time">
                      <span className="lite-h5">
                        {/* <img
                          src={time}
                          alt=""
                          style={{ marginRight: "10px" }}
                        /> */}
                        No. of Transactions
                      </span>
                      <label>
                        {" "}
                        {skelitonLoading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              dashboardData[0]?.hotel_booking?.transactions || 0
                            )}{" "}
                          </>
                        )}
                      </label>
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
          <div className="col-md-12">
            <div className="row onboard-stats">
              <div className="col-md-3">
                <div className="onboarding-stats p-2 mt-3">
                  <span>Total Customers</span>
                  <label style={{ color: "#000000", fontSize: "28px" }}>
                    {skelitonLoading ? (
                      <SkeletonLabel /> // Show the skeleton loader while loading
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.customers?.total || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
                <div className="stats-values p-2 mt-3">
                  <span>
                    Citizens{" "}
                    <span className="ps-1 pb-2">
                      {/* <img
                        src={circle}
                        alt=""
                        width={16}
                        height={16}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      /> */}
                    </span>
                  </span>
                  <label style={{ color: "#000000", fontSize: "16px" }}>
                    {skelitonLoading ? (
                      <SkeletonLabel /> // Show the skeleton loader while loading
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.customers?.citizen || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                  <br />
                  <span>
                    Residents{" "}
                    <span className="ps-1 pb-2">
                      {/* <img
                        src={circle}
                        alt=""
                        width={16}
                        height={16}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      /> */}
                    </span>
                  </span>
                  <label style={{ color: "#000000", fontSize: "16px" }}>
                    {skelitonLoading ? (
                      <SkeletonLabel />
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.customers?.resident || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                  <br />
                  <span>
                    Visitors{" "}
                    <span className="ps-1 pb-2">
                      {/* <img
                        src={circle}
                        alt=""
                        width={16}
                        height={16}
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}
                      /> */}
                    </span>
                  </span>
                  <label style={{ color: "#000000", fontSize: "16px" }}>
                    {skelitonLoading ? (
                      <SkeletonLabel /> // Show the skeleton loader while loading
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.customers?.visitor || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="col-md-9" style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    transform: "rotate(-90deg)",
                    left: "-30px",
                    top: "50%",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {`${activeTab} Customers`}
                </div>

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
                      backgroundColor: "#0B8443",
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
                    {tabData.map((tab) => (
                      <TabPane
                        tab={
                          <span
                            style={{
                              display: "inline-block",
                              padding: "5px 20px",
                              borderRadius: "50px",
                              backgroundColor: "#CBCAC9",
                              color: "#666666",
                            }}
                            onClick={tab.onClick}
                          >
                            {tab.label}
                          </span>
                        }
                        key={tab.key}
                      >
                        {loading ? (
                          <div className="ps-4">
                            <ChartSkeleton value={17} />
                          </div>
                        ) : (
                          <ReactECharts
                            // ref={chartRef}
                            option={averageBarChartOptions}
                            style={{
                              width: "100%",
                              height: "350px",
                              paddingLeft: "14px",
                            }}
                          />
                        )}
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PackagesGraph/>
      </div>

      <div className="col-12 mt-3"></div>
    </div>
  );
};

export default DashboardServices;

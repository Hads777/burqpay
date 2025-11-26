import { Col, Card } from "antd";
import LineChart from "../Dashboard/LineChart";
import PieChart from "../Dashboard/PieChart";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Images } from "../Config/Images";
import { themeStyle } from "../Config/Theme";
import ReactECharts from "echarts-for-react";
import icon from "../../assets/images/Vector-11.png";
import circle from "../../assets/images/circle-icon.png";
import blackPrint from "../../assets/images/blac-print.png";
import { NumberFormatter } from "../../utils/const.utils";
import SkeletonLabel from "../SkeletonLabel";

const DashboardGame = (props: any) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [legends, setLegends] = useState<any>();
  const chartRef: any = useRef(null);

  const data = [
    { name: "Available", value: 4 },
    { name: "Locked", value: 6 },
    { name: "Pleadge", value: 0 },
  ];
  const totalTickets = data.reduce((sum, item) => sum + item.value, 0);

  const seriesData = [
    {
      symbolSize: 1,
      data: props?.dashboardData?.game_center?.pie_graph?.data?.map((day) => ({
        value: day?.amount,
        name: day?.name,
      })),

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
    color: ["#03BB86", "#D52C48"],
    tooltip: {
      trigger: "item",
    },
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: `Total \n${props?.dashboardData?.game_center?.total_reward_amount}`, // Display "Total Tickets" and the value
        fontSize: 12, // Font size for the text
        fontWeight: "bold",
        fill: "#333", // Text color
        textAlign: "center", // Center-align the text
        lineHeight: 15,
      },
    },
    series: seriesData,
  };

  // Bar chart configuration to be displayed in the tooltip
  const barChartOption = {
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: "bar",
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dash-onboarding game-center col-12 gap-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h4>
            Game Center <span className="on-view">View More</span>
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
        </div>
        <div className="row">
          {/* <div className="col-md-6">
            <div className="row onboard-stats">
              <div className="col-md-6">
                <div className="onboarding-stats">
                  <span>Avg Onboarding Time</span>
                  <label>120 sec</label>
                </div>
                <div className="stats-values">
                  <label>115,541</label>
                  <span>Total Onboardings</span>
                </div>
              </div>
              <div className="col-md-6">
                <ReactECharts
                  ref={chartRef}
                  option={systemPieGraph}
                  style={{ height: "212px", width: "100%" }}
                />
              </div>
            </div>
          </div> */}
          <div className="col-md-6">
            <div className="row onboard-stats">
              <div className="col-md-12">
                <div className="in-out-fund onboard-cash">
                  <div className="onboarding-stats">
                    <span>Avg Reward Amount</span>
                    <label>
                      {" "}
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.game_center?.average_reward
                          )}{" "}
                        </>
                      )}
                    </label>
                  </div>
                  <div className="onboarding-stats">
                    <span>No. of Game Played</span>
                    <label>
                      {" "}
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.game_center?.game_played
                          )}{" "}
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-7">
                    <div className="stats-values">
                      <span>Total Reward Amount</span>

                      <label>
                        {" "}
                        {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span className="pe-1">PKR</span>
                            {NumberFormatter(
                              props?.dashboardData?.game_center
                                ?.total_reward_amount
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <ReactECharts
                      ref={chartRef}
                      option={systemPieGraph}
                      style={{ height: "150px", width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row stats-block">
              <div className="col-md-12">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">Spin the Wheel Reward</span>
                    <label>
                      {" "}
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          <span className="pe-1">PKR</span>
                          {NumberFormatter(
                            props?.dashboardData?.game_center
                              ?.spin_the_wheel_stats?.total_reward_amount
                          )}{" "}
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <div
                      style={{
                        height: "30px",
                        lineHeight: "30px",
                        display: "block",
                        textAlign: "right",
                      }}
                    >
                      <img src={circle} alt="" width={16} height={16} />
                    </div>
                    <div className="avg-time">
                      <span className="lite-h5">Avg Spin the Wheel</span>
                      <label>
                        {" "}
                        {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              props?.dashboardData?.game_center
                                ?.spin_the_wheel_stats?.average_reward
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">barq Javelin Reward </span>
                    <label>
                      {" "}
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          <span className="pe-1">PKR</span>
                          {NumberFormatter(
                            props?.dashboardData?.game_center
                              ?.barq_javelin_stats?.total_reward_amount
                          )}{" "}
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <div
                      style={{
                        height: "30px",
                        lineHeight: "30px",
                        display: "block",
                        textAlign: "right",
                      }}
                    >
                      <img src={circle} alt="" width={16} height={16} />
                    </div>

                    <div className="avg-time">
                      <span className="lite-h5">Avg barq javelin</span>
                      <label>
                        {" "}
                        {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            {NumberFormatter(
                              props?.dashboardData?.game_center
                                ?.barq_javelin_stats?.average_reward
                            )}{" "}
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-3"></div>
    </div>
  );
};

export default DashboardGame;

import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import icon from "../../assets/images/Vector-11.png";
import circle from "../../assets/images/circle-icon.png";
import blackPrint from "../../assets/images/blac-print.png";
import SkeletonLabel from "../SkeletonLabel";
import { NumberFormatter } from "../../utils/const.utils";

const DashboardCash = (props: any) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [legends, setLegends] = useState<any>();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [graphValue, setGraphValue] = useState("");
  const popupRef = useRef(null); // Ref for the popup

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

  const barChartOptions = {
    xAxis: {
      type: "category",
      data: ["12", "13", "14", "15", "16", "17", "18"], // Days in Feb 2025
      nameLocation: "middle", // Position the label in the middle
      nameGap: 30, // Increase the gap between the label and the axis
    },
    yAxis: {
      type: "value",
      name: "Avg Time", // Y-axis label
    },
    series: [
      {
        name: "Series 1", // Name for the first set of bars
        data: [10, 20, 15, 25, 30, 22, 18], // Data for the first set of bars
        type: "bar",
        itemStyle: {
          color: "#03BB86", // Color for the first set of bars
        },
      },
      {
        name: "Series 2", // Name for the second set of bars
        data: [5, 15, 10, 20, 25, 18, 12], // Data for the second set of bars
        type: "bar",
        itemStyle: {
          color: "#D52C48", // Color for the second set of bars
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
    legend: {
      data: ["Series 1", "Series 2"], // Legend to differentiate the bars
      left: "left", // Position the legend on the left
      bottom: "bottom", // Position the legend at the bottom
      orient: "horizontal", // Display the legend vertically
      padding: 30, // Increase the gap between the label and the axis
    },
    grid: {
      containLabel: true, // Ensure labels fit within the chart
      left: "5%", // Add space on the left for the legend
      right: "5%",
      bottom: "15%", // Add space at the bottom for the x-axis label
    },
  };

  const handleClick = (value:any) => {
    setGraphValue(value)
    // setPopupVisible(!isPopupVisible); // Toggle popup visibility on click
  };

  const chartRef: any = useRef(null);

  const data = [
    { name: "Available", value: 4 },
    { name: "Locked", value: 6 },
    { name: "Pleadge", value: 0 },
  ];
  const transformPieData = (pie) => {
    if (!pie || typeof pie !== 'object') return [];
    return Object.entries(pie).map(([key, count]) => ({
      name: key.toUpperCase(),
      count,

    }));
  };
  
  const transformedData = transformPieData(props?.dashboardData?.funds?.pie);
  
  console.log(transformedData,"tranfss");

  const seriesData = [
    {
      symbolSize: 1,
 data: transformedData?.map((day) => ({
        value: day?.count,
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

  const seriesDataLite = [
    {
      symbolSize: 1,
      data: [
        props?.dashboardData?.funds?.user_type?.barq_lite?.pie?.outgoing,
        props?.dashboardData?.funds?.user_type?.barq_lite?.pie?.incoming,
      ],

      type: "pie",
      radius: ["60%", "80%"],
      center: isMobile ? ["50%", "50%"] : ["50%", "50%"],
      avoidLabelOverlap: false,

      emphasis: {
        disabled: false, // Disable hover effects
      },
      labelLine: {
        show: false,
      },
    },
  ];
  const systemPieGraphLite = {
    color: ["#D52C48", "#03BB86"],
    tooltip: {
      show: false, // Disable tooltip
    },
    series: seriesDataLite,
  };
  const seriesDataFlex = [
    {
      symbolSize: 1,
      data: [
        props?.dashboardData?.funds?.user_type?.barq_flex?.pie?.outgoing,
        props?.dashboardData?.funds?.user_type?.barq_flex?.pie?.incoming,
      ],

      type: "pie",
      radius: ["60%", "80%"],
      center: isMobile ? ["50%", "50%"] : ["50%", "50%"],
      avoidLabelOverlap: false,

      emphasis: {
        disabled: false, // Disable hover effects
      },
      labelLine: {
        show: false,
      },
    },
  ];
  const systemPieGraphFlex = {
    color: ["#D52C48", "#03BB86"],
    tooltip: {
      show: false, // Disable tooltip
    },
    series: seriesDataFlex,
  };
  const seriesDataPrime = [
    {
      symbolSize: 1,
      data: [
        props?.dashboardData?.funds?.user_type?.barq_prime?.pie?.outgoing,
        props?.dashboardData?.funds?.user_type?.barq_prime?.pie?.incoming,
      ],

      type: "pie",
      radius: ["60%", "80%"],
      center: isMobile ? ["50%", "50%"] : ["50%", "50%"],
      avoidLabelOverlap: false,

      emphasis: {
        disabled: false, // Disable hover effects
      },
      labelLine: {
        show: false,
      },
    },
  ];
  const systemPieGrapPrime = {
    color: ["#D52C48", "#03BB86"],
    tooltip: {
      show: false, // Disable tooltip
    },
    series: seriesDataPrime,
  };
  const seriesDataGuest = [
    {
      symbolSize: 1,
      data: [
        props?.dashboardData?.funds?.user_type?.barq_guest?.pie?.outgoing,
        props?.dashboardData?.funds?.user_type?.barq_guest?.pie?.incoming,
      ],

      type: "pie",
      radius: ["60%", "80%"],
      center: isMobile ? ["50%", "50%"] : ["50%", "50%"],
      avoidLabelOverlap: false,

      emphasis: {
        disabled: false, // Disable hover effects
      },
      labelLine: {
        show: false,
      },
    },
  ];
  const systemPieGraphGuest = {
    color: ["#D52C48", "#03BB86"],
    tooltip: {
      show: false, // Disable tooltip
    },
    series: seriesDataGuest,
  };
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
        text: `Total \n${props?.dashboardData?.funds?.pie?.outgoing+props?.dashboardData?.funds?.pie?.incoming||
          "0"
        }`, // Display "Total Tickets" and the value
        fontSize: 12, // Font size for the text
        fontWeight: "bold",
        fill: "#333", // Text color
        textAlign: "center", // Center-align the text
        lineHeight: 15,
      },
    },
    series: seriesData,
  };

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
            maxWidth: "530px",
            height: "380px",
            borderRadius: "16px",
          }}
        >
          <label className="label-tag">Barq Lite Cash in/Out</label>
          <ReactECharts
            option={barChartOptions}
            style={{ width: "100%", height: "350px" }}
          />
        </div>
      )}

      <div className="dash-onboarding cash-in-out col-12 gap-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h4>
            Incoming / Outgoing Funds<span className="on-view">View More</span>
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
          <div className="col-md-6">
            <div className="row onboard-stats">
              <div className="col-md-12">
                <div className="in-out-fund">
                  <div className="onboarding-stats">
                    <span>Avg Incoming</span>
                    <label>
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          <span>PKR</span>{" "}
                          {NumberFormatter(
                            props?.dashboardData?.funds?.incoming_ibft_funds
                              ?.average_incoming
                          )}{" "}
                        </>
                      )}
                    </label>
                  </div>
                  <div className="onboarding-stats">
                    <span>Avg Outgoing</span>
                    <label className="red-cash">
                    {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span>PKR</span>{" "}
                            {NumberFormatter(
                              props?.dashboardData?.funds?.outgoing_ibft_funds
                                ?.average_outgoing
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
                      <span>Total Cash in/out</span>
                      <label>
                        {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span>PKR</span>{" "}
                            {NumberFormatter(
                              props?.dashboardData?.funds?.incoming_ibft_funds
                                ?.incoming
                            )}{" "}
                          </>
                        )}
                        <label className="red-cash">
                        {props?.loading ? (
                          <SkeletonLabel /> // Show the skeleton loader while loading
                        ) : (
                          <>
                            <span>PKR</span>{" "}
                            {NumberFormatter(
                              props?.dashboardData?.funds?.outgoing_ibft_funds
                                ?.outgoing
                            )}{" "}
                          </>
                        )}
                        </label>
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
              <div className="col-md-6">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">Barq Lite Cash in/out</span>
                    <label>
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.funds?.user_type?.barq_lite
                              ?.incoming
                          )}{" "}
                          <label className="lite-red">
                            {NumberFormatter(
                              props?.dashboardData?.funds?.user_type?.barq_lite
                                ?.outgoing
                            )}
                          </label>
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={()=>{handleClick("lite")}} // Open popup on click
                      style={{ cursor: "pointer", marginBottom: "20px" }} // Add pointer cursor
                    />
                    <ReactECharts
                      ref={chartRef}
                      option={systemPieGraphLite}
                      style={{
                        height: "50px",
                        width: "100%",
                        margin: "0 auto",
                        marginRight: "0px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">barq Flex Volume</span>
                    <label>
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.funds?.user_type?.barq_flex
                              ?.incoming
                          )}{" "}
                          <label className="lite-red">
                            {NumberFormatter(
                              props?.dashboardData?.funds?.user_type?.barq_flex
                                ?.outgoing
                            )}
                          </label>
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={()=>{handleClick("flex")}} // Open popup on click
                      style={{ cursor: "pointer", marginBottom: "20px" }} // Add pointer cursor
                    />
                    <ReactECharts
                      ref={chartRef}
                      option={systemPieGraphFlex}
                      style={{
                        height: "50px",
                        width: "100%",
                        margin: "0 auto",
                        marginRight: "0px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">barq Prime Volume</span>
                    <label>
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.funds?.user_type?.barq_prime
                              ?.incoming
                          )}{" "}
                          <label className="lite-red">
                            {NumberFormatter(
                              props?.dashboardData?.funds?.user_type?.barq_prime
                                ?.outgoing
                            )}
                          </label>
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={()=>{handleClick("prime")}} // Open popup on click
                      style={{ cursor: "pointer", marginBottom: "20px" }} // Add pointer cursor
                    />
                    <ReactECharts
                      ref={chartRef}
                      option={systemPieGrapPrime}
                      style={{
                        height: "50px",
                        width: "100%",
                        margin: "0 auto",
                        marginRight: "0px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tail-one">
                  <div>
                    <span className="img-span">
                      <img src={icon} alt="" />
                    </span>

                    <span className="lite-h5">barq Guest</span>
                    <label>
                      {props?.loading ? (
                        <SkeletonLabel /> // Show the skeleton loader while loading
                      ) : (
                        <>
                          {NumberFormatter(
                            props?.dashboardData?.funds?.user_type?.barq_guest
                              ?.incoming
                          )}{" "}
                          <label className="lite-red">
                            {NumberFormatter(
                              props?.dashboardData?.funds?.user_type?.barq_guest
                                ?.outgoing
                            )}
                          </label>
                        </>
                      )}
                    </label>
                  </div>
                  <div>
                    <img
                      src={circle}
                      alt=""
                      width={16}
                      height={16}
                      onClick={()=>{handleClick("guest")}} // Open popup on click
                      style={{ cursor: "pointer", marginBottom: "20px" }} // Add pointer cursor
                    />
                    <ReactECharts
                      ref={chartRef}
                      option={systemPieGraphGuest}
                      style={{
                        height: "50px",
                        width: "100%",
                        margin: "0 auto",
                        marginRight: "0px",
                      }}
                    />
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

export default DashboardCash;

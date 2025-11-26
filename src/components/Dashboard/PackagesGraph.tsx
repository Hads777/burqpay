import { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Tabs } from "antd";
import SkeletonLabel from "../SkeletonLabel";
import { NumberFormatter } from "../../utils/const.utils";
import ChartSkeleton from "../ChartSkeleton";
import toast from "react-hot-toast";
import { getDashboardData, getGraphData, getGraphDataPackage } from "../../redux/apis/apisCrud";

const PackagesGraph = (props: any) => {
  const [graphData, setGraphData] = useState<any>([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Saudi");
  const popupRef = useRef(null);
  const { TabPane } = Tabs;
  const [dashboardData, setDashboardData] = useState<any>([]);
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [graphType, setGraphType] = useState<number>(1);
  const [graphDataAll, setGraphDataAll] = useState<any>()

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
    getGraph();
  }, []);
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
      toast.error(error?.message);
    }
  };
  const getGraph = async () => {
    try {
      setLoading(true);
      const response = await getGraphDataPackage();
      if (response) {
        setLoading(false);
        setGraphDataAll(response?.data?.data)
       console.log(response,"response12344")
      }
    } catch (error: any) {
      setLoading(false);
      // toast.error(error?.message);
    }
  };
  const averageBarChartOptions = {
    xAxis: {
      type: "category",
      data: graphDataAll?.map((item) => item?.date),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Full Payment",
        type: "bar",
        data: graphDataAll?.map((item) => item?.full_payment),
        itemStyle: {
          color: "#0B8443",
        },
        barWidth: "20%",
      },
      {
        name: "BNPL",
        type: "bar",
        data: graphDataAll?.map((item) => item?.bnpl),
        itemStyle: {
          color:  "#17578D",
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
  const handleButtonClick = (type: number) => {
    setGraphType(type);
  };

  return (
    <div className="dashboard">
      <div className="package-card mt-2">
        <div className="col-12 d-flex">
          <div className="col-4" style={{ padding: "15px" }}>
            <div className="onboarding-stats p-2 mt-3">
              <span>Total Packages Sold</span>
              <label style={{ color: "#000000", fontSize: "28px" }}>
                {skelitonLoading ? (
                  <SkeletonLabel />
                ) : (
                  <>
                    {NumberFormatter(dashboardData[0]?.packages?.total_sold || "0")}{" "}
                  </>
                )}
              </label>
            </div>
            <div className="d-flex p-2 col-12" style={{ marginTop: "100px" }}>
              <div className="col-6">
                <div
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Hajj Packages
                </div>
                <div className="mt-4">
                  <div className="col-12">Full Payment </div>
                  <label
                    className="mt-2"
                    style={{ color: "#000000", fontSize: "16px" }}
                  >
                    {skelitonLoading ? (
                      <SkeletonLabel /> // Show the skeleton loader while loading
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.packages?.hajj?.full_payment || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
                <div className="mt-2">
                  <div>
                    BNPL{" "}
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
                  </div>
                  <label
                    className="mt-2"
                    style={{ color: "#000000", fontSize: "16px" }}
                  >
                    {skelitonLoading ? (
                      <SkeletonLabel />
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.packages?.hajj?.bnpl || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div
                  style={{
                    color: "#000000",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Umrah Packages
                </div>
                <div className="mt-4">
                  <div className="col-12">Full Payment </div>
                  <label
                    className="mt-2"
                    style={{ color: "#000000", fontSize: "16px" }}
                  >
                    {skelitonLoading ? (
                      <SkeletonLabel /> // Show the skeleton loader while loading
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.packages?.umrah?.full_payment  || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
                <div className="mt-2">
                  <div>
                    BNPL{" "}
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
                  </div>
                  <label
                    className="mt-2"
                    style={{ color: "#000000", fontSize: "16px" }}
                  >
                    {skelitonLoading ? (
                      <SkeletonLabel />
                    ) : (
                      <>
                        {NumberFormatter(
                          dashboardData[0]?.packages?.umrah?.bnpl || "0"
                        )}{" "}
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8" style={{ padding: "5px" }}>
            <div
              className=""
              style={{
                position: "relative",
                background: "#CDE6D9",
                maxWidth: "100%",
                height: "380px",
                borderRadius: "0px 12px 12px 0px",
              }}
            >
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
               Packages Sold
              </div>

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
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-3"></div>
    </div>
  );
};

export default PackagesGraph;

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import moment from "moment";
interface CustomerData {
  name: string;
  Individual: number;
  Business: number;
}
const CustomBarChart = () => {
  const [data, setData] = useState([]);

  // const getCustomerDetail = async () => {
  //   try {
  //     const response = await getBuisnessAndIndividualCustomerGraph();
  //     if (response && response.data && response.data.data) {
  //       const { individualCustomerDates, businessCustomerDates } =
  //         response.data.data || 2;

  //       const combinedData: { [key: string]: CustomerData } = {};

  //       individualCustomerDates.forEach((date: string) => {
  //         const month = moment(date).format("MMMM");
  //         if (!combinedData[month]) {
  //           combinedData[month] = {
  //             name: month,
  //             Individual: 0,
  //             Business: 0,
  //           };
  //         }
  //         combinedData[month].Individual += 1;
  //       });

  //       businessCustomerDates.forEach((date: string) => {
  //         const month = moment(date).format("MMMM");
  //         if (!combinedData[month]) {
  //           combinedData[month] = {
  //             name: month,
  //             Individual: 0,
  //             Business: 0,
  //           };
  //         }
  //         combinedData[month].Business += 1;
  //       });
  //       const monthOrder = [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //         "August",
  //         "September",
  //         "October",
  //         "November",
  //         "December",
  //       ];

  //       // Convert combinedData to array and sort by correct month order
  //       const aggregatedData: any = Object.values(combinedData).sort((a, b) => {
  //         return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
  //       });

  //       setData(aggregatedData || 1);
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   }
  // };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  const getCustomerDetail = async () => {
    try {
      // Dummy data to simulate API response
      const individualCustomerDates = [
        "2024-01-15",
        "2024-02-20",
        "2024-03-22",
        "2024-04-10",
        "2024-05-05",
        "2024-06-18",
        "2024-07-18",
        "2024-08-18",
        "2024-09-10",
        "2024-10-10",
        "2024-11-10",
        "2024-12-10",
      ];
      const businessCustomerDates = [
        "2023-01-10",
        "2023-02-20",
        "2023-03-22",
        "2023-04-10",
        "2023-05-05",
        "2023-06-18",
        "2023-07-18",
        "2024-08-18",
        "2024-09-10",
        "2024-10-10",
        "2024-11-10",
        "2024-12-10",
        "2024-01-10",
        "2024-02-20",
        "2024-03-22",
        "2024-04-10",
        "2024-05-05",
        "2024-06-18",
        "2024-07-18",
        "2024-08-18",
        "2024-09-10",
        "2024-10-10",
        "2024-11-10",
        "2024-12-10",
      ];

      const combinedData: { [key: string]: CustomerData } = {};

      individualCustomerDates.forEach((date: string) => {
        const month = moment(date).format("MMMM");
        if (!combinedData[month]) {
          combinedData[month] = {
            name: month,
            Individual: 0,
            Business: 0,
          };
        }
        combinedData[month].Individual += 1;
      });

      businessCustomerDates.forEach((date: string) => {
        const month = moment(date).format("MMMM");
        if (!combinedData[month]) {
          combinedData[month] = {
            name: month,
            Individual: 0,
            Business: 0,
          };
        }
        combinedData[month].Business += 1;
      });

      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Convert combinedData to array and sort by correct month order
      const aggregatedData: CustomerData[] = Object.values(combinedData).sort(
        (a, b) => {
          return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
        }
      );

      setData(aggregatedData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  const CustomLegend = () => (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: "#000000",
            marginRight: 5,
          }}
        />
        <span>Individual</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: "#EB0D0D",
            marginRight: 5,
          }}
        />
        <span>Business</span>
      </div>
    </div>
  );
  return (
    <>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip cursor={false} />

            <Bar
              radius={[10, 10, 0, 0]}
              dataKey="Individual"
              fill={"#000000"}
            />
            <Bar radius={[10, 10, 0, 0]} dataKey="Business" fill={"#EB0D0D"} />
          </BarChart>
        </ResponsiveContainer>
        <CustomLegend />
      </div>
    </>
  );
};

export default CustomBarChart;

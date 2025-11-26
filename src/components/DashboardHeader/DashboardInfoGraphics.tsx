import { useEffect, useState } from "react";
import { Col, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { Images } from "../Config/Images";

import DashboardOnboarding from "./DashboardOnboarding";
import DashboardCash from "./DashboardCash";
import DashboardCashback from "./DashboardCashback";

const Dashboard = () => {
  const [customers, setCustomers] = useState<any>([]);
  const [allTypeCustomer, setAllTypeCustomer] = useState<any>();
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [loader, setLoader] = useState(false);
  const [ledgerData, setLedgerData] = useState<any>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const Customer_ALL_List_Header = [
    // {
    //   name: "Customer ID",
    //   selector: (row: { CustomerID: any }) => row.CustomerID.split("-")[0],
    // },
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
    },
    {
      name: "Type",
      selector: (row: { type: any }) => row.type,
    },
    {
      name: "Phone No.",
      selector: (row: { phoneNo: any }) => row.phoneNo,
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
    },
    {
      name: "Status",

      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "12px",
            backgroundColor: row.status
              ? "rgba(146, 188, 131, 1)"
              : "rgba(55, 52, 53, 1)",
            color: "rgba(255, 255, 255, 1)",
            cursor: row.status ? "pointer" : "default",
          }}
        >
          {row.status ? "Active" : "Inactive"}
        </div>
      ),
    },
  ];

  const mappedData =
    allTypeCustomer &&
    allTypeCustomer.map((item: any) => {
      return {
        CustomerID: item.customerId,
        name: item.name,
        type: item.type,
        phoneNo: item.phoneNo,
        email: item.email,
        status: item.status,
      };
    });

  const cardsData = customers
    ? [
        {
          title: "All Customers",
          value:
            customers.numberOfIndividualCustomers +
              customers.numberOfBusinessCustomers || 0,
          icon: <UserOutlined style={{ fontSize: "24px" }} />,
          subtitle1: "Individuals",
          value1: customers.numberOfIndividualCustomers || 0,
          subtitle2: "Business",
          value2: customers.numberOfBusinessCustomers || 0,
          cardType: "highlight",
        },
      ]
    : [];
  const loans = [
    {
      title: "Received Loans",
      value: "515,000",

      title1: "Non Performing Loans",
      value1: "255,000",
    },
    {
      title: "Receivable Loan",
      value: "365,000",

      title1: "Due Loans",
      value1: "135,000",
    },
    {
      title: "Early Settlements",
      value: "818,000",

      title1: "Over Due Loans",
      value1: "324,000",
    },
  ];
  const distributedAmount = [
    {
      title: "Total Disbursed Amount",
      value: "1,250,000",
      icon: <img src={Images.disburedIcon} alt="" />,
      extraInfo: "+12%",
      cardType: "default",
    },
  ];
  const producer = [
    {
      title: "Total Producers",
      value: "1,200",
      icon: (
        <svg
          filter="invert(1)"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 20H21.3334V22.6667H24M24 14.6667H21.3334V17.3333H24M26.6667 25.3333H16V22.6667H18.6667V20H16V17.3333H18.6667V14.6667H16V12H26.6667M13.3334 9.33333H10.6667V6.66667H13.3334M13.3334 14.6667H10.6667V12H13.3334M13.3334 20H10.6667V17.3333H13.3334M13.3334 25.3333H10.6667V22.6667H13.3334M8.00002 9.33333H5.33335V6.66667H8.00002M8.00002 14.6667H5.33335V12H8.00002M8.00002 20H5.33335V17.3333H8.00002M8.00002 25.3333H5.33335V22.6667H8.00002M16 9.33333V4H2.66669V28H29.3334V9.33333H16Z"
            fill="white"
          />
        </svg>
      ),
      cardType: "default",
    },
    {
      title: "Total Vendors",
      value: "204",
      icon: (
        <svg
          filter="invert(1)"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.3333 2.66602C25.687 2.66602 26.0261 2.80649 26.2762 3.05654C26.5262 3.30659 26.6667 3.64573 26.6667 3.99935V27.9993C26.6667 28.353 26.5262 28.6921 26.2762 28.9422C26.0261 29.1922 25.687 29.3327 25.3333 29.3327H6.66668C6.31305 29.3327 5.97392 29.1922 5.72387 28.9422C5.47382 28.6921 5.33334 28.353 5.33334 27.9993V3.99935C5.33334 3.64573 5.47382 3.30659 5.72387 3.05654C5.97392 2.80649 6.31305 2.66602 6.66668 2.66602H25.3333ZM24 5.33268H8.00001V26.666H24V5.33268ZM16 9.33268C17.4507 9.33252 18.8618 9.80556 20.0193 10.68C21.1768 11.5545 22.0175 12.7826 22.4138 14.1781C22.8101 15.5736 22.7404 17.0603 22.2153 18.4126C21.6902 19.7649 20.7383 20.909 19.504 21.6713L16.6667 15.9993H20C20 15.2082 19.7654 14.4349 19.3259 13.7771C18.8864 13.1193 18.2616 12.6066 17.5307 12.3038C16.7998 12.0011 15.9956 11.9219 15.2196 12.0762C14.4437 12.2305 13.731 12.6115 13.1716 13.1709C12.6122 13.7303 12.2312 14.4431 12.0769 15.219C11.9225 15.9949 12.0017 16.7992 12.3045 17.5301C12.6072 18.261 13.1199 18.8857 13.7777 19.3252C14.4355 19.7648 15.2089 19.9993 16 19.9993L17.2733 22.5447C16.8609 22.6247 16.4365 22.6651 16 22.666C14.2319 22.666 12.5362 21.9636 11.286 20.7134C10.0357 19.4632 9.33334 17.7675 9.33334 15.9993C9.33334 14.2312 10.0357 12.5355 11.286 11.2853C12.5362 10.0351 14.2319 9.33268 16 9.33268Z"
            fill="white"
          />
        </svg>
      ),
      cardType: "default",
    },
  ];
  return (
    <div className="dashboard">
      <div className="row">
        <DashboardOnboarding />
        <DashboardCash />
        <DashboardOnboarding />
        <DashboardCashback />
      </div>
    </div>
  );
};

export default Dashboard;

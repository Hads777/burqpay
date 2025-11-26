import { useEffect, useState } from "react";
import { Col, DatePicker, Select } from "antd";
import { FaFilter } from "react-icons/fa";
import toast from "react-hot-toast";
import TableView from "../../TableView/TableView";
import { Images } from "../../Config/Images";
import { activityLogsList, getWalletTopUp } from "../../../redux/apis/apisCrud";
import moment from "moment";

const WalletTopUp = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchWallet, setSearchWallet] = useState("");
  const [csvData, setCsvData] = useState<any>();
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      selector: (row: { Sr: any }) => row.Sr,
    },
    {
      name: "Transaction ID",
      selector: (row: { transaction_id: any }) => row.transaction_id,
      width: "200px",
    },
    // {
    //   name: "Reference No.",
    //   selector: (row: { name: any }) => row.name,
    //   width: "200px",
    // },
    {
      name: "Name",
      selector: (row: { mobile_no: any }) => row.mobile_no,
      width: "200px",
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
      width: "200px",
    },
    {
      name: "Mobile No.",
      selector: (row: { mobile_no: any }) => row.mobile_no,
      width: "150px",
    },
    {
      name: "Top-up Source",
      selector: (row: { top_Up_source: any }) => row.top_Up_source,
      width: "150px",
    },
    // {
    //   name: "IBAN",
    //   selector: (row: { top_Up_source: any }) => row.top_Up_source,
    // },
    // {
    //   name: "Bank Name",
    //   selector: (row: { top_Up_source: any }) => row.top_Up_source,
    //   width: "150px",
    // },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
    },
    // {
    //   name: "Transaction",
    //   selector: (row: { top_Up_source: any }) => row.top_Up_source,
    //   width: "150px",
    // },
    {
      name: "Date",
      selector: (row: { date: any }) => row.date,
      width: "180px",
    },
    {
      name: "Status",

      cell: (row: { status: any }) => (
        <div
          style={{
            padding: "8px 10px",

            borderRadius: "32px",

            fontSize: "12px",

            backgroundColor:
              row.status === "paid" ? "rgba(63, 195, 128, 0.9)" : "#F84D4D",

            color: "white",

            cursor: row.status === "paid" ? "pointer" : "default",
          }}
        >
          {row.status === "paid" ? "Paid" : "Unpaid"}
        </div>
      ),
    },
  ];
  let formatDateString = (date: moment.Moment) => {
    let str = date.format("YYYY-MM-DD");
    // Replace / with \/
    str = str.replace(/\//g, "\\/");
    return str;
  };

  const getList = async () => {
    const fromStr = fromDate ? formatDateString(fromDate) : "";
    const toStr = toDate ? formatDateString(toDate) : "";

    try {
      setSkelitonLoading(true);

      const response = await getWalletTopUp({
        search: searchWallet,
        page,
        pageSize,
        from: fromStr,
        to: toStr,
      });

      if (response) {
        const data = response?.data?.data;
        setData(data || []);
        setTotalRows(response?.data?.total || 0);
        setFrom(response?.data?.from || 0);
        setTo(response?.data?.to || 0);
        setPage(response?.data?.current_page);
        setTotalPage(response?.data?.last_page);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSkelitonLoading(false);
    }
  };
  const getCsv = async () => {
    const fromStr = fromDate ? formatDateString(fromDate) : "";
    const toStr = toDate ? formatDateString(toDate) : "";

    try {
      setSkelitonLoading(true);

      const response = await getWalletTopUp({
        search: searchWallet,
        page,
        pageSize,
        from: fromStr,
        to: toStr,
      });

      if (response) {
        const data = response?.data?.data;
        setCsvData(data);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setSkelitonLoading(false);
    }
  };

  useEffect(() => {
    getList();
    getCsv();
  }, [page, pageSize, fromDate, toDate, searchWallet]);

  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        Sr: index + from,
        transaction_id: item?.transaction_id || "----",
        mobile_no: item?.mobile_no || "----",
        name: item?.name || "----",
        amount: item?.amount || "----",
        date: item?.date || "----",
        status: item?.status || "----",
        email: item?.email || "----",
        top_Up_source: item?.top_Up_source || "----",
      };
    });
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      toast.error("No data to export.");
      return;
    }

    // Define CSV headers
    const headers = [
      "Transaction ID",
      "Name",
      "Email",
      "Mobile No",
      "Amount",
      "Date",
      "Status",
    ];

    // Convert data to CSV rows
    const rows = csvData.map((item: any) => [
      item.transaction_id || "----",
      item.name || "----",
      item.email || "----",
      item.mobile_no || "----",
      item.amount || "----",
      item.date || "----",
      item.status || "----",
    ]);

    // Combine headers and rows into a CSV string
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "wallet_topup_data.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="service">
      {/* <DashboardProfile /> */}

      <div
        className="d-flex 
        col-12 mb-3"
      >
        <div className="d-flex" style={{ flex: 1.25 }}>
          <Select
            mode="tags"
            style={{ borderTopRightRadius: "0px" }}
            placeholder="Filter"
            tokenSeparators={[","]}
            suffixIcon={<FaFilter />}
          />
        </div>
        <div className="d-flex gap-2 " style={{ flex: 6.75 }}>
          <div className="d-flex align-items-center gap-1 border px-2 ps-3 search-box">
            <img src={Images.searchIconGray} alt="" />
            <input
              type="text"
              onChange={(e: any) => {
                setSearchWallet(e.target.value);
              }}
              value={searchWallet}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              className="p-2"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="col-4 px-2 gap-2 d-flex ">
          <DatePicker
            className="date-picker "
            placeholder="From"
            style={{ width: "40%" }}
            value={fromDate}
            onChange={(date) => {
              setFromDate(date);
            }}
          />
          <DatePicker
            className="date-picker"
            style={{ width: "40%" }}
            placeholder="To"
            value={toDate}
            onChange={(date) => {
              setToDate(date);
            }}
          />
          <button
            className="theme-btn"
            onClick={() => {
              exportToCSV();
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      <TableView
        header={Activity_Loans_Header}
        data={mappedData}
        totalRows={totalRows}
        isLoading={skelitonLoading}
        from={from}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        to={to}
      />
    </div>
  );
};

export default WalletTopUp;

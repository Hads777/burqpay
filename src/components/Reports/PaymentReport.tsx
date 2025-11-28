import { useEffect, useState } from "react";
import { Button, DatePicker, Dropdown, Menu, Select } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import { DownOutlined } from "@ant-design/icons";

const { Option } = Select;

const dummyPayments = Array.from({ length: 93 }).map((_, index) => {
  const sl = index + 1;
  const isEven = sl % 2 === 0;
  return {
    id: sl,
    sl,
    customerName: "Ahmad Aziz",
    amount: isEven ? "SAR 100" : "SAR 54",
    paidAt: "15 Aug 2025 13:31 PM",
    gateway: "Visa",
    status: "Status",
    clearanceDate: "15 Aug 2025",
  };
});

const PaymentReports = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyPayments.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dummyPayments.length / pageSize)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setSkelitonLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyPayments.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
    setTotalPage(Math.ceil(totalRows / pageSize));
    setSkelitonLoading(false);
  }, [page, pageSize, totalRows]);

  const handleMenuClick = (key: string, row: any) => {
    // For now, just log – hook to navigation or actions later
    console.log("Action:", key, row);
  };

  const menuItems = [
    {
      key: "view",
      label: "View",
    },
  ];

  const menu = (row: any) => (
    <Menu onClick={({ key }) => handleMenuClick(key, row)} items={menuItems} />
  );

  const Activity_Loans_Header = [
    {
      name: "SL.",
      selector: (row: { sl: any }) => row.sl,
      sortable: true,
      width: "80px",
    },
    {
      name: "Customer Name",
      selector: (row: { customerName: any }) => row.customerName,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
    },
    {
      name: "Paid/Cancelled at",
      selector: (row: { paidAt: any }) => row.paidAt,
      sortable: true,
    },
    {
      name: "Gateway",
      selector: (row: { gateway: any }) => row.gateway,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1.2rem",
            borderRadius: "16px",
            backgroundColor: "#03BB86",
            color: "#ffffff",
            fontSize: "12px",
          }}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: "Clearance Date",
      selector: (row: { clearanceDate: any }) => row.clearanceDate,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            className="gradient-btn"
            type="primary"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderColor: "white",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Select <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="service">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 border px-3 search-box w-100">
            <img src={Images.searchIconGray} alt="" />
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              className="p-2 w-100"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <DatePicker placeholder="From" />
          <DatePicker placeholder="To" />
          <Select
            placeholder="Filters"
            style={{ minWidth: 130 }}
            suffixIcon={<FaFilter />}
          >
            <Option value="all">All</Option>
            <Option value="paid">Paid</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </div>
      </div>

      <TableView
        header={Activity_Loans_Header}
        data={tableData}
        totalRows={totalRows}
        isLoading={skelitonLoading}
        from={from}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
        to={to}
      />
    </div>
  );
};

export default PaymentReports;

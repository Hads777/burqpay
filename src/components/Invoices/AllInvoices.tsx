import React, { useEffect, useState } from "react";
import { Button, DatePicker, Dropdown, Select } from "antd";
import { FaFilter } from "react-icons/fa";
import TableView from "../TableView/TableView";
import { Images } from "../Config/Images";
import arrowDown from "../../assets/images/arrow-down.png";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const dummyInvoices = Array.from({ length: 30 }).map((_, index) => {
  const id = index + 1;
  return {
    id,
    name: id % 2 === 0 ? "Imran Khan" : "Muhammad Ali",
    purpose: id % 2 === 0 ? "Payment" : "One bill check",
    amount: id % 2 === 0 ? "SAR 100" : "SAR 51",
    issueDate: "15 Aug 2025",
    dueDate: "15 Aug 2025",
    status: "Status",
  };
});

const AllInvoices = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyInvoices.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyInvoices.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
  }, [page, pageSize]);

  const totalPage = Math.ceil(totalRows / pageSize);

  const handleMenuClick = (key: string, row: any) => {
    if (key === "view") {
      navigate(`/Invoices/InvoiceDetail/ViewInvoice`);
    }
  };

  const getMenuItems = (row: any) => [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "View",
      onClick: () => handleMenuClick("view", row),
    },
  ];
  const Invoice_Header = [
    {
      name: "ID",
      selector: (row: { id: any }) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row: { purpose: any }) => row.purpose,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
    },
    {
      name: "Issue Date",
      selector: (row: { issueDate: any }) => row.issueDate,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row: { dueDate: any }) => row.dueDate,
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
      name: "Action",
      cell: (row: any) => (
        <Dropdown menu={{ items: getMenuItems(row) }} trigger={["click"]}>
        <Button
          className="gradient-btn"
          type="primary"
          style={{
            backgroundColor: "#000000 !important",
            color: "#000000",
            borderColor: "white",
            borderRadius: "8px",
            padding: "10px 20px",
          }}
        >
          Select <img src={arrowDown} alt="" />
        </Button>
      </Dropdown>
      ),
    },
  ];

  return (
    <div className="service">
      <div className="d-flex justify-content-end align-items-center mb-3">
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
          onClick={() => navigate("/Invoices/CreateInvoice")}
        >
          Create Invoice
        </Button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div className="flex-grow-1 me-3">
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
            <Option value="unpaid">Unpaid</Option>
          </Select>
        </div>
      </div>

      <TableView
        header={Invoice_Header}
        data={tableData}
        totalRows={totalRows}
        from={from}
        to={to}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        totalPage={totalPage}
        isLoading={false}
      />
    </div>
  );
};

export default AllInvoices;

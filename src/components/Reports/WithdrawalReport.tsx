import React, { useEffect, useState } from "react";
import { DatePicker, Select } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";

const { Option } = Select;

const dummyWithdrawals = Array.from({ length: 93 }).map((_, index) => {
  const sl = index + 1;
  return {
    id: sl,
    sl,
    merchantName: "Eco Star",
    requestDate: "10/08/2025",
    paymentDate: "10/09/2025",
    amount: "PKR 5,000",
    transactionId: "65431198",
    status: "Paid",
  };
});

const WithdrawalReport: React.FC = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyWithdrawals.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dummyWithdrawals.length / pageSize)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setSkelitonLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyWithdrawals.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
    setTotalPage(Math.ceil(totalRows / pageSize));
    setSkelitonLoading(false);
  }, [page, pageSize, totalRows]);

  const Withdrawal_Header = [
    {
      name: "Sr No.",
      selector: (row: { sl: any }) => row.sl,
      sortable: true,
      width: "80px",
    },
    {
      name: "Merchant Name",
      selector: (row: { merchantName: any }) => row.merchantName,
      sortable: true,
    },
    {
      name: "Request Date",
      selector: (row: { requestDate: any }) => row.requestDate,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row: { paymentDate: any }) => row.paymentDate,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
    },
    {
      name: "Transaction ID",
      selector: (row: { transactionId: any }) => row.transactionId,
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
            <Option value="pending">Pending</Option>
          </Select>
        </div>
      </div>

      <TableView
        header={Withdrawal_Header}
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

export default WithdrawalReport;

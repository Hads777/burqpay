import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import { FaFilter } from "react-icons/fa";
import TableView from "../TableView/TableView";
import { Images } from "../Config/Images";

const { Option } = Select;

// Dummy beneficiary data
const dummyBeneficiaries = Array.from({ length: 93 }).map((_, index) => {
  const id = index + 1;
  const bankName = "Meezan Bank";
  const accountTitle = id % 2 === 0 ? "Ahmad Aziz" : "Ahmad Khan";
  const accountNumberIban = "SA00HABB00245454545464";
  const environment = "Cool";
  const isVerified = id % 3 === 0 ? "Yes" : "No";
  const createdAt = "26/09/2025";

  return {
    id,
    bankName,
    accountTitle,
    accountNumberIban,
    environment,
    isVerified,
    createdAt,
  };
});

const InstantTransfer: React.FC = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyBeneficiaries.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dummyBeneficiaries.length / pageSize)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setSkelitonLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyBeneficiaries.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
    setTotalPage(Math.ceil(totalRows / pageSize));
    setSkelitonLoading(false);
  }, [page, pageSize, totalRows]);

  const beneficiaryHeader = [
    {
      name: "Bank Name",
      selector: (row: { bankName: string }) => row.bankName,
      sortable: true,
    },
    {
      name: "Account Title",
      selector: (row: { accountTitle: string }) => row.accountTitle,
      sortable: true,
    },
    {
      name: "Account Number/IBAN",
      selector: (row: { accountNumberIban: string }) => row.accountNumberIban,
      sortable: true,
    },
    {
      name: "Environment",
      selector: (row: { environment: string }) => row.environment,
      sortable: true,
    },
    {
      name: "Is Verified",
      selector: (row: { isVerified: string }) => row.isVerified,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: { createdAt: string }) => row.createdAt,
      sortable: true,
    },
    {
      name: "Action",
      cell: () => (
        <Button
          size="small"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            borderRadius: 6,
            border: "none",
            padding: "0 16px",
          }}
        >
          Select
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="service">
      {/* Top action buttons */}
      <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
        <Button
          style={{
            borderRadius: "6px",
            padding: "6px 18px",
            borderColor: "#D9D9D9",
          }}
        >
          Export CSV
        </Button>
        <Button
          style={{
            borderRadius: "6px",
            padding: "6px 18px",
            borderColor: "#D9D9D9",
          }}
        >
          Bulk Import
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "6px 18px",
          }}
        >
          Add Beneficiary
        </Button>
      </div>

      {/* Search and filters row */}
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
            <Option value="verified">Verified</Option>
            <Option value="unverified">Unverified</Option>
          </Select>
        </div>
      </div>

      {/* Table */}
      <TableView
        header={beneficiaryHeader}
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

export default InstantTransfer;

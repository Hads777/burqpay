import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import TableView from "../TableView/TableView";
import { Images } from "../Config/Images";
import { FaFilter } from "react-icons/fa";

const { Option } = Select;

const dummyBatches = Array.from({ length: 93 }).map((_, index) => {
  const id = index + 1;
  const maker = id % 2 === 0 ? "Imran Khan" : "Muhammad Ali";
  return {
    id,
    batchNo: "BN-20241101160051-6724b4e36b06f",
    maker,
    approver: "Pending",
    batchTitle: "Test",
    amount: "SAR 0",
    disbursedAmount: "SAR 0",
  };
});

const BulkDisbursement: React.FC = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows] = useState(dummyBatches.length);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(pageSize, totalRows));
  const [totalPage, setTotalPage] = useState(
    Math.ceil(dummyBatches.length / pageSize)
  );
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    setSkelitonLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    setTableData(dummyBatches.slice(start, end));
    setFrom(start + 1);
    setTo(Math.min(end, totalRows));
    setTotalPage(Math.ceil(totalRows / pageSize));
    setSkelitonLoading(false);
  }, [page, pageSize, totalRows]);

  const Bulk_Header = [
    {
      name: "Batch No",
      selector: (row: { batchNo: any }) => row.batchNo,
      sortable: true,
    },
    {
      name: "Maker",
      selector: (row: { maker: any }) => row.maker,
      sortable: true,
    },
    {
      name: "Approver",
      selector: (row: { approver: any }) => row.approver,
      sortable: true,
    },
    {
      name: "Batch Title",
      selector: (row: { batchTitle: any }) => row.batchTitle,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
    },
    {
      name: "Disbursed Amount",
      selector: (row: { disbursedAmount: any }) => row.disbursedAmount,
      sortable: true,
    },
  ];

  return (
    <div className="service">
      <div className="d-flex justify-content-end align-items-center mb-3">
        {/* <h4 className="mb-0 fw-bold">Bulk Disbursement List</h4> */}
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
        >
          Add Bulk Disbursement
        </Button>
      </div>

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
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
          </Select>
        </div>
      </div>

      <TableView
        header={Bulk_Header}
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

export default BulkDisbursement;

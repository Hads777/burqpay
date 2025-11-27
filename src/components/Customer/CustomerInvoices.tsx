import React, { useState } from "react";
import TableView from "../TableView/TableView";

export default function CustomerInvoices() {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const dummyData = [
    { id: 1, amount: "SAR.51", createdDate: "10/08/2025", status: "Paid" },
    { id: 2, amount: "SAR.50", createdDate: "10/08/2025", status: "Paid" },
    { id: 3, amount: "SAR.51", createdDate: "10/08/2025", status: "Paid" },
    { id: 4, amount: "SAR.50", createdDate: "10/08/2025", status: "Paid" },
  ];

  const CustomerInvoices_Header = [
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row: { createdDate: any }) => row.createdDate,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "12px",
            backgroundColor: "#06C167",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          {row.status || "Paid"}
        </div>
      ),
    },
  ];

  // Initialize table data with dummy records
  React.useEffect(() => {
    setTableData(dummyData);
    setTotalRows(dummyData.length);
    setFrom(1);
    setTo(dummyData.length);
    setTotalPage(1);
  }, []);

  const mappedData =
    tableData &&
    tableData?.map((item: any) => {
      return {
        id: item.id,
        amount: item?.amount || "--------",
        createdDate: item?.createdDate || "--------",
        status: item?.status || "Paid",
      };
    });

  return (
    <div className="service customer-list-page">
      <TableView
        header={CustomerInvoices_Header}
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
}

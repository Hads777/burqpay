import { useState, useEffect } from "react";
import { Select, DatePicker } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import Loader from "../Loader/Loader";

const IbftLedger = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalRows, setTotalRows] = useState(93);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(30);
  const [totalPage, setTotalPage] = useState(4);

  // Dummy data matching the design
  const dummyLedgerData = [
    {
      id: 1,
      sl: "00001",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
    {
      id: 2,
      sl: "00002",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
    {
      id: 3,
      sl: "00001",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
    {
      id: 4,
      sl: "00002",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
    {
      id: 5,
      sl: "00001",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
    {
      id: 6,
      sl: "00002",
      transactionId: "1755246645",
      idValue: "ID-1755246645",
      bulkDisbBatchNo: "No-00015454664",
      customerName: "Ahmad Aziz",
      accountNumber: "548787987897987987",
      bankName: "Meezan",
    },
  ];

  // Initialize table data with dummy records
  useEffect(() => {
    setTableData(dummyLedgerData as any[]);
    setTotalRows(93);
    setFrom(1);
    setTo(30);
    setTotalPage(4);
  }, []);

  // Table headers configuration
  const ibftLedgerHeaders = [
    {
      name: "SL.",
      selector: (row: { sl: any }) => row.sl,
      sortable: true,
      width: "100px",
    },
    {
      name: "Transaction ID",
      selector: (row: { transactionId: any }) => row.transactionId,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row: { idValue: any }) => row.idValue,
      sortable: true,
    },
    {
      name: "Bulk Disb. BatchNo",
      selector: (row: { bulkDisbBatchNo: any }) => row.bulkDisbBatchNo,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row: { customerName: any }) => row.customerName,
      sortable: true,
    },
    {
      name: "Account Number",
      selector: (row: { accountNumber: any }) => row.accountNumber,
      sortable: true,
    },
    {
      name: "Bank N",
      selector: (row: { bankName: any }) => row.bankName,
      sortable: true,
    },
  ];

  const mappedData =
    tableData &&
    tableData?.map((item: any, index: any) => {
      return {
        id: item.id || index + 1,
        sl: item?.sl || "",
        transactionId: item?.transactionId || "",
        idValue: item?.idValue || "",
        bulkDisbBatchNo: item?.bulkDisbBatchNo || "",
        customerName: item?.customerName || "",
        accountNumber: item?.accountNumber || "",
        bankName: item?.bankName || "",
      };
    });

  return (
    <div className="service customer-list-page">
      {skelitonLoading && <Loader />}
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
   
      </div>

      {/* Search and Filter Section */}
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
          />
        </div>
      </div>

      {/* Table Section */}
      <TableView
        header={ibftLedgerHeaders}
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

export default IbftLedger;



import { useState } from "react";
import { Button, Dropdown, Menu, Select, DatePicker } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
// import {
//   allCustomerStatusChange,
//   customersList,
// } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import arrowDown from "../../assets/images/arrow-down.png";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/rootReducer";
import PaymentGatewayEdit from "./PaymentGatewayEdit";

const PaymentGateway = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const navigate = useNavigate();
  const permissionData = useSelector((state: RootState) => state.block.permissions);
  const hasAccess = (moduleName: string, permissionName?: string): boolean => {
    if (!permissionData || !permissionData.modules) return false;
  
    const module = permissionData.modules.find((m) => m.name === moduleName);
    if (!module) return false;
  
    if (!permissionName) return true;
  
    return (module.permissions || []).some((p) => p.name === permissionName);
  };
  const handleMenuClick = (key: string, data: any) => {
    setSelectedItem(key);
    setEditingRow(data);

    if (key === "edit") {
      // Switch to edit component view
      setEditingRow(data);
    }
  };

  const menu = (row: any) => {
    return (
      <Menu>
        <Menu.Item
          key="edit"
          icon={<EditOutlined />}
          onClick={() => handleMenuClick("edit", row)}
        >
          Edit
        </Menu.Item>
      </Menu>
    );
  };
  // Dummy records for the Payment Gateway listing – matches design (Sr No, Name, Status, Action)
  const dummyUserMapped = [
    {
      id: 1,
      srNo: "01",
      name: "Visa",
      status: "Active",
    },
    {
      id: 2,
      srNo: "02",
      name: "Master",
      status: "Active",
    },
    {
      id: 3,
      srNo: "01",
      name: "Visa",
      status: "Active",
    },
    {
      id: 4,
      srNo: "02",
      name: "Master",
      status: "Active",
    },
    {
      id: 5,
      srNo: "01",
      name: "Visa",
      status: "Active",
    },
    {
      id: 6,
      srNo: "02",
      name: "Master",
      status: "Active",
    },
  ];

  // Table headers – match design (Sr. No, Name, Status, Action)
  const Activity_Loans_Header = [
    {
      name: "Sr No.",
      selector: (row: { srNo: string }) => row.srNo,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: { status: string }) => row.status,
      sortable: true,
      cell: (row: { status: string }) => (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 18px",
            borderRadius: "999px",
            backgroundColor: "#00C896",
            color: "#ffffff",
            fontSize: "12px",
            minWidth: "80px",
            textTransform: "capitalize",
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      sortable: false,
      right: true,
      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "#111827",
              color: "#fff",
              background: "#111827",
            }}
            type="primary"
          >
            <span style={{ flex: 1, textAlign: "left" }}>Select</span>
            <img src={arrowDown} alt="More" style={{ marginLeft: 8 }} />
          </Button>
        </Dropdown>
      ),
    },
  ];
  // Initialize table data with dummy records (no API call)
  useState(() => {
    setTableData(dummyUserMapped as any[]);
    setTotalRows(dummyUserMapped.length);
    setFrom(1);
    setTo(dummyUserMapped.length);
    setTotalPage(1);
    return dummyUserMapped;
  });

  const mappedData =
    tableData &&
    tableData?.map((item: any, index: any) => {
      return {
        id: item.id || index + 1,
        srNo: item?.srNo || "",
        name: item?.name || "",
        status: item?.status || "Active",
      };
    });
  const handleSubmitBank = (values: any) => {
    // For now just show a toast; integrate API later
    toast.success("Payment gateway updated successfully");
  };

  // If an editing row is selected, show the standalone edit component instead of the table
  if (editingRow) {
    return (
      <PaymentGatewayEdit
        initialData={editingRow}
        onCancel={() => setEditingRow(null)}
        onSave={() => setEditingRow(null)}
      />
    );
  }

  return (
    <div className="service customer-list-page">
      {skelitonLoading && <Loader />}
      <div className="d-flex justify-content-between align-items-center mb-3"></div>

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

export default PaymentGateway;

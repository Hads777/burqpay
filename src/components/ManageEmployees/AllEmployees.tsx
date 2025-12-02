import { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Menu,
  Select,
  DatePicker,
} from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import arrowDown from "../../assets/images/arrow-down.png";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllEmployees = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalRows, setTotalRows] = useState(93);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(30);
  const [totalPage, setTotalPage] = useState(4);

  const navigate = useNavigate();

  const handleMenuClick = (key: string, data: any) => {
    if (key === "edit") {
      // Navigate to edit page
      navigate(`/ManageEmployees/Edit/${data.id || data.sl}`);
    } else if (key === "delete") {
      // Handle delete action
      console.log("Delete employee:", data);
      toast.success("Employee deleted successfully");
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
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          onClick={() => handleMenuClick("delete", row)}
          danger
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  // Dummy data matching the design
  const dummyEmployees = [
    {
      id: 1,
      sl: "12345",
      name: "Muhammad Ali",
      email: "mali@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 2,
      sl: "12345",
      name: "Imran Khan",
      email: "imrankhan@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 3,
      sl: "12345",
      name: "Muhammad Ali",
      email: "mali@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 4,
      sl: "12345",
      name: "Imran Khan",
      email: "imrankhan@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 5,
      sl: "12345",
      name: "Muhammad Ali",
      email: "mali@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 6,
      sl: "12345",
      name: "Imran Khan",
      email: "imrankhan@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 7,
      sl: "12345",
      name: "Muhammad Ali",
      email: "mali@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 8,
      sl: "12345",
      name: "Imran Khan",
      email: "imrankhan@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 9,
      sl: "12345",
      name: "Muhammad Ali",
      email: "mali@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
    {
      id: 10,
      sl: "12345",
      name: "Imran Khan",
      email: "imrankhan@email.com",
      phone: "501236666",
      createdDate: "10/08/2025",
      permissions: "Edit / Delete",
      status: "active",
    },
  ];

  // Initialize table data with dummy records
  useEffect(() => {
    setTableData(dummyEmployees as any[]);
    setTotalRows(93);
    setFrom(1);
    setTo(30);
    setTotalPage(4);
  }, []);

  // Table headers configuration
  const employeeTableHeaders = [
    {
      name: "SL",
      selector: (row: { sl: any }) => row.sl,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row: { createdDate: any }) => row.createdDate,
      sortable: true,
    },
    {
      name: "Permissions",
      selector: (row: { permissions: any }) => row.permissions,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "20px",
            backgroundColor: "#03BB86",
            color: "#ffffff",
            cursor: "pointer",
            display: "inline-block",
            fontSize: "14px",
          }}
        >
          Status
        </div>
      ),
    },
    {
      name: "Action",
      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
              borderColor: "#000000",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Select <img src={arrowDown} alt="" style={{ marginLeft: 8 }} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const mappedData =
    tableData &&
    tableData?.map((item: any, index: any) => {
      return {
        id: item.id || index + 1,
        sl: item?.sl || "",
        name: item?.name || "",
        email: item?.email || "",
        phone: item?.phone || "",
        createdDate: item?.createdDate || "",
        permissions: item?.permissions || "",
        status: item?.status || "active",
      };
    });

  return (
    <div className="service customer-list-page">
      {skelitonLoading && <Loader />}
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-bold" style={{ fontSize: "24px" }}>
          Employee List
        </h4>
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
          onClick={() => {
            navigate("/ManageEmployees/Create");
          }}
        >
          Add Employee
        </Button>
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
        header={employeeTableHeaders}
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

export default AllEmployees;


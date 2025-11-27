import { useState } from "react";
import {
  Button,
  Dropdown,
  Menu,
  Select,
  Modal,
  Input,
  Form,
  DatePicker,
} from "antd";
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
import MaskedValue from "../MaskedValue";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const AllCustomers = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rowData, setRowData] = useState<any>({});
  const navigate = useNavigate();
  const permissionData = useSelector((state: RootState) => state.block.permissions);
  const hasAccess = (moduleName: string, permissionName?: string): boolean => {
    if (!permissionData || !permissionData.modules) return false;
  
    const module = permissionData.modules.find((m) => m.name === moduleName);
    if (!module) return false;
  
    if (!permissionName) return true;
  
    return (module.permissions || []).some((p) => p.name === permissionName);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = (key: string, data: any) => {
    console.log(data, "dataa");
    setSelectedItem(key);
    setRowData(data);

    if (key === "edit") {
      navigate(`/Customers/AllCustomers/Edit/${data.id || data.user_id}`);
    }
    if (key === "details") {
      navigate(`/Customers/AllCustomers/Details/${data.id || data.user_id}`);
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
          key="details"
          icon={<i className="bi bi-info-circle" />}
          onClick={() => handleMenuClick("details", row)}
        >
          Details
        </Menu.Item>
      </Menu>
    );
  };
  const dummyUserMapped = [
    {
      user_id: "1",
      name: "Ali Raza",
      phone: "03001234567",
      cnic: "35202-1234567-1",
      accountBalance: "150000",
      UpdatedBy: "2024-05-06 09:30:00", // Register Date
      accountType: "Savings",
      accountStatus: "active",
    },
    {
      user_id: "2",
      name: "Sara Ahmed",
      phone: "03111234567",
      cnic: "35202-1234567-2",
      accountBalance: "35000",
      UpdatedBy: "2024-05-05 14:20:00",
      accountType: "Current",
      accountStatus: "inactive",
    },
    {
      user_id: "3",
      name: "Faisal Khan",
      phone: "03211234567",
      cnic: "35202-1234567-3",
      accountBalance: "56000",
      UpdatedBy: "2024-05-04 10:10:00",
      accountType: "Business",
      accountStatus: "active",
    },
  ];

  // Close popup when clicking outside
  const Activity_Loans_Header = [
    {
      name: "Consumer ID",
      sortable: true,
      cell: (row: any) => (
        <div
        // onClick={() => {
        //   navigate(`/Customers/CustomerDetails/${row.user_id}`);
        // }}
        >
          {row.customer_id}
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row: { created_at: any }) => row.created_at,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "12px",
            backgroundColor:
              row.accountStatus === 1
                ? "#03BB86" : row.accountStatus === 2 ? "#9C9C9C" :
               
        
                 "red",
            color: "#ffffff",
            cursor: row.accountStatus === 1 ? "pointer" : "default",
          }}
        >
          {row.accountStatus == 1 ? "Active":row.accountStatus == 2 ?"Pending" : "Inactive"}
        </div>
      ),
    },
    {
      name: "No. of Invoices",
      selector: (row: { invoices: any }) => row.invoices || 0,
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
        id: item.id,
        user_id: index + 1,
        name: item?.name || item?.full_name || "--------",
        phone: item?.phone || "--------",
        cnic: item?.cnic || "--------",
        email: item?.email || "--------",
        customer_id: item?.customer_id || "--------",
        accountType: item?.user_type_name,
        accountStatus: item?.status || 1,
        created_at: item?.created_at || "--------",
        invoices: item?.invoices_count || 0,
      };
    });
  console.log(rowData, "rowData");
  return (
    <div className="service customer-list-page">
      {skelitonLoading && <Loader />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 fw-bold"></h4>
        <Button
          type="primary"
          style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
          onClick={() => navigate("/Customers/AllCustomers/CreateCustomer")}
        >
          Add Customer
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
          />
        </div>
      </div>

      <Modal
        className="custom-mod"
        title=""
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <div className={selectedItem === "edit" ? "cust-drop" : "Ente-details"}>
          <Form>
            <Form.Item name="username">
              <div className="custom-input-container">
                <label className="input-label">Username</label>
                <Input placeholder="Enter your username" />
              </div>
            </Form.Item>
            <Form.Item name="password">
              <div className="custom-input-container">
                <label className="input-label">Password</label>
                <Input.Password placeholder="Enter your password" />
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
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

export default AllCustomers;

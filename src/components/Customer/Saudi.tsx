import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Menu, Select, Tabs, Modal, Input, Form } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  allCustomerStatusChange,
  customersList,
} from "../../redux/apis/apisCrud";
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

const Saudi = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDetailsFields, setShowDetailsFields] = useState(false);
  const [status, setStatus] = useState("Active");
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
  const handleOk = () => {
    // Handle save logic here
    console.log("Selected Status:", status);
    if (selectedItem === "details") {
      console.log("Username and password submitted");
    }
    setIsModalVisible(false);
    setShowDetailsFields(false); // Reset the fields visibility
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowDetailsFields(false); // Reset the fields visibility
  };

  const handleStatusChange = async (value: any) => {
    setStatus(value);

    try {
      const body = {
        _method: "put",
        status: value?.accountStatus,
      };
      await toast.promise(
        allCustomerStatusChange(body,value.id), // The promise to track
        {
          loading: "Changing Status...", // Loading state message
          success: (res) => {
            if (res?.data?.success) {
              setIsModalVisible(false);
              getList();
              return res?.data?.message;
            } else if (res?.data?.errors) {
              throw new Error(res.data.errors[0]); // Force error handling
            }
          },
          error: (err) => {
            console.error("Error occurred:", err);
            return err?.message || "Something went wrong!";
          },
        }
      );
    } catch (error: any) {
      console.error("Error during login:", error);
    }
  };

  const toggleDetailsFields = () => {
    setShowDetailsFields(!showDetailsFields);
  };
  const handleMenuClick = (key: string, data: any) => {
    console.log(data,"dataa")
    setSelectedItem(key);
    setRowData(data);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const menu = (row: any) => (
    <Menu>
      {hasAccess('customer_module','update_customers')&& <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleMenuClick("edit", row)}
      >
        Change Status
      </Menu.Item>}
     
      {/* <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        onClick={() => handleMenuClick("edit", row)}
      >
        Delete
      </Menu.Item> */}
    </Menu>
  );
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
      name: "Sr:",
      // selector: (row: { Id: any }) => row.Id,
      sortable: true,
      cell: (row: any) => (
        <div
        // onClick={() => {
        //   navigate(`/Customers/CustomerDetails/${row.user_id}`);
        // }}
        >
          {row.user_id}
        </div>
      ),
      width: "80px",
    },
    {
      name: "Customer Id",
      selector: (row: { customer_id: any }) => row.customer_id,
      sortable: true,
      width: "200px",
    },
    {
      name: "Customer Type",
      selector: (row: { accountType: any }) => row.accountType,
      sortable: true,
      width: "200px",
    },
    {
      name: "Email",
      cell: (row: any) => (
        // <MaskedValue
        //   value={row.accountBalance}
        //   showToggle={true}
        //   unmaskedCount={0}
        // />
        row.email
      ),
      width: "220px",
      sortable: true,
    },
    {
      name: "Mobile No.",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
      width: "220px",
    },
    {
      name: "Registration Date",
      selector: (row: { created_at: any }) => row.created_at,
      sortable: true,
      width: "220px",
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
                ? "rgba(63, 195, 128, 0.9)":row.accountStatus === 2?"#9C9C9C":
               
        
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
      name: "Actions",

      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            className="gradient-btn"
            type="primary"
            style={{
              backgroundColor: "#0B8085 !important",
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
  const getList = async () => {
    try {
      setSkelitonLoading(true);

      const response = await customersList(page, pageSize,"citizen");
      if (response) {
        const data = response?.data?.data;
        setData(data || []);
        setSkelitonLoading(false);
        setTotalRows(response?.data?.total || 0);
        setFrom(response?.data?.from || 0);
        setTo(response?.data?.to || 0);
        setPage(response?.data?.current_page);
        setTotalPage(response?.data?.last_page);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setSkelitonLoading(false);
    } finally {
      setSkelitonLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, [page, pageSize]);
  const mappedData =
    data &&
    data?.map((item: any,index:any) => {
      return {
        id:item.id,
        user_id:index+1,
        phone: item?.phone || "--------",
        cnic: item?.cnic || "--------",
        email: item?.email || "--------",
        customer_id: item?.customer_id || "--------",
        accountType: item?.user_type_name?"Citizen":"-------",
        accountStatus: item?.status || 0,
        UpdatedBy: item?.updated_at || "--------",
        created_at: item?.created_at || "--------",
      };
    });
console.log(rowData,"rowData")
  return (
    <div className="service">
      {/* <DashboardProfile /> */}
{skelitonLoading && <Loader/>}
      <div className="d-flex justify-content-end  col-12">
        <Select
          mode="tags"
          style={{ width: "15%", borderTopRightRadius: "0px" }}
          // onChange={handleChange}
          placeholder="Filter"
          tokenSeparators={[","]}
          suffixIcon={<FaFilter />}

          // options={options}
        />

        <div className="d-flex gap-2 w-100">
          <div className="d-flex align-items-center gap-1 border px-2 ps-3 search-box">
            <img src={Images.searchIconGray} alt="" />
            <input
              type="text"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
              }}
              className="p-2"
              placeholder="Search..."
            />
          </div>

          {/* <button className="invoice-btn" onClick={exportToExcel}>
            Excel
          </button>
          <button
            className="invoice-btn"
            onClick={() => {
              exportToPDF();
            }}
          >
            PDF
          </button>
          <button className="invoice-btn">Print</button> */}
        </div>
      </div>

      <Modal
        className="custom-mod"
        title={selectedItem === "edit" ? "Change Status" : "Enter Your Details"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => {
              selectedItem === "edit"
                ? handleStatusChange(rowData)
                : handleOk();
            }}
          >
            {selectedItem === "edit" ? "Save" : "Submit"}
          </Button>,
        ]}
      >
        <div className={selectedItem === "edit" ? "cust-drop" : "Ente-details"}>
          {selectedItem === "edit" ? (
            <>
              <label>Status</label>
              <Select
                defaultValue={rowData?.accountStatus}
                value={rowData?.accountStatus}
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(value: string) => {
                  setRowData({
                    ...rowData,
                    accountStatus: value, // Directly use 'value'
                  });
                }}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
                <option value={2}>Pending</option>
              </Select>
              <p className="edit-mod">Edit modal content</p>
            </>
          ) : (
            <>
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
            </>
          )}
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

export default Saudi;

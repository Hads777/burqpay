import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
} from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  allCustomerStatusChange,
  getBarqFlexAccounts,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import arrowDown from "../../assets/images/arrow-down.png";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

import { navigate } from "../../utils/const.utils";
import { fas } from "@fortawesome/free-solid-svg-icons";

const Companies = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDetailsFields, setShowDetailsFields] = useState(false);
  const [status, setStatus] = useState("Active");
  const [rowData, setRowData] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [sureModal, setSureModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    cnic: "",
    department_id: "",
    role: "",
    designation: "",
  });
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      selector: (row: { Sr: any }) => row.Sr,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row: { Name: any }) => row.Name,
      sortable: true,
      width: "250px",
    },
    {
      name: "Phone Number",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
      width: "200px",
    },
    {
      name: "Gender",
      selector: (row: { gender: any }) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row: { age: any }) => (row.age ? row.age : "-"),
      sortable: true,
    },
    {
      name: "City",
      selector: (row: { city: any }) => row.city,
      sortable: true,
    },

    /* {
      name: "Status",
      cell: (row: { status: any }) => (
        <div
          style={{
            padding: "8px 10px",
            borderRadius: "32px",
            fontSize: "12px",
            backgroundColor:
              row.status === "active"
                ? "rgba(63, 195, 128, 0.9)"
                : row.status === "inactive"
                ? "#F84D4D"
                : "transparent",
            color: "white",
            cursor: row.status === "active" ? "pointer" : "default",
          }}
        >
          {row.status.toUpperCase()}
        </div>
      ),
    }, */
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
  const menu = (row: any) => (
    <Menu>
      <Menu.Item
        key=""
        icon={<EyeOutlined />}
        onClick={() => handleMenuClick("", row)}
      >
        View Details
      </Menu.Item>
      {/* <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleMenuClick("edit", row)}
      >
       Edit
      </Menu.Item> */}
    </Menu>
  );
  const handleMenuClick = (key: string, data: any) => {
    setSelectedItem(key);
    setRowData(data);
    navigate("/Packages/CompanyView");
    // setIsModalVisible(true);
  };

  const handleOk = () => {
    setOpenModal(false); // Close this modal
    setSureModal(true); // Open the confirmation modal

    // Handle save logic here
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

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If birth month/date hasn't occurred yet this year, subtract 1
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleStatusChange = async (value: any) => {
    setStatus(value);

    try {
      const body = {
        user_id: value?.user_id,
        status: value?.accountStatus,
      };
      await toast.promise(
        allCustomerStatusChange(body,""), // The promise to track
        {
          loading: "Changing Status...", // Loading state message
          success: (res) => {
            if (res?.data?.success) {
              setIsModalVisible(false);
              getBarqFlexList();
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

  const getBarqFlexList = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getBarqFlexAccounts(page, pageSize);
      if (response) {
        const data = response?.data?.data?.data;
        setData(data || []);
        setSkelitonLoading(false);
        setTotalRows(response?.data?.data?.total || 0);
        setFrom(response?.data?.data?.from || 0);
        setTo(response?.data?.data?.to || 0);
        setPage(response?.data?.data?.current_page);
        setTotalPage(response?.data?.data?.last_page);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setSkelitonLoading(false);
    } finally {
      setSkelitonLoading(false);
    }
  };
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };
  // useEffect(() => {
  //   getBarqFlexList();
  // }, [page, pageSize]);
  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        id: item.id || "-",
        Sr: index + from,
        name: item?.name,
        phone: item?.phone || "-",
        gender: item?.gender,
        city: item?.city || "N/A",
        dob: item?.date_of_birth,
        age: calculateAge(item?.date_of_birth) || "N/A",
        accountStatus: item?.aft_detail?.accountStatus || "-",
      };
    });
  const dummyUserMapped = [
    {
      Id: 1,
      Sr: 1,
      network: "jazz",
      Name: "Ali Raza",
      email: "ali.raza@example.com",
      phone: "03001234567",
      cnic: "35202-1234567-1",
      Designation: "Software Engineer",
      Department: "IT Department", // Or any dummy department
      role: "Admin",
      gender: "Male",
      created_at: "2024-05-06",
      status: "active",
      city: "Lahore",
    },
    {
      Id: 2,
      Sr: 2,
      gender: "Male",
      Name: "Ahmed",
      network: "ufone",
      email: "Ahmed.raza@example.com",
      phone: "03001234567",
      cnic: "35202-1234567-1",
      Designation: "Software Engineer",
      Department: "IT Department", // Or any dummy department
      role: "Admin",

      city: "Lahore",
      created_at: "2024-05-06",
      status: "inactive",
    },
    {
      Sr: 3,
      Name: "Ali Raza",
      gender: "Male",
      network: "telenor",
      email: "ali.raza@example.com",
      phone: "03001234567",
      cnic: "35202-1234567-1",
      Designation: "Software Engineer",
      Department: "IT Department", // Or any dummy department
      role: "Admin",
      city: "Lahore",
      created_at: "2024-05-06",
      status: "active",
    },
    {
      Sr: 4,
      gender: "Male",
      Name: "Ahmed",
      network: "onic",
      city: "Lahore",
      email: "Ahmed.raza@example.com",
      phone: "03001234567",
      cnic: "35202-1234567-1",
      Designation: "Software Engineer",
      Department: "IT Department", // Or any dummy department
      role: "Admin",
      created_at: "2024-05-06",
      status: "inactive",
    },
  ];
  return (
    <div className="service">
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
          <div className="d-flex gap-1">
            <DatePicker>from</DatePicker>
            <DatePicker>to</DatePicker>
          </div>
          <div>
            <button
              className="theme-btn"
              onClick={() => {
                setSelectedItem("Add");
                setSureModal(false);
                setOpenModal(true);
              }}
            >
              Add New Companies
            </button>
          </div>
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </Select>
              <p className="edit-mod">Edit modal content</p>
            </>
          ) : (
            <>
              <Form>
                <Form.Item name="username">
                  <div className="custom-input-container">
                    <label>Username</label>
                    <Input placeholder="Enter your username" />
                  </div>
                </Form.Item>
                <Form.Item name="password">
                  <div className="custom-input-container">
                    <label>Password</label>
                    <Input.Password placeholder="Enter your password" />
                  </div>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </Modal>
      <Modal
        className="custom-mod"
        style={{ maxWidth: "732px" }}
        title={selectedItem === "edit" ? "Edit Company" : "Add New Company"}
        visible={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={[
          <div className="w-100">
            <Button
              key="close"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Close
            </Button>

            <button
              key="save"
              className="theme-btn ms-2"
              // disabled={isLoading}

              onClick={handleOk}
            >
              {selectedItem === "edit" ? "Edit" : "Add"}
            </button>
          </div>,
        ]}
      >
        <div className={"Ente-details"}>
          <Form>
            <div className="row pt-2">
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Input
                      placeholder="Enter Company Name"
                      className="fs-6"
                      value={formValues.name}
                      onChange={(e) =>
                        handleChange("Company Name", e.target.value)
                      }
                    />
                    <label>Company Name</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Input
                      placeholder="Enter Cr No."
                      className="fs-6"
                      value={formValues.name}
                      onChange={(e) => handleChange("Cr No.", e.target.value)}
                    />
                    <label>Cr Number</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Input
                      placeholder="Enter Contact Person Number"
                      className="fs-6"
                      value={formValues.name}
                      onChange={(e) =>
                        handleChange("Contact Person Number", e.target.value)
                      }
                    />
                    <label>Contact Person Number</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Select
                      placeholder="Enter Name"
                      className="fs-6"
                      value={formValues.name}
                      // onChange={(e) => handleChange("name", value)}
                    />
                    <label>Country</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Select
                      placeholder="Enter Name"
                      className="fs-6"
                      value={formValues.name}
                      // onChange={(e) => handleChange("name", e.target.value)}
                    />
                    <label>City</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Input
                      placeholder="Enter Company Registration Number"
                      className="fs-6"
                      value={formValues.name}
                      onChange={(e) =>
                        handleChange(
                          "Company Registration Number",
                          e.target.value
                        )
                      }
                    />
                    <label>Company Registration Number</label>
                  </div>
                </Form.Item>
              </div>
              <div className="col-6 ">
                <Form.Item className="w-100">
                  <div className="form-group form-label-group">
                    <Input
                      placeholder="Enter Email"
                      className="fs-6"
                      value={formValues.name}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <label>Email</label>
                  </div>
                </Form.Item>
              </div>
              <div className="border-bottom"></div>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        className="custom-mod center-footer"
        style={{ maxWidth: "378px" }}
        visible={sureModal}
        onCancel={() => setSureModal(false)}
        footer={[
          <Button
            key="no"
            onClick={() => setSureModal(false)}
            style={{
              border: "1px solid #ccc",
              color: "black",
              background: "white",
              borderRadius: "8px",
              padding: "4px 20px",
              fontWeight: "500",
            }}
          >
            No
          </Button>,
          <Button
            key="yes"
            onClick={() => setSureModal(false)}
            style={{
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "4px 20px",
              fontWeight: "500",
            }}
          >
            Yes
          </Button>,
        ]}
        centered
        closable={false}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "0",
            }}
          >
            Are you sure you want to add new company?
          </p>
        </div>
      </Modal>
      <TableView
        header={Activity_Loans_Header}
        data={dummyUserMapped}
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

export default Companies;

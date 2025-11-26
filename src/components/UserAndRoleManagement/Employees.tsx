import { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Select, Tabs, Modal, Input, Form } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  createEmploye,
  deleteEmploye,
  getAllDepartments,
  getEmployes,
  getRole,
  UpdateEmployee,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import arrowDown from "../../assets/images/arrow-down.png";
import MaskedValue from "../MaskedValue";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Employees = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [employeData, setEmployeData] = useState<any>([]);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [department, setDepartment] = useState<any>([]);
  const [rowData, setRowData] = useState<any>({});
  const [status, setStatus] = useState<any>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",

    email: "",

    password: "",

    password_confirmation: "",

    phone: "",

    nid: "",

    department_id: "",
    role_id: "",
    role: "Employee",
    department: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const permissionData = useSelector(
    (state: RootState) => state.block.permissions
  );
  const hasAccess = (moduleName: string, permissionName?: string): boolean => {
    if (!permissionData || !permissionData.modules) return false;

    const module = permissionData.modules.find((m) => m.name === moduleName);
    if (!module) return false;

    if (!permissionName) return true;

    return (module.permissions || []).some((p) => p.name === permissionName);
  };
  useEffect(() => {
    getAllEmployees();
    getAllUsers();
    getAllRole();
  }, [page, pageSize]);

  const getAllEmployees = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getEmployes(page, pageSize);
      if (res) {
        if (res?.data?.success) {
          const data = res.data.data;
          setData(data || []);
          setSkelitonLoading(false);
          setTotalRows(res?.data?.per_page || 0);
          setFrom(res?.data?.from || 0);
          setTo(res?.data?.to || 0);
          setPage(res?.data?.current_page);
          setTotalPage(res?.data?.last_page);
        }
      }
    } catch (error: any) {
      setSkelitonLoading(true);
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await toast.promise(deleteEmploye(rowData?.Id), {
        loading: "Deleting Department...",
        success: (response) => {
          if (response?.data?.success) {
            getAllEmployees();
            setIsDeleteModalVisible(false);
            setRowData("");
            return "Department deleted successfully";
          } else {
            throw new Error(
              response?.data?.errors?.[0] ||
                response?.data?.message ||
                "Failed to deleting Department."
            );
          }
        },
        error: (err) =>
          err?.message || "Something went wrong while deleting the Department.",
      });
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setIsDeleteModalVisible(false);
      setRowData("");
      // setIsLoading(false);
    }
  };

  const getAllRole = async () => {
    setSkelitonLoading(true);

    try {
      const res = await getRole("", "");

      if (res) {
        if (res?.data?.success) {
          const data = res.data.data;
          setStatus(data || []);
          setSkelitonLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };

  const handleMenuClick = (action: string, data) => {
    setRowData(data);
    setSelectedItem("edit");

    setFormValues({
      name: data?.name,
      email: data?.email,
      password: "",
      password_confirmation: "",
      phone: data?.mobile_no,
      nid: data?.nid,
      department_id: data?.department,
      role_id: getRoleName(data?.role),
      role: data?.role,
      department: data?.department,
    });
    setOpenModal(true);
  };
  const menu = (row: any) => (
    <Menu>
      {hasAccess("employee_module", "update_employee") && (
        <Menu.Item
          key="edit"
          icon={<EditOutlined />}
          onClick={() => handleMenuClick("edit", row)}
        >
          Edit
        </Menu.Item>
      )}

      {hasAccess("employee_module", "delete_employee") && (
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          onClick={() => {
            setIsDeleteModalVisible(true);
            setRowData(row);
          }}
        >
          Delete
        </Menu.Item>
      )}
    </Menu>
  );

  // Close popup when clicking outside

  const Activity_Loans_Header = [
    {
      name: "Sr:",

      selector: (row: { Sr: any }) => row.Sr,

      sortable: true,
      width: "80px",
    },

    {
      name: "Name",

      selector: (row: { name: any }) => row.name,

      sortable: true,

      width: "150px",
    },

    {
      name: "Email",

      selector: (row: { email: any }) => row.email,

      sortable: true,

      width: "220px",
    },

    {
      name: "Mobile No.",

      selector: (row: { mobile_no: any }) => row.mobile_no,

      sortable: true,

      width: "200px",
    },

    {
      name: "NID/Iqama",

      selector: (row: { nid: any }) => row.nid,

      sortable: true,

      width: "200px",
    },

    // {
    //   name: "Designation",

    //   selector: (row: { designation: any }) => row.designation,

    //   sortable: true,

    //   width: "200px",
    // },

    {
      name: "Department",

      selector: (row: { department: any }) => row.department,

      sortable: true,

      width: "200px",
    },

    {
      name: "Role",

      selector: (row: { role: any }) => row.role,

      sortable: true,
      width: "180px",
    },

    {
      name: "Created At",

      selector: (row: { created_at: any }) => row.created_at,

      sortable: true,
      width: "180px",
    },

    {
      name: "Status",

      cell: (row: { status: any }) => (
        <div
          style={{
            padding: "8px 10px",

            borderRadius: "32px",

            fontSize: "12px",

            backgroundColor:
              row.status === 1 ? "rgba(63, 195, 128, 0.9)" : "#F84D4D",

            color: "white",

            cursor: row.status === 1 ? "pointer" : "default",
          }}
        >
          {row.status === 1 ? "Active" : "Inactive"}
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
  const getAllUsers = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getAllDepartments(page, "");
      if (res?.data?.success) {
        const data = res.data.data;
        setEmployeData(data || []);
        setSkelitonLoading(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };

  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        Id: item?.id,

        Sr: index + from,

        name: item?.name,

        nid: item?.nid,

        email: item?.email,

        mobile_no: item?.mobile_no,

        cnic: item?.cnic,

        department: item?.department || "-",

        role: item?.role || "-",

        created_at: item?.created_at,

        status: item?.status,
      };
    });

  function getDepartmentId(name: any) {
    console.log(employeData, name, "112");
    const data = employeData.find((data: any) => data.name === name);

    return data ? data.id : "-";
  }
  function getDesignation(id: any) {
    console.log(status, "stauyts");

    const data = status.find((data: any) => data.name === id);
    console.log(data, "data");
    return data ? data.id : "-";
  }
  function getRoleName(id: any) {
    console.log(employeData, id, "112");
    const data = status.find((data: any) => data.name === id);
    console.log(data, "data");
    return data ? data.id : "-";
  }

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleOk = async () => {
    let validationErrors: Record<string, string> = {};
    if (!formValues.name) validationErrors.name = "Name is required";
    if (!formValues.email) validationErrors.email = "Email is required";
    // if (!formValues.password)
    //   validationErrors.password = "Password is required";
    // if (!formValues.password_confirmation)
    //   validationErrors.password_confirmation = "Confirm password is required";
    if (!formValues.phone) validationErrors.phone = "Phone number is required";
    if (!formValues.nid) validationErrors.nid = "NID is required";

    // if (
    //   formValues.phone &&
    //   formValues.phone.length &&
    //   formValues.nid.length < 10
    // ) {
    //   validationErrors.phone = "Phone number must be exactly 10 digits";
    // }

    // Check NID format starts with "123456789988"
    // if (formValues.nid && !formValues.nid.startsWith("1")) {
    //   validationErrors.nid = "NID must start with '123456789988'";
    // }

    setErrors(validationErrors);

    // If validation errors exist, stop the function from proceeding
    if (Object.keys(validationErrors).length > 0) return;

    try {
      if (selectedItem === "edit") {
        const updateBody = {
          // id: rowData?.Id,
          name: formValues?.name,

          // email: formValues?.email,

          phone: formValues?.phone,

          // nid: formValues?.nid,

          department_id: typeof formValues?.department_id ==='number'? formValues?.department_id: getDepartmentId(formValues?.department_id),

          role_id: formValues?.role_id,
        };

        await toast.promise(UpdateEmployee(updateBody,rowData?.Id), {
          loading: "Updating Employee...",
          success: (response) => {
            if (response?.data?.success) {
              setOpenModal(false);
              getAllEmployees(); // Refresh table
              return "Employee updated successfully";
            } else {
              throw new Error(
                response?.data?.message || "Failed to update Employee."
              );
            }
          },
          error: (err) =>
            err?.message || "Something went wrong while updating the employee.",
        });
      } else {
        const body = {
          // id: rowData?.Id,
          name: formValues?.name,

          email: formValues?.email,

          phone: formValues?.phone,

          nid: formValues?.nid,

          department_id: formValues?.department_id,
          password_confirmation: formValues?.password_confirmation,

          role_id: formValues?.role_id,
          password: formValues?.password,
        };
        await toast.promise(createEmploye(body), {
          loading: "Adding Employee",
          success: (response) => {
            if (response) {
              setFormValues({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                phone: "",
                nid: "",
                department_id: "",
                role_id: "",
                department: "",
                role: "",
              });
              getAllEmployees();
              setOpenModal(false);
              return "Employee created successfully";
            }
          },
          error: (err) => {
            const apiErrors = err?.response?.data?.errors || [];

            // Clear previous errors
            let newErrors: Record<string, string> = {};
            console.log(err, "err");
            apiErrors.forEach((error) => {
              // if (error.includes("email")) {
              //   newErrors.email = "Email is already taken";
              // }
              // if (error.includes("phone")) {
              //   newErrors.phone = "Phone number is already taken";
              // }
              // if (error.includes("nid")) {
              //   newErrors.nid = "NID is already taken";
              // }
            });

            setErrors(newErrors);

            return (
              err?.response?.data?.message ||
              "Something went wrong while adding the employee."
            );
          },
        });
      }
    } catch (error: any) {
      // toast.error(error?.response?.data?.message);
    } finally {
      // setSkelitonLoading(false);
    }
  };

  const handleSubType = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="service">
        {skelitonLoading && <Loader />}
        <div className="d-flex justify-content-end col-12">
          <Select
            mode="tags"
            style={{ width: "15%", borderTopRightRadius: "0px" }} // onChange={handleChange}
            placeholder="Filter"
            tokenSeparators={[","]}
            suffixIcon={<FaFilter />}
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
            {hasAccess("employee_module", "store_employee") && (
              <button
                className="theme-btn"
                onClick={() => {
                  setOpenModal(true);
                  setFormValues({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                    phone: "",
                    nid: "",
                    department_id: "",
                    role_id: "",
                    department: "",

                    role: "",
                  });
                  setSelectedItem("add");
                }}
              >
                Add New Employee
              </button>
            )}
          </div>
        </div>

        <TableView
          header={Activity_Loans_Header}
          data={mappedData}
          totalRows={totalRows}
          isLoading={skelitonLoading}
          from={from}
          page={page}
          pageSize={pageSize}
          totalPage={totalPage}
          setPage={setPage}
          setPageSize={setPageSize}
          to={to}
        />
      </div>

      <Modal
        className="custom-mod"
        style={{ maxWidth: "732px" }}
        title={selectedItem === "edit" ? "Edit Employee" : "Add New Employee"}
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
              className="theme-btn ms-2" // disabled={isLoading}
              onClick={handleOk}
            >
              {selectedItem === "edit" ? "Update" : "Add"}
            </button>
          </div>,
        ]}
      >
        <div className={"Ente-details"}>
          <Form>
            <div className="d-flex gap-4 align-items-center">
              {/* Name Field */}
              <Form.Item
                className="w-100"
                validateStatus={errors.name ? "error" : ""}
                help={errors.name}
              >
                <div className="custom-input-container">
                  <label className="input-label">Name</label>

                  <Input
                    placeholder="Enter Name"
                    className="fs-6"
                    value={formValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
              </Form.Item>
              {/* Status Field */}
              {selectedItem !== "edit" && 
              <Form.Item
                className="w-100"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email}
              >
                <div className="custom-input-container">
                  <label className="input-label">Email</label>

                  <Input
                    placeholder="Enter Email"
                    className="fs-6"
                    value={formValues.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
              </Form.Item>
}
            </div>

            {selectedItem !== "edit" && (
              <div className="d-flex gap-4 align-items-center">
                <Form.Item
                  className="w-100"
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password}
                >
                  <div className="custom-input-container">
                    <label className="input-label">Password</label>
                    <Input
                      placeholder="Enter Password"
                      className="fs-6"
                      value={formValues.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  className="w-100"
                  validateStatus={errors.password_confirmation ? "error" : ""}
                  help={errors.password_confirmation}
                >
                  <div className="custom-input-container">
                    <label className="input-label">Confirm Password</label>
                    <Input
                      placeholder="Enter Confirm Password"
                      className="fs-6"
                      value={formValues.password_confirmation}
                      onChange={(e) =>
                        handleChange("password_confirmation", e.target.value)
                      }
                    />
                  </div>
                </Form.Item>
              </div>
            )}

            <div className="d-flex gap-4 align-items-center">
              {/* Phone Field */}
              <Form.Item
                className="w-100"
                validateStatus={errors.phone ? "error" : ""}
                help={errors.phone}
              >
                <div className="custom-input-container">
                  <label className="input-label">Phone No</label>

                  <Input
                    placeholder="Enter Phone No."
                    className="fs-6"
                    value={formValues.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </Form.Item>
              {/* NID Field */}
              {selectedItem !== "edit" && 
              <Form.Item
                className="w-100"
                validateStatus={errors.nid ? "error" : ""}
                help={errors.nid}
              >
                <div className="custom-input-container">
                  <label className="input-label">NID</label>

                  <Input
                    placeholder="Enter complaint type"
                    className="fs-6"
                    value={formValues.nid}
                    onChange={(e) => handleChange("nid", e.target.value)}
                  />
                </div>
              </Form.Item>
}
            </div>

            <div className="d-flex gap-4 align-items-center">
              {/* Department Field */}
              <Form.Item
                className="w-100"
                validateStatus={errors.department_id ? "error" : ""}
                help={errors.department_id}
              >
                <div className="custom-input-container">
                  <label className="input-label">Assign Department</label>

                  <Select
                    value={formValues.department_id} // will hold the selected ID
                    onChange={(value) => handleSubType("department_id", value)}
                    style={{ width: "100%", marginTop: "0" }}
                    placeholder={`${formValues.department}`}
                  >
                    {employeData &&
                      employeData?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </div>
              </Form.Item>
              {/* Status Field */}
              <Form.Item
                className="w-100"
                validateStatus={errors.role ? "error" : ""}
                help={errors.role}
              >
                <div className="custom-input-container">
                  <label className="input-label">Assign Role</label>

                  <Select
                    value={formValues.role_id} // will hold the selected ID
                    onChange={(value) => handleSubType("role_id", value)}
                    style={{ width: "100%", marginTop: "0" }}
                    placeholder={`${formValues.role_id}`}
                  >
                    {status &&
                      status.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        className="custom-mod center-footer"
        style={{ maxWidth: "378px" }}
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button
            key="no"
            onClick={() => setIsDeleteModalVisible(false)}
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
            onClick={handleDeleteConfirm}
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
            Are you sure you want to delete this Employee?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Employees;

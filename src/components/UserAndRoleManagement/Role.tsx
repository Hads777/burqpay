import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Menu,
  Select,
  Tabs,
  Modal,
  Input,
  Form,
  Switch,
} from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  createRole,
  deleteRole,
  getRole,
  updateRole,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import arrowDown from "../../assets/images/arrow-down.png";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Loader from "../Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const Role = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    status: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const permissionData = useSelector((state: RootState) => state.block.permissions);
  const hasAccess = (moduleName: string, permissionName?: string): boolean => {
    if (!permissionData || !permissionData.modules) return false;
  
    const module = permissionData.modules.find((m) => m.name === moduleName);
    if (!module) return false;
  
    if (!permissionName) return true;
  
    return (module.permissions || []).some((p) => p.name === permissionName);
  };
  useEffect(() => {
    getAllUsers();
  }, [page, pageSize]);

  const getAllUsers = async () => {
    setSkelitonLoading(true);
    try {
      const res = await getRole(page, pageSize);
      if (res?.data?.success) {
        const data = res.data.data;
        setData(data || []);
        setSkelitonLoading(false);
        setTotalRows(res.data.total || 0);
        setFrom(res.data.from || 0);
        setTo(res.data.to || 0);
        setPage(res.data.current_page);
        setTotalPage(res.data.last_page);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setSkelitonLoading(false);
    }
  };

  const handleMenuClick = (action: string, data) => {
    setRowData(data);
    setSelectedItem("edit");
    setFormValues({
      name: data?.name,
      status: data?.status,
    });
    setOpenModal(true);
  };
  console.log(formValues, "11");
  const menu = (row: any) => (
    <Menu>
      {hasAccess("roles_module","edit_role")&& 
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleMenuClick("edit", row)}
      >
        Edit
      </Menu.Item>
}
{hasAccess("roles_module","delete_role")&& 
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
}
    </Menu>
  );

  const Activity_Loans_Header = [
    {
      name: "Sr:",
      selector: (row) => row.Sr,
      sortable: true,
      width: "25%",
    },
    {
      name: "Role",
      selector: (row) => row.name,
      sortable: true,
      width: "30%",
    },
    {
      name: "Status",
      width: "30%",
      cell: (row: any) => (
        <div
          style={{
            padding: "0.22rem 1rem",
            borderRadius: "12px",
            backgroundColor:
              row.status === 1
                ? "rgba(63, 195, 128, 0.9)"
               
        
                : "#9C9C9C",
            color: "#ffffff",
            cursor: row.status === 1 ? "pointer" : "default",
          }}
        >
          {row.status == 1 ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      name: "Actions",
      width: "15%",
      cell: (row) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            className="gradient-btn"
            type="primary"
            style={{
              backgroundColor: "#0B8085",
              color: "#000",
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

  const mappedData =
    data &&
    data.map((item, index) => ({
      Sr: index + 1,
      id: item?.id,
      name: item?.name || "-",
      permission: item?.permission || "-",
      status: item?.status || 0,
    }));

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };
  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      const Body = {
        _method: "delete",
      };
      await toast.promise(
        deleteRole(rowData?.id, Body), // API call
        {
          loading: "Deleting Role...",
          success: (response) => {
            if (response?.data?.success) {
              getAllUsers();
              setIsDeleteModalVisible(false);
              setRowData("");
              return "Role deleted successfully";
            } else {
              throw new Error(
                response?.data?.errors?.[0] ||
                  response?.data?.message ||
                  "Failed to deleting Role."
              );
            }
          },
          error: (err) =>
            err?.message || "Something went wrong while deleting the role.",
        }
      );
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setIsDeleteModalVisible(false);
      setRowData("");
      setIsLoading(false);
    }
  };
  const handleOk = async () => {
    let validationErrors: Record<string, string> = {};

    if (!formValues.name?.trim()) {
      validationErrors.name = "Name is required";
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsLoading(true);
      if (selectedItem === "edit") {
        const updateBody = {
          _method: "put",
          name: formValues.name.trim(),
          status: formValues.status,
          role_id: rowData?.id,
        };
        await toast.promise(updateRole(updateBody), {
          loading: "Updating Role...",
          success: (res) => {
            if (res.data.success) {
              resetForm();
              getAllUsers();
              setOpenModal(false);
              return "Role updated successfully";
            }
            throw new Error(res.data.message || "Failed to update role");
          },
          error: (err) => err?.message || "Failed to update role",
        });
      } else {
        await toast.promise(createRole(formValues), {
          loading: "Adding Role...",
          success: (res) => {
            if (res.data.success) {
              resetForm();
              getAllUsers();
              setOpenModal(false);
              return "Role added successfully";
            }
            throw new Error(res.data.message || "Failed to add role");
          },
          error: (err) => err?.message || "Failed to add role",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormValues({ name: "", status: 0 });
    setErrors({});
    setSelectedItem(null);
    setRowData({});
  };

  return (
    <>
      <div className="service">
        {skelitonLoading && <Loader />}
        <div className="d-flex justify-content-end col-12">
          <Select
            mode="tags"
            style={{ width: "15%" }}
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
            {hasAccess("roles_module","create_role")&& 
            <button
              className="theme-btn"
              onClick={() => {
                setOpenModal(true);
                setFormValues({
                  name: "",
                  status: 0,
                });
                setSelectedItem("add");
              }}
            >
              Add New Role
            </button>
}
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
        title={selectedItem === "edit" ? "Edit Role" : "Add New Role"}
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        footer={[
          <div className="w-100">
            <Button key="close" onClick={() => setOpenModal(false)}>
              Close
            </Button>
            <button
              className="theme-btn ms-2"
              onClick={handleOk}
              disabled={isLoading}
            >
              {selectedItem === "edit" ? "Update" : "Add"}
            </button>
          </div>,
        ]}
      >
        <div className="Ente-details">
          <Form>
            <Form.Item>
              <div className="custom-input-container">
                <label className="input-label">Name</label>
                <Input
                  placeholder="Enter Role Name"
                  value={formValues.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && (
                  <div className="text-danger mt-1">{errors.name}</div>
                )}
              </div>
            </Form.Item>

            <Form.Item className="border-bottom">
              <div className="custom-input-container ">
                <Switch
                  className="custom-switch"
                  checked={formValues.status === 1}
                  onChange={(checked) =>
                    handleChange("status", checked ? 1 : 0)
                  }
                />
                <span className="ps-2" style={{ color: "#666666" }}>
                  {formValues.status === 1 ? "Active" : "Inactive"}
                </span>
              </div>
            </Form.Item>
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
            disabled={isLoading}
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
            Are you sure you want to delete this Role?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Role;

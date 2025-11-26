import { useEffect, useState } from "react";
import { Button, Dropdown, Menu, Select, Modal, Input, Form } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  complaintID,
  createComplaintSubType,
  deleteComplaintSubType,
  editComplaintSubType,
  getComplaintsSubType,
} from "../../redux/apis/apisCrud";
import arrowDown from "../../assets/images/arrow-down.png";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ComplaintSubType = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rowData, setRowData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [getComplaintType, setGetComplaintType] = useState<any[]>([]);

  const [formValues, setFormValues] = useState({
    name: "",
    status: "",
    complain_type_id: "",
  });
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const handleDeleteConfirm = async () => {
    try {
      setIsLoading(true);
      await toast.promise(
        deleteComplaintSubType(rowData?.id), // API call
        {
          loading: "Deleting complaint type...",
          success: (response) => {
            if (response?.data?.success) {
              getComplaintsSubTypeList();
              return response?.data?.message;
            } else {
              throw new Error(
                response?.data?.errors?.[0] ||
                  response?.data?.notificationMessage ||
                  "Failed to deleting complaint type."
              );
            }
          },
          error: (err) =>
            err?.message ||
            "Something went wrong while deleting the complaint type.",
        }
      );
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setIsDeleteModalVisible(false);
      setIsLoading(false);
    }
  };
  const getComplaintsSubTypeList = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getComplaintsSubType(page, pageSize);
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

  useEffect(() => {
    // getComplaintsSubTypeList();
    getComplaintTypeData();
  }, [page, pageSize]);
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      cell: (row: { Sr: any }) => row.Sr,
      sortable: true,
      width: "80px",
    },

    {
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
      width: "480px",
    },
    {
      name: "Income Type",
      selector: (row: { complainType: any }) => row.complainType,
      sortable: true,
      width: "380px",
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
              row.status === "active"
                ? "rgba(63, 195, 128, 0.9)"
                : row.status === "inactive"
                ? "#F84D4D"
                : "#FAB65E",
            color: "white",
            cursor: row.status === "active" ? "pointer" : "default",
          }}
        >
          {row.status.charAt(0).toUpperCase() +
            row.status.slice(1).toLowerCase() || "Pending"}
        </div>
      ),
      width: "250px",
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
      width: "250px",
    },
  ];
  const menu = (row: any) => (
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
      >
        Delete
      </Menu.Item>
    </Menu>
  );
  const handleMenuClick = (action: string, data) => {
    setRowData(data);
    switch (action) {
      case "edit":
        // Handle edit action
        setSelectedItem("edit");
        setFormValues({
          name: data?.name,
          status: data?.status,
          complain_type_id: data?.complain_type_id,
        });
        setIsModalVisible(true);
        break;
      case "delete":
        // Handle delete action
        setIsDeleteModalVisible(true);

        break;
      default:
        break;
    }
  };
  const getComplaintTypeData = async () => {
    setSkelitonLoading(true);
    try {
      const res = await complaintID();
      if (res) {
        const data = res?.data?.data?.data || [];
        setGetComplaintType(data);
        getComplaintsSubTypeList();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const getListComplaint = (id: any) => {
    const entry: any = getComplaintType?.find((entry: any) => entry.id === id);
    return entry ? entry.name : "ID not found";
  };

  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        id: item?.id,
        Sr: index + from,
        name: item?.name,
        status: item?.status,
        complain_type_id: item?.complain_type_id,
        complainType: getListComplaint(item?.complain_type_id),
      };
    });

  const showModal = () => {
    getComplaintTypeData();
    setFormValues({
      name: "",
      status: "",
      complain_type_id: "",
    });
    setIsModalVisible(true);
    setSelectedItem("");
    setRowData({});
  };
  const handleOk = async () => {
    const { name, status, complain_type_id } = formValues;

    if (!name || !status || !complain_type_id) {
      console.log("Validation Failed");
      return;
    }

    try {
      setIsLoading(true);

      if (selectedItem === "edit") {
        // For update, include the ID in the body
        const updateBody = {
          ...formValues,
          id: rowData?.id, // Include the ID from the selected row
        };

        await toast.promise(
          editComplaintSubType(updateBody), // Pass the body with ID included
          {
            loading: "Updating complaint type...",
            success: (response: any) => {
              console.log(response?.response, "response");
              if (
                response?.response?.data?.notificationMessage ===
                "Operation successful."
              ) {
                return response?.response?.data?.notificationMessage;
              } else {
                throw new Error(
                  response?.response?.data?.errors?.[0] ||
                    "Failed to update complaint type."
                );
              }
            },
            error: (err) =>
              err?.message ||
              "Something went wrong while updating the complaint type.",
          }
        );
      } else {
        await toast.promise(
          createComplaintSubType(formValues), // API call
          {
            loading: "Adding complaint type...",
            success: (response) => {
              if (response?.data?.success) {
                toast.success("Complaint Type Added Successfully");
                setFormValues({
                  name: "",
                  status: "",
                  complain_type_id: "",
                });

                setIsModalVisible(false);
                getComplaintsSubTypeList();
                return response?.data?.success;
              } else {
                throw new Error(
                  response?.data?.errors?.[0] ||
                    response?.data?.notificationMessage ||
                    "Failed to add complaint type."
                );
              }
            },
            error: (err) =>
              err?.message ||
              "Something went wrong while adding the complaint type.",
          }
        );
      }
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubType = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mappedData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "CampliantSubType");
    XLSX.writeFile(workbook, "CampliantSubType.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
     "Sr",
      "Name",
      "Complaint Type",
      "Status",
    ];

    const tableRows = mappedData?.map((item: any) => [
      item.Sr,
      item.name,
      item.complainType,
      item.status.charAt(0).toUpperCase() +
        item.status.slice(1).toLowerCase() || "Pending",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("CampliantSubType.pdf");
  };
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
          <button className="invoice-btn" onClick={exportToExcel}>
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
          <button className="invoice-btn">Print</button>
          <button onClick={showModal} className="theme-btn">
            Add New Complaint Sub-Type
          </button>
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
      <Modal
        className="custom-mod"
        style={{ maxWidth: "732px" }}
        title={
          selectedItem === "edit"
            ? "Edit Complaint Sub Type"
            : "Add New Complaint Sub Type"
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="save"
            type="primary"
            disabled={isLoading}
            onClick={handleOk}
          >
            {selectedItem === "edit" ? "Save" : "Submit"}
          </Button>,
        ]}
      >
        <div className={"Ente-details"}>
          <Form>
            <div className="d-flex w-100 gap-4 align-items-center">
              {/* Name Field */}
              <Form.Item className="w-100">
                <div className="custom-input-container">
                  <label className="input-label">Name</label>
                  <Input
                    placeholder="Enter complaint type"
                    className="fs-6"
                    value={formValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>
              </Form.Item>

              {/* Status Field */}
              <Form.Item className="w-100">
                <div className="custom-input-container">
                  <label className="input-label">Status</label>
                  <Select
                    value={formValues.status}
                    onChange={(value) => handleChange("status", value)}
                    style={{ width: "100%", marginTop: "0" }}
                  >
                    <Select.Option value="active">Active</Select.Option>
                    <Select.Option value="inactive">Inactive</Select.Option>
                    <Select.Option value="pending">Pending</Select.Option>
                  </Select>
                </div>
              </Form.Item>
            </div>
            <Form.Item className="col-12">
              <div className="custom-input-container">
                <label className="input-label">Complaint Type</label>
                <Select
                  value={formValues.complain_type_id} // will hold the selected ID
                  onChange={(value) => handleSubType("complain_type_id", value)}
                  style={{ width: "100%", marginTop: "0" }}
                  placeholder="Select a Complaint Type"
                >
                  {getComplaintType.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
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
            Are you sure want to delete this Complaint Sub Type?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ComplaintSubType;

import { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { Menu, Select, Dropdown, Button } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter, FaPersonBooth } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  complaintTypeList,
  createComplaints,
  deleteComplaints,
  getAllComplaints,
  getComplaintsSubType,
  updateComplaints,
} from "../../redux/apis/apisCrud";
import arrowDown from "../../assets/images/arrow-down.png";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AllComplaints = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [complaints, setComplaints] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [subtypes, setSubtypes] = useState([]);
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(15);
  const [totalRows, setTotalRows] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complainerName: "",
    complainerPhone: "",
    complaintType: 0,
    complaintSubtype: 0,
    description: "",
    priority: "",
    status: "",
  });

  const menu = (row: any) => (
    <Menu onClick={({ key }: any) => handleChange(key, row)}>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="assign" icon={<FaPersonBooth />}>
        Assign
      </Menu.Item>
      <Menu.Item key="view" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      selector: (row: { user_id: any }) => row.user_id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Complain Number",
      selector: (row: { complain_number: any }) => row.complain_number,
      sortable: true,
      width: "150px",
    },
    {
      name: "Complainer Name",
      selector: (row: { complainer_name: any }) => row.complainer_name,
      sortable: true,
      width: "220px",
    },
    {
      name: "Complainer Phone",
      selector: (row: { complainer_no: any }) => row.complainer_no,
      sortable: true,
      width: "180px",
    },

    {
      name: "Description",
      selector: (row: { description: any }) => row.description,
      sortable: true,
      width: "150px",
    },
    {
      name: "Priority",
      selector: (row: { priority: any }) => row.priority,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row: { assigned_to: any }) => row.assigned_to,
      sortable: true,
      width: "200px",
    },

    {
      name: "Global Status",
      selector: (row: { status: any }) => row.status,
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

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "complaintType") {
      const filtered = subtypes.filter(
        (sub) => sub.complain_type_id === parseInt(value)
      );
      setFilteredSubtypes(filtered);
      setFormData((prev) => ({ ...prev, complaintSubtype: 0 })); // Reset subtype
    }
  };

  const handleSave = async () => {
    const body: any = {
      complainer_no: formData.complainerPhone,
      description: formData.description,
      complain_type_id: Number(formData.complaintType),
      complain_sub_type_id: Number(formData.complaintSubtype),
      priority: formData.priority,
      status: formData.status,
    };

    try {
      let response;

      if (selectedItem === "edit" && editRowId) {
        // EDIT API
        response = await updateComplaints(editRowId, body);
        if (response.status === 200) {
          toast.success("Complaint updated successfully!");
          setShowModal(false);
          setEditRowId(null);
          setSelectedItem(null);
          setFormData({
            complainerName: "",
            complainerPhone: "",
            complaintType: 0,
            complaintSubtype: 0,
            description: "",
            priority: "",
            status: "",
          });
          getComplaints();
        } else {
          toast.error(response?.data?.errors || "Failed to update");
        }
      } else {
        // ADD API
        response = await createComplaints(body);
        if (response.status === 200) {
          toast.success("Complaint added successfully!");
          setShowModal(false);
          setEditRowId(null);
          setSelectedItem(null);
          setFormData({
            complainerName: "",
            complainerPhone: "",
            complaintType: 0,
            complaintSubtype: 0,
            description: "",
            priority: "",
            status: "",
          });
          getComplaints();
        } else {
          toast.error(response?.data?.errors || "Failed to add");
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }

    // Reset form & modal
  };

  const getComplaints = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getAllComplaints(page, pageSize);
      if (response) {
        console.log(response, "123");
        const data = response.data.data.data;
        setComplaints(data || []);
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
    console.log(complaints, "Complaints");
  };

  useEffect(() => {
    getComplaints();
  }, [page, pageSize]);

  const getComplaintTypes = async () => {
    try {
      const response = await complaintTypeList(page, 10000);
      setComplaintTypes(response?.data?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load complaint types");
    }
  };

  const getSubtypes = async () => {
    try {
      const res = await getComplaintsSubType(page, 10000); // Fetch all subtypes
      const data = res?.data?.data?.data || [];
      const subtypes = data.filter((item: any) => item.status === "active");
      setSubtypes(subtypes);
    } catch (error) {
      toast.error("Failed to fetch subtypes");
    }
  };
  const handleChange = (key: string, row: any) => {
    if (key === "edit") {
      handleEditClick(row);
    } else if (key === "view") {
      handleDelete(row);
    } else if (key === "assign") {
      navigate(`/Customers/AllComplaints/Assign/${row?.id}`);
    }
  };

  const handleOnHide = () => {
    setShowModal(false);
    setEditRowId(null);
    setSelectedItem(null);
    setFormData({
      complainerName: "",
      complainerPhone: "",
      complaintType: 0,
      complaintSubtype: 0,
      description: "",
      priority: "",
      status: "",
    });
  };
  const handleEditClick = (row: any) => {
    console.log("Edit row data:", row);
    setEditRowId(row.id);
    setSelectedItem("edit");

    const filtered = subtypes.filter(
      (sub) => sub.complain_type_id === parseInt(row.complain_type_id)
    );

    setFilteredSubtypes(filtered);

    setFormData({
      complainerName: row.complainer_name || "",
      complainerPhone: row.complainer_no || "",
      complaintType: row.complain_type_id || "",
      complaintSubtype: row.complain_sub_type_id || "",
      description: row.description || "",
      priority: row.priority || "",
      status: row.status || "",
    });

    setShowModal(true);
  };

  const handleDelete = async (row: any) => {
    try {
      const res = await deleteComplaints(row.id);
      if (res) {
        toast.success(res.data.notificationMessage);
        getComplaints(); // Refresh the data
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getComplaints();
    getComplaintTypes();
    getSubtypes();
  }, []);
  const mappedData =
    complaints &&
    complaints?.map((item: any) => {
      return {
        id: item?.id,
        user_id: item?.user_id || "-",
        complain_number: item?.complain_number || "-",
        complainer_name: item?.complainer_name || "-",
        complainer_no: item?.complainer_no || "-",
        description: item?.description || "-",
        priority: item?.priority || "-",
        assigned_to: item?.assigned_to?.name || "-",
        complain_type_id: item.complain_type_id || 0,
        complain_sub_type_id: item.complain_sub_type_id || 0,
        status: item?.status || "-",
      };
    });
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mappedData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AllCompliants");
    XLSX.writeFile(workbook, "AllCompliants.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Sr:",
      "Complain Number",
      "Complainer Name",
      "Complainer Phone",
      "Description",
      "Priority",
      "Assigned To",
      "Global Status",
    ];

    const tableRows = mappedData?.map((item: any) => [
      item.user_id,
      item.complain_number,
      item.complainer_name,
      item.complainer_no,
      item.description,
      item.priority,
      item.assigned_to?.name || "-",
      item.status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("AllCompliants.pdf");
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
          <button className="theme-btn" onClick={() => setShowModal(true)}>
            Add Complaint
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
        setPageSize={setpageSize}
        to={to}
      />
      <Modal size="lg" show={showModal} onHide={() => handleOnHide()} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem === "edit" ? "Update Complaint" : "Add New Complaint"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">Complainer Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="custom-input"
                    placeholder="Placeholder"
                    name="complainerName"
                    value={formData.complainerName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">
                    Complainer Phone
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="custom-input"
                    placeholder="Placeholder"
                    name="complainerPhone"
                    value={formData.complainerPhone}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">Complaint Type</Form.Label>
                  <Form.Select
                    name="complaintType"
                    className="custom-input"
                    value={formData.complaintType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Type</option>
                    {complaintTypes.map((type: any) => {
                      console.log(
                        "Option ID:",
                        type.id,
                        "Form Value:",
                        formData.complaintType
                      );
                      return (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">
                    Complaint Subtype
                  </Form.Label>
                  <Form.Select
                    name="complaintSubtype"
                    className="custom-input"
                    value={formData.complaintSubtype}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Subtype</option>
                    {filteredSubtypes?.map((sub: any) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2 custom-input-box">
              <Form.Label className="px-2 mt-2">Description</Form.Label>
              <Form.Control
                /* as="textarea"
                rows={2} */
                className="custom-input"
                placeholder="Placeholder"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">Select Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    className="custom-input"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="">Placeholder</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-2 custom-input-box">
                  <Form.Label className="px-2 mt-2">Select Status</Form.Label>
                  <Form.Select
                    name="status"
                    className="custom-input"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option>Placeholder</option>
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="invoice-btn"
            onClick={() => {
              setShowModal(false);
              setEditRowId(null);
              setSelectedItem(null);
              setFormData({
                complainerName: "",
                complainerPhone: "",
                complaintType: 0,
                complaintSubtype: 0,
                description: "",
                priority: "",
                status: "",
              });
            }}
          >
            Close
          </Button>
          <Button className="theme-btn" onClick={handleSave}>
            {selectedItem === "edit" ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllComplaints;

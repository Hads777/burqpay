import { useEffect, useRef, useState } from "react";
import { Menu, Select, Dropdown, Button, Input, Form, Modal } from "antd";
import TableView from "../TableView/TableView";
import { FaFilter, FaPersonBooth, FaSearch } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  complaintTypeList,
  deleteComplaints,
  getAllComplaintsAssign,
  getAlldepartments,
  getAssignList,
  getComplaintsSubType,
} from "../../redux/apis/apisCrud";
import arrowDown from "../../assets/images/arrow-down.png";
import toast from "react-hot-toast";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons"; ////
import { useNavigate, useParams } from "react-router-dom";
import MaskedValue from "../MaskedValue";

const LogsTransaction = () => {
  const [pageSize, setPageSize] = useState(15);
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [complaints, setComplaints] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [subtypes, setSubtypes] = useState([]);
  const [filteredSubtypes, setFilteredSubtypes] = useState([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(3);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState();
  const [assignTo, setAssignTo] = useState<any>([]);
  const [totalPage, setTotalPage] = useState(1);
  const [department, setDepartment] = useState<any>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    assign_from_comment: "",
    complaint_id: "",
    department_id: "",
    assigned_to: "",
    status: "",
  });
  const handleFilter = (value) => {
    setSelectedFilters(value[0]);
  };
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
      name: "Name",
      selector: (row: { name: any }) => row.name,
      sortable: true,
      width: "230px",
    },
    {
      name: "Phone",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
    },

    {
      name: "Cnic",
      cell: (row: any) => (
        <MaskedValue value={row.cnic} showToggle={false} unmaskedCount={4} />
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Total Balance",
      cell: (row: any) => (
        <MaskedValue
          value={row.accountBalance}
          showToggle={true}
          unmaskedCount={0}
        />
      ),
      width: "200px",
      sortable: true,
    },
    {
      name: "Register Date",
      selector: (row: { UpdatedBy: any }) => row.UpdatedBy,
      sortable: true,
      width: "200px",
    },
    {
      name: "Type",
      selector: (row: { accountType: any }) => row.accountType,
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
              row.accountStatus === "active"
                ? "rgba(63, 195, 128, 0.9)"
                : row.accountStatus === "inactive"
                ? "#F84D4D"
                : "transparent",
            color: "white",
            cursor: row.accountStatus === "active" ? "pointer" : "default",
          }}
        >
          {row.accountStatus == "active" ? "Active" : "Inactive"}
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


  const getComplaints = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getAllComplaintsAssign(page, pageSize, id);
      if (response) {
        const data = response?.data?.data;
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
  };

  // useEffect(() => {
  //   getComplaints();
  // }, [page, pageSize]);

  const getComplaintTypes = async () => {
    try {
      const response = await complaintTypeList(1, 1000);
      setComplaintTypes(response?.data?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load complaint types");
    }
  };
  const getAssignDepartment = async () => {
    try {
      const res = await getAlldepartments(
        page,
        pageSize,
        searchTerm,
        selectedFilters
      ); // Your API function
      const data = res?.data?.data?.data || []; // Adjust if your structure differs
      setDepartment(data);
    } catch (error) {
      toast.error("Failed to fetch subtypes");
    }
  };
  const getSubtypes = async () => {
    try {
      const res = await getComplaintsSubType(0); // Your API function
      const data = res?.data?.data?.data || []; // Adjust if your structure differs
      setSubtypes(data);
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
      navigate("/Customers/AllComplaints/Assign");
    }
  };

  const handleOnHide = () => {
    setShowModal(false);
    setEditRowId(null);
    setSelectedItem(null);
    setFormData({
      assign_from_comment: "",
      complaint_id: "",
      department_id: "",
      assigned_to: "",
      status: "",
    });
  };

  const handleEditClick = (row: any) => {
    setEditRowId(row.id);
    setSelectedItem("edit");
    setShowModal(true);

    setFormData({
      assign_from_comment: row.assign_from_comment || "",
      complaint_id: row.complaint_id || "",
      department_id: row.department_id || "",
      assigned_to: row.assigned_to || "",
      status: row.status || "",
    });
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
  // useEffect(() => {
  //   getComplaintTypes();
  //   getSubtypes();
  // }, []);

  const mappedData =
    complaints &&
    complaints?.map((item: any) => {
      return {
        id: item?.id,
        assign_from_comment: item?.assign_from_comment,
        complain_number: item?.complaint.complain_number || "-",
        complainer_name: item?.complaint.complainer_name || "-",
        complainer_no: item?.complaint.complainer_no || "-",
        description: item?.complaint.description || "-",
        priority: item?.complaint.priority || "-",
        assigned_to: item?.assigned_to_user?.name || "-",
        status: item?.status || "-",
      };
    });

  const getAssignTo = async () => {
    try {
      const res = await getAssignList(formData.department_id);

      const data = res?.data?.data || [];
      setAssignTo(data);
    } catch (error) {
      toast.error("Failed to fetch subtypes");
    }
  };

  // useEffect(() => {
  //   getAssignDepartment();
  //   if (formData.department_id) {
  //     getAssignTo();
  //   }
  // }, [formData.department_id]);

  // useEffect(() => {
  //   if (formData.department_id) {
  //     setFilteredSubtypes(
  //       subtypes.filter((sub) => sub.department_id === formData.department_id)
  //     );
  //   } else {
  //     setFilteredSubtypes([]);
  //   }
  // }, [formData.department_id, subtypes]);
  const handleCancel = () => {
    setShowModal(false);
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
  return (
    <div className="service">
      {/* <TableView
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
      /> */}
            <TableView
        header={Activity_Loans_Header}
        data={dummyUserMapped}
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

export default LogsTransaction;

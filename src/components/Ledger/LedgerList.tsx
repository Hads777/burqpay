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

const LedgerList = () => {
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
  const [form] = Form.useForm();
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
    form.resetFields();
  };

  const handleMenuClick = (key: string, data: any) => {
    setSelectedItem(key);
    setRowData(data);

    if (key === "edit") {
      // Open modal in edit mode and prefill if data exists
      setIsModalVisible(true);
      form.setFieldsValue({
        bankId: data?.bankId || undefined,
        accountTitle: data?.accountTitle || "",
        accountNumber: data?.accountNumber || "",
      });
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
  const dummyUserMapped = [
    {
      id: 1,
      srNo: "01",
      invoiceId: "1755246645",
      customerName: "Ahmad Aziz",
      gateway: "VISA",
      credit: "0.00",
      debit: "0.00",
      pay: "Paid through Card",
    },
    {
      id: 2,
      srNo: "02",
      invoiceId: "1755246645",
      customerName: "Ahmad Aziz",
      gateway: "VISA",
      credit: "0.00",
      debit: "0.00",
      pay: "Paid through Card",
    },
    {
      id: 3,
      srNo: "01",
      invoiceId: "1755246645",
      customerName: "Ahmad Aziz",
      gateway: "VISA",
      credit: "0.00",
      debit: "0.00",
      pay: "Paid through Card",
    },
    {
      id: 4,
      srNo: "02",
      invoiceId: "1755246645",
      customerName: "Ahmad Aziz",
      gateway: "VISA",
      credit: "0.00",
      debit: "0.00",
      pay: "Paid through Card",
    },
  ];

  // Ledger table headers – match design (Sr No, Invoice ID, Customer Name, Gate Way, Credit, Debit, Pay)
  const Activity_Loans_Header = [
    {
      name: "Sr No.",
      selector: (row: { srNo: any }) => row.srNo,
      sortable: true,
      width: "90px",
    },
    {
      name: "Invoice ID",
      selector: (row: { invoiceId: any }) => row.invoiceId,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row: { customerName: any }) => row.customerName,
      sortable: true,
    },
    {
      name: "Gate Way",
      selector: (row: { gateway: any }) => row.gateway,
      sortable: true,
    },
    {
      name: "Credit",
      selector: (row: { credit: any }) => row.credit,
      sortable: true,
    },
    {
      name: "Debit",
      selector: (row: { debit: any }) => row.debit,
      sortable: true,
    },
    {
      name: "Pay",
      selector: (row: { pay: any }) => row.pay,
      sortable: true,
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
        invoiceId: item?.invoiceId || "",
        customerName: item?.customerName || "",
        gateway: item?.gateway || "",
        credit: item?.credit || "0.00",
        debit: item?.debit || "0.00",
        pay: item?.pay || "",
      };
    });
  const handleSubmitBank = (values: any) => {
    // For now just show a toast and close; integrate API later
    toast.success(
      selectedItem === "edit" ? "Bank updated successfully" : "Bank created successfully"
    );
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="service customer-list-page">
      {skelitonLoading && <Loader />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        
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
        title={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <div className="service customer-form-page" style={{ marginBottom: 0 }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold">
              {selectedItem === "edit" ? "Bank Edit" : "Bank Create"}
            </h4>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmitBank}
            className="customer-form shadow-sm p-4 bg-white rounded"
          >
            <Form.Item className="" name="tenantName">
                <div className="custom-input-container">
                  <label className="input-label">Tenant Name</label>
                  <Select
                    placeholder="Placeholder"
                    style={{ height: "56px" }}
                    className="fs-6"
                  >
                    <Option value="option1">Option 1</Option>
                    <Option value="option2">Option 2</Option>
                  </Select>
                </div>
              </Form.Item>
            <Form.Item className="py-2">
                <div className="custom-input-container">
                  <label className="input-label">Account Title</label>
                  <Input
                    placeholder="Placeholder"
                    className="fs-6"
                    value="Account Title"
                    style={{ height: "56px" }}
                  />
                </div>
              </Form.Item>
            
            <Form.Item className="">
                <div className="custom-input-container">
                  <label className="input-label">Account Number</label>
                  <Input
                    placeholder="Placeholder"
                    className="fs-6"
                    value="Title"
                    style={{ height: "56px" }}
                  />
                </div>
              </Form.Item>

            <div className="d-flex justify-content-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#C91E14",
                  borderColor: "#C91E14",
                  borderRadius: "6px",
                  padding: "8px 32px",
                }}
              >
                Save
              </Button>
            </div>
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

export default LedgerList;

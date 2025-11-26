import { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Dropdown,
  Menu,
  Modal,
  Select,
  Switch,
} from "antd";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import {
  changePackageStatus,
  deletePackage,
  getPackagesList,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { navigate } from "../../utils/const.utils";
import moment from "moment";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
const CustomerReports = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [editRowData, setEditRowData] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchWallet, setSearchWallet] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteApiId, setDeleteApiId] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  let formatDateString = (date: moment.Moment) => {
    let str = date.format("YYYY-MM-DD");
    // Replace / with \/
    str = str.replace(/\//g, "\\/");
    return str;
  };

  const handleStatusChange = async (value: any, status: any) => {
    try {
      const body = {
        _method: "put",
        status: status ? 1 : 0,
      };
      await toast.promise(
        changePackageStatus(body, value), // The promise to track
        {
          loading: "Changing Status...", // Loading state message
          success: (res) => {
            if (res?.data?.success) {
              getListPackages();
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
  const handleEditClick = (row: any) => {
    navigate(`/Packages/AddNewPackage/EditPackage/${row.id}`);
    setEditRowData(row);
  };
  const handleView = (row: any) => {
    navigate(`/Packages/View/PackageDetails/${row.id}`);
  };
  const handleChange = (key: string, row: any) => {
    if (key === "edit") {
      handleEditClick(row);
    } else if (key === "view") {
      handleView(row);
    } else if (key === "delete") {
      setDeleteApiId(row?.id);
      // handleDeletePackage(row);
      setIsDeleteModalVisible(true);
    }
  };
  const handleDeletePackage = async (deleteApiId) => {
    try {
      setIsLoading(true);
      await toast.promise(
        deletePackage(deleteApiId), // The promise to track
        {
          loading: "Deleting Package...", // Loading state message
          success: (res: any) => {
            if (res?.data?.success) {
              getListPackages();
              setIsDeleteModalVisible(false);
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
  const menuItems = [
  {
    key: 'edit',
    icon: <EditOutlined />,
    label: 'Edit',
  },
  {
    key: 'view',
    icon: <EyeOutlined />,
    label: 'Details',
  },
  {
    key: 'delete',
    icon: <DeleteOutlined />,
    label: 'Delete',
  },
];
  const menu = (row: any) => (
   <Menu onClick={({ key }) => handleChange(key, row)} items={menuItems}/>
  );
  function formatLabel(text: string): string {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      selector: (row: { Sr: any }) => row.Sr,
      sortable: true,
      width: "80px",
    },
    {
      name: "Package ID",
      selector: (row: { package_id: any }) => row.package_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Package Name",
      selector: (row: { package_name: any }) => row.package_name,
      sortable: true,
      width: "240px",
    },
    {
      name: "Vendor",
      selector: (row: { vendor: any }) => row.vendor,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: { description: any }) => row.description,
      sortable: true,
      width: "280px",
    },
    {
      name: "Category",
      selector: (row: { category: any }) => row.category,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row: { status: any; id: any }) => (
        <Switch
          checked={row.status === "active"}
          onChange={(checked) => handleStatusChange(row.id, checked)}
        />
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
              //background: "linear-gradient(100deg, #DEF5FF, #90CAFF)",
              color: "#000000",
              borderColor: "white",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Select <DownOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const getListPackages = async () => {
    const fromStr = fromDate ? formatDateString(fromDate) : "";
    const toStr = toDate ? formatDateString(toDate) : "";
    try {
      setSkelitonLoading(true);

      const response = await getPackagesList({
        search: searchWallet,
        page,
        pageSize,
        from: fromStr,
        to: toStr,
      });
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
    getListPackages();
  }, [page, pageSize, fromDate, toDate, searchWallet]);

  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        id: item.id || "-",
        Sr: index + from,
        package_name: item?.package_name || "-",
        category: formatLabel(item?.category) || "-",
        description: item?.description || "-",
        package_id: item?.package_id || "-",
        vendor: item?.vendor || "-",
        status: item?.status,
      };
    });

  return (
    <>
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
                onChange={(e: any) => {
                  setSearchWallet(e.target.value);
                }}
                value={searchWallet}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                }}
                className="p-2"
                placeholder="Search..."
              />
            </div>
            {/* <div className="d-flex gap-1">
              <DatePicker
                value={fromDate}
                onChange={(date) => {
                  setFromDate(date);
                }}
              >
                from
              </DatePicker>
              <DatePicker
                value={toDate}
                onChange={(date) => {
                  setToDate(date);
                }}
              >
                to
              </DatePicker>
            </div> */}
            <div>
              <button
                className="theme-btn"
                onClick={() => {
                  //navigate("/Packages/AddNewPackage");
                }}
              >
                Export CSV
              </button>
            </div>
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
          setPageSize={setPageSize}
          pageSize={pageSize}
          to={to}
        />
      </div>
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
            onClick={() => {
              handleDeletePackage(deleteApiId);
            }}
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
            Are you sure you want to delete this Package?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CustomerReports;

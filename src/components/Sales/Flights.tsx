import { useEffect, useState } from "react";
import TableView from "../TableView/TableView";
import { FaFilter } from "react-icons/fa";
import { Images } from "../Config/Images";
import { getIbft, orderStatusChange } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button, Dropdown, Menu, Select, Tabs, Modal, Input, Form } from "antd";
import arrowDown from "../../assets/images/arrow-down.png";
import { DeleteOutlined, EditOutlined, StarTwoTone } from "@ant-design/icons";
import { navigate } from "../../utils/const.utils";
import { setFlightDetails } from "../../redux/apis/apisSlice";
import FlightDetails from "../Customer/FlightDetails";
import { useDispatch } from "react-redux";
import { StatsFs } from "fs";
const Flights = () => {
  const [skelitonLoading, setSkelitonLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [rowData, setRowData] = useState<any>({});
  const [status, setStatus] = useState<any>();
  const [totalRows, setTotalRows] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const dispatch = useDispatch();
  const getIbftData = async () => {
    try {
      setSkelitonLoading(true);

      const response = await getIbft(page);
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
    getIbftData();
  }, [page]);
  const dummyUserMapped = [
    {
      Sr: 1,
      trx_id: "TX123456789",
      rrn: "RRN789456123",
      sender_account_name: "Ali Raza",
      sender_account_no: "PK45HBL0123456789",
      receiver_account_name: "Ahmed Khan",
      receiver_account: "PK12UBL9876543210",
      amount: 25000,
      trx_type: "Bank Transfer",
      Fee: 200,
      created_at: "2024-05-06 10:15:00",
      status: "completed",
    },
    {
      Sr: 2,
      trx_id: "TX223456789",
      rrn: "RRN789456124",
      sender_account_name: "Sara Tariq",
      sender_account_no: "PK91MCB0012345678",
      receiver_account_name: "Hassan Bilal",
      receiver_account: "PK30BAHL7654321098",
      amount: 10000,
      trx_type: "Mobile Wallet",
      Fee: 100,
      created_at: "2024-05-06 12:45:00",
      status: "cancelled",
    },
    {
      Sr: 3,
      trx_id: "TX323456789",
      rrn: "RRN789456125",
      sender_account_name: "Faisal Ahmed",
      sender_account_no: "PK33HBL0987654321",
      receiver_account_name: "Zara Aslam",
      receiver_account: "PK09UBL5432167890",
      amount: 5000,
      trx_type: "Utility Payment",
      Fee: 50,
      created_at: "2024-05-06 14:20:00",
      status: "completed",
    },
  ];
  const menu = (row: any) => (
    <Menu>
  <Menu.Item
        key="edit"
        // icon={< details/>}
        onClick={() =>{navigate("Booking/Flights/FlightDetails");  
        dispatch(setFlightDetails({ flightDetails: row?.details }));}}
      >
        Details
      </Menu.Item>
     
      <Menu.Item
        key="status"
        // icon={<StarTwoTone />}
        onClick={() => { setRowData(row),setIsModalVisible(true),setStatus(row?.status=="reserved"?1:row?.status=="confirmed"?2:row?.status=="cancelled"?3:row?.status=="void"?4:5)}}
      >
        Change Status
      </Menu.Item>
    </Menu>
  );
  const Activity_Loans_Header = [
    {
      name: "Sr:",
      cell: (row: { Sr: any }) => row.Sr,
      sortable: true,
      width: "80px",
    },

    {
      name: "Order No.",
      selector: (row: { order: any }) => row.order,
      sortable: true,
      width: "160px",
    },
    {
      name: "Customer Name",
      selector: (row: { customer_name: any }) => row.customer_name,
      sortable: true,
      width: "180px",
  
    },
    {
      name: "Email",
      selector: (row: { email: any }) => row.email,
      sortable: true,
      width: "180px",

    },
    {
      name: "Mobile No",
      selector: (row: { mobile_no: any }) => row.mobile_no,
      sortable: true,
      width: "160px",
    },
    {
      name: "PNR",
      selector: (row: { passengers: any }) =>
        row.passengers,
      sortable: true,
      width: "180px",
     
    },
    {
      name: "Trip",
      cell: (row: { trip: any }) => (
        <div onClick={()=>{console.log(row.trip,"1122")}}>
        {row.trip}
        </div>
      ),
      sortable: true,
      width: "180px",
     
    },
    {
      name: "Ticket Type",
      selector: (row: { tType: any }) => row.tType,
      sortable: true,
      width: "160px",
    },
    // {
    //   name: "Booking Date",
    //   selector: (row: { bDate: any }) => row.bDate,
    //   sortable: true,
    //   width: "180px",
    // },
    {
      name: "Travel Date",
      selector: (row: { tDate: any }) => row.tDate,
      sortable: true,
      width: "180px",
    },
    // {
    //   name: "Return Date",
    //   selector: (row: { rDate: any }) => row.rDate,
    //   sortable: true,
    //   width: "180px",
    // },
    {
      name: "Air Line",
      selector: (row: { class: any }) => row.class,
      sortable: true,
      width: "180px",
    },
    // {
    //   name: "Supplier",
    //   selector: (row: { supplier: any }) => row.supplier,
    //   sortable: true,
    //   width: "160px",
    // },
    {
      name: "Amount",
      selector: (row: { amount: any }) => row.amount,
      sortable: true,
      width: "150px",
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
              row.status === 'confirmed'
                ? "rgba(63, 195, 128, 0.9)":   row.status === 'cancelled'?"#F84D4D":row.status === 'refund'?"#FF9811": "#17578D",
               
            color: "white",
            cursor: row.status === 1 ? "pointer" : "default",
          }}
        >
          {row.status=="confirmed"?"Confirmed":row.status=="reserved"?"Reserved":row.status=="cancelled"?"Cancelled":row.status=="void"?"Void":"Refund"}
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
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleStatusChange = async () => {

    try {
      const body = {
        order_number:rowData?.order,
        status: status,
        type:1,
      };
      await toast.promise(
        orderStatusChange(body),
        {
          loading: "Changing Status...",
          success: (res) => {
            if (res?.data?.success) {
              setIsModalVisible(false);
              getIbftData();
              return res?.data?.message;
            } else if (res?.data?.errors) {
              throw new Error(res.data.errors[0]);
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
  const mappedData =
    data &&
    data?.map((item: any, index) => {
      return {
        id: item?.id,
        details:item,
        Sr: index + 1,
        order: item?.order_number||"------",
        trip:`${item.data?.flight_details?.inbound?item.data?.flight_details?.inbound?.flightStartAirline:item.data?.flight_details?.outbound?.flightStartAirline||"----"}-${item.data?.flight_details?.inbound?item.data?.flight_details?.inbound?.flightEndAirline:item.data?.flight_details?.outbound?.flightEndAirline||"----"}`||"----",
        customer_name: item?.customer_name||"------",
        email: item?.email||"------",
        mobile_no: item?.mobile_no||"------",
        passengers: item?.data?.booking_details?.pnr||"-",
        tType: item?.data?.flight_details?.flightDiresction||"-----",
        bDate: item?.created_at||"------",
        tDate: item?.data?.flight_details?.outbound?.flightStartDate||"-----",
        rDate: item?.rDate||"------",
        class: item?.data?.flight_details?.airLineName||"------",
        supplier: item?.data?.flight_details?.supplier||"-",
        amount: item?.total_amount||"------",
        status: item?.status,  
      };
    });
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mappedData || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IBFT");
    XLSX.writeFile(workbook, "IBFT.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Sr",
      "TID",
      "RRN",
      "Sender Name",
      "Sender Account",
      "Reciever Name",
      "Reciever Account",
      "Amount",
      "Type",
      "Fee",
      "Created At",
      "Status",
    ];

    const tableRows = mappedData?.map((item: any) => [
      item.Sr,
      item.trx_id,
      item.rrn,
      item.sender_account_name,
      item.sender_account_no,
      item.receiver_account_name,
      item.receiver_account,
      item.amount,
      item.trx_type,
      item.Fee || "N/A",
      item.created_at,
      item.status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("IBFT.pdf");
  };
  console.log(rowData,"12345678")
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
        title={ "Change Status"}
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
        
                handleStatusChange()
               
            }}
          >
            {"Submit"}
          </Button>,
        ]}
      >
        <div className={"cust-drop"}>
            <>
              <label>Status</label>
              <Select
                defaultValue={rowData?.accountStatus}
                value={status}
                style={{ width: "100%", marginTop: "10px" }}
                onChange={(value: string) => {
                  setStatus(value)
                }}
              >
                <option value={1}>Reserved</option>
                <option value={2}>Confirmed</option>
                <option value={3}>Cancelled</option>
                <option value={4}>Void</option>
                <option value={5}>Refund</option>
              </Select>
              <p className="edit-mod">Edit modal content</p>
            </>
       
        </div>
      </Modal>
        <TableView
          header={Activity_Loans_Header}
          data={mappedData}
          totalRows={totalRows}
          isLoading={skelitonLoading}
          from={from}
          pageSize={pageSize}
          page={page}
          totalPage={totalPage}
          setPage={setPage}
          to={to}
        />
      </div>
    </>
  );
};

export default Flights;

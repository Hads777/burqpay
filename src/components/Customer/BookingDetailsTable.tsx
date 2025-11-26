import { useState } from "react";
import profile from "../../assets/images/profile-img.png";
import { Images } from "../Config/Images";
import { Tab, Tabs } from "react-bootstrap";
import TransactionTopup from "./TransactionTopup";
import TransactionSpending from "./Visitors";
import TableView from "../TableView/TableView";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const BookingDetailsTable = () => {
  const flightDetails = useSelector((state: RootState) => state.block.flightDetails);
  const Header = [
    {
      name: "Passenger Title",
      // selector: (row: { Id: any }) => row.Id,
      sortable: true,
      width:"200px",
      cell: (row: any) => (
        <div
        // onClick={() => {
        //   navigate(`/Customers/CustomerDetails/${row.user_id}`);
        // }}
        >
          {row.title}
        </div>
      ),
  
    },
    {
      name: "Passenger Name",
      selector: (row: { name: any }) => row?.name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Passenger Email",
      selector: (row: { email: any }) => row.email,
      sortable: true,
      width: "200px",
    },
    {
      name: "Gender",
      cell: (row: any) => (
        // <MaskedValue
        //   value={row.accountBalance}
        //   showToggle={true}
        //   unmaskedCount={0}
        // />
        row.gender
      ),
      width: "220px",
      sortable: true,
    },
    {
      name: "Dob",
      selector: (row: { dob: any }) => row.dob,
      sortable: true,
      width: "220px",
    },
    {
        name: "Mobile No",
        selector: (row: { work_phone: any }) => row.work_phone,
        sortable: true,
        width: "220px",
      },
    {
        name: "Nationality",
        selector: (row: { nationality: any }) => row.nationality,
        sortable: true,
        width: "220px",
      },

       {
        name: "Passenger Type",
        selector: (row: { pType: any }) => row.pType,
        sortable: true,
        width: "220px",
      },
      {
        name: "Document Type",
        selector: (row: { dType: any }) => row.dType,
        sortable: true,
        width: "220px",
      }, 
 
  ];
  const mappedData =
  flightDetails &&
  flightDetails?.data?.booking_details?.paxData?.passengers?.map((item: any,index:any) => {
    return {
      id:item.id,
      title:item?.passenger_title|| "--------",
      name: item?.name || "--------",
      email: item?.email || "--------",
      dob: item?.dob || "--------",
      gender:item?.passenger_gender|| "--------",
      nationality: item?.nationality|| "--------",
      pType: item?.passenger_type || "--------",
      dType: item?.document_type || "--------",
      work_phone:item?.work_phone||"------"
    };
  });
  return (
    <>
      <div className="profile-tab mt-3">
      <TableView
        header={Header}
        data={mappedData}
        totalRows={2}
        pagination={false}
      
     
      />
         {!flightDetails?.data?.booking_details?.paxData?.passengers&& (
          <div
            className="d-flex justify-content-center mt-5"
            style={{ color: "red" }}
          >
            No data found
          </div>
        )}
      </div>
    </>
  );
};

export default BookingDetailsTable;

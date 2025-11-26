import { useState } from "react";
import profile from "../../assets/images/profile-img.png";
import { Images } from "../Config/Images";
import { Tab, Tabs } from "react-bootstrap";
import TransactionTopup from "./TransactionTopup";
import TransactionSpending from "./Visitors";
import TableView from "../TableView/TableView";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const OrderDetailsTable = () => {
  const packageDetails = useSelector((state: RootState) => state.block.packageDetails);
  const Header = [
 
    {
      name: "First Name",
      selector: (row: { firstName: any }) => row.firstName,
      sortable: true,
      width: "200px",
    },
    {
        name: "Last Name",
        selector: (row: { lastName: any }) => row?.lastName,
        sortable: true,
        width: "200px",
    },
    {
        name: "Gender",
        selector: (row: { gender: any }) => row?.gender,
        sortable: true,
        width: "200px",
    },
    {
        name: "Title",
        selector: (row: { title: any }) => row?.title,
        sortable: true,
        width: "200px",
    },
    
    {
      name: "Phone",
      selector: (row: { phone: any }) => row.phone,
      sortable: true,
      width: "220px",
    },
    {
      name: "Passport Number",
      selector: (row: { passportNum: any }) => row?.passportNum,
      width: "220px",
      sortable: true,
    },
    {
        name: "DOB",
        sortable: true,
        width:"180px",
        selector: (row: { dob: any}) => row.dob
    
    },
  ];
  const mappedData =
  packageDetails &&
  packageDetails?.data?.passengers?.map((item: any,index:any) => {
    return {
      id:item.id,
      firstName: item?.first_name || "--------",
      lastName: item?.last_name || "--------",
      passportNum: item?.passport_number || "--------",
      phone: item?.phone || "--------",
      dob: item?.DOB || "--------",
      gender: item?.gender || "--------",
      title: item?.title || "-"
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
        {!packageDetails?.data?.passengers && (
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

export default OrderDetailsTable;

import { useState } from "react";
import profile from "../../assets/images/profile-img.png";
import { Images } from "../Config/Images";
import { Tab, Tabs } from "react-bootstrap";
import TransactionTopup from "./TransactionTopup";
import TransactionSpending from "./Visitors";
import TableView from "../TableView/TableView";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

const FlightDetailsTable = () => {
  const flightDetails = useSelector((state: RootState) => state.block.flightDetails);
  const Header = [
 
    {
      name: "Departure at",
      selector: (row: { dDate: any }) => row.dDate,
      sortable: true,
      width: "200px",
    },
    {
        name: "Departure Airport",
        selector: (row: { dAirport: any }) => row?.dAirport,
        sortable: true,
        width: "200px",
      },
    {
        name: "Arrival at",
        // selector: (row: { Id: any }) => row.Id,
        sortable: true,
        width:"200px",
        cell: (row: any) => (
          <div
          // onClick={() => {
          //   navigate(`/Customers/CustomerDetails/${row.user_id}`);
          // }}
          >
            {row.aDate}
          </div>
        ),
    
      },
      {
        name: "Arrival Airport",
        selector: (row: { aAirport: any }) => row?.aAirport,
        sortable: true,
        width: "200px",
      },
    {
      name: "Flight No",
      cell: (row: any) => (
        // <MaskedValue
        //   value={row.accountBalance}
        //   showToggle={true}
        //   unmaskedCount={0}
        // />
        row.fNo
      ),
      width: "220px",
      sortable: true,
    },
    {
      name: "Estimated Time",
      selector: (row: { eTime: any }) => row.eTime,
      sortable: true,
      width: "220px",
    },
    {
        name: "Seats Available",
        selector: (row: { seatsAvailable: any }) => row.seatsAvailable,
        sortable: true,
        width: "220px",
      },
   
      {
        name: "Booking Code",
        selector: (row: { mCode: any }) => row.mCode,
        sortable: true,
        width: "220px",
      }, 
 
  ];
  const mappedData =
  flightDetails &&
  flightDetails?.data?.flight_details?.outbound?.segments?.map((item: any,index:any) => {
    return {
      id:item.id,
      aDate:`${item?.arrival?.date}, ${item?.arrival?.time}`|| "--------",
      aAirport: item?.arrival?.airport?.code || "--------",
      dAirport: item?.departure?.airport?.code || "--------",
      dDate: `${item?.departure?.date}, ${item?.departure?.time}` || "--------",
      fNo: item?.flightNumber || "--------",
      eTime: item?.estimatedTime || "--------",
      seatsAvailable:item?.flightDetail?.seatsAvailable|| "--------",
      mCode: item?.flightDetail?.bookingCode|| "--------",
      UpdatedBy: item?.updated_at || "--------",
      created_at: item?.created_at || "--------",
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
        {!flightDetails?.data?.flight_details?.outbound?.segments&& (
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

export default FlightDetailsTable;

import { useState } from "react";
import profile from "../../assets/images/profile-img.png";
import { Images } from "../Config/Images";
import { Tab, Tabs } from "react-bootstrap";
import TransactionTopup from "./TransactionTopup";
import TransactionSpending from "./Visitors";
import LogsTransaction from "./LogsTransaction";
import EventsLogs from "./EventsLogs";

const Logs = () => {
  const [selectTab, setSelectedTab] = useState("events");
  const customerDetails = [
    { label: "Name", value: "Johar Ali" },
    { label: "Account Number", value: "654321987" },
    { label: "Segment", value: "None" },
    {
      label: "Account Status",
      value: <span className="badge bg-success text-light">Active</span>,
    },
  ];

  const additionalDetails = [
    { label: "Account Level Code", value: "123456798" },
    { label: "Registration Type Code", value: "123456798" },
    { label: "Registration Type Code", value: "123456798" },
    { label: "Rnr", value: "1234" },
  ];
  const tapOptions = [
    {
      title: "Events Logs",
      key: "events",
      folder: <EventsLogs />,
    },
    {
      title: "Transactions",
      key: "transaction",
      folder: <LogsTransaction />,
    },
  ];
  return (
    <>
      <div className="profile-tab mt-3">
        <Tabs
          id="controlled-tab-example"
          className="mt-30 position-relative tabs-overflow"
          activeKey={selectTab}
          style={{ borderBottom: "none" }}
          onSelect={(tab: any) => {
            setSelectedTab(tab);
          }}
        >
          {tapOptions.map((item: any) => (
            <Tab eventKey={item.key} title={item.title}>
              <div className="mt-3">
                {selectTab === item.key && item.folder}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default Logs;

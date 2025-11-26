import { useState } from "react";
import profile from "../../assets/images/profile-img.png";
import { Images } from "../Config/Images";
import { Tab, Tabs } from "react-bootstrap";
import AllTransaction from "./AllTransaction";
import Logs from "./Logs";

const CustomerProfile = () => {
  const [selectTab, setSelectedTab] = useState("AllTransactions");
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
      title: "Transactions",
      key: "AllTransactions",
      folder: <AllTransaction />,
    },
    {
      title: "Activity Logs",
      key: "Logs",
      folder: <Logs />,
    },
  ];
  return (
    <>
      <div className="profile-sec mt-3">
        <div className="row g-3 align-items-center account-card">
          {/* <div className="col-md-2 text-center">
            <img
              src={profile}
              alt="Profile Image"
              className="img-fluid rounded"
            />
          </div> */}
          <div className="col-12">
            <div className="row p-3">
              <div className="col-6">
                {customerDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#6C727F",
                        fontSize: "14px",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-6">
                {additionalDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                {/* {selectTab === item.key && item.folder} */}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="profile-sec mt-3">
        <Tabs
          id="controlled-tab-example"
          className="mt-30"
          style={{ display: "none", borderBottom: "none" }}
          activeKey={selectTab}
          onSelect={(tab: any) => {
            setSelectedTab(tab);
          }}
        >
          {tapOptions.map((item: any) => (
            <Tab eventKey={item.key} title={""}>
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

export default CustomerProfile;

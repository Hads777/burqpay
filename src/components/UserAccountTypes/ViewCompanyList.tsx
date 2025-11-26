import { useState } from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "antd";
import TableView from "../TableView/TableView";

const ViewCompanyList = () => {
  const [selectTab, setSelectedTab] = useState("AllTransactions");
  const customerDetails = [
    { label: "Company ID", value: "Johar Ali" },
    { label: "Company Name", value: "654321987" },
    { label: "Status", value: "None" },
  ];

  const additionalDetails = [
    { label: "Cr Number", value: "123456798" },
    { label: "Country", value: "123456798" },
    { label: "City", value: "123456798" },
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

      <div className="row mt-4 p-3">
        <h5 className="mt-3 mb-3">Contact Person Details</h5>
        <div className="col-6">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Contact Person Name
            </label>
            <span className="">{123}</span>
          </div>
        </div>
        <div className="col-6">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Email
            </label>
            <span className="">{123}</span>
          </div>
        </div>
        <div className="col-6 mt-2">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Mobile No
            </label>
            <span className="">{123345647586}</span>
          </div>
        </div>
      </div>
      <div className="row mt-4 p-3">
        <h5 className="mt-3 mb-3">Company Details</h5>
        <div className="col-6">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Company Type
            </label>
            <span className="">{123}</span>
          </div>
        </div>
        <div className="col-6">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Company Email
            </label>
            <span className="">{123}</span>
          </div>
        </div>
        <div className="col-6 mt-2">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Company Phone No.
            </label>
            <span className="">{123345647586}</span>
          </div>
        </div>
        <div className="col-6 mt-2">
          <div
            className="d-flex justify-content-between align-items-center p-3"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #E3E3E3",
            }}
          >
            <label className="m-0" style={{ fontWeight: "bold" }}>
              Company Address
            </label>
            <span className="">{123345647586}</span>
          </div>
        </div>
      </div>
      <TableView />
    </>
  );
};

export default ViewCompanyList;

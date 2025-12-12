import React from "react";
import { Button } from "antd";
import { SyncOutlined, CheckOutlined } from "@ant-design/icons";

const Finish = () => {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      {/* Finish Title - Outside Card */}
      <div
        style={{
          marginBottom: "20px",
          margin: "0 auto 20px",
        }}
      >
        <h2
          style={{
            textAlign: "left",
            fontSize: "24px",
            fontWeight: 700,
            color: "#000000",
            margin: 0,
          }}
        >
          Finish
        </h2>
      </div>

      {/* White Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "60px 40px",
          width: "100%",
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Under Approval Heading */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#000000",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Under Approval
        </h1>

        {/* Approval Icon */}
        <div
          style={{
            position: "relative",
            width: "120px",
            height: "120px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Outer circle - light teal */}
          <div
            style={{
              position: "absolute",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#A7E0D9",
            }}
          />
          {/* Inner circle - darker teal */}
          <div
            style={{
              position: "relative",
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              backgroundColor: "#4AB7B5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* White icon - checkmark with circular arrow */}
            <div style={{ position: "relative", width: "48px", height: "48px" }}>
              {/* Circular arrow (SyncOutlined style) */}
              <SyncOutlined
                style={{
                  fontSize: "48px",
                  color: "#FFFFFF",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />
              {/* Checkmark overlay */}
              <CheckOutlined
                style={{
                  fontSize: "24px",
                  color: "#FFFFFF",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
        </div>

        {/* Informational Message */}
        <div
          style={{
            fontSize: "16px",
            color: "#000000",
            textAlign: "center",
            marginBottom: "40px",
            lineHeight: "1.6",
            maxWidth: "500px",
          }}
        >
          <p style={{ marginBottom: "8px" }}>
            Thank you ! Your request has been submitted and under Approval.
          </p>
          <p>We will update you in 24 Hours</p>
        </div>

        {/* Next Button */}
        <Button
          type="primary"
          onClick={() => {
            // Handle next button click
            console.log("Next clicked");
          }}
          style={{
            backgroundColor: "#E53935",
            borderColor: "#E53935",
            borderRadius: "8px",
            height: "40px",
            padding: "0 48px",
            fontSize: "14px",
            fontWeight: 500,
            minWidth: "120px",
            color: "#FFFFFF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D32F2F";
            e.currentTarget.style.borderColor = "#D32F2F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#E53935";
            e.currentTarget.style.borderColor = "#E53935";
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Finish;


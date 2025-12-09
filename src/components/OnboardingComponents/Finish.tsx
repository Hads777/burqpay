import React from "react";
import { Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

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
        {/* Congratulations Heading */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#000000",
            marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Congratulations!
        </h1>

        {/* Success Icon */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            backgroundColor: "#A7E0D9",
            border: "3px solid #7FD4C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <CheckCircleOutlined
            style={{
              fontSize: "64px",
              color: "#FFFFFF",
            }}
          />
        </div>

        {/* Informational Message */}
        <p
          style={{
            fontSize: "16px",
            color: "#000000",
            textAlign: "center",
            marginBottom: "24px",
            lineHeight: "1.6",
            maxWidth: "500px",
          }}
        >
          Your request has been submit and under approval, we will update you in
          24 hours.
        </p>

        {/* Sign In Link */}
        <p
          style={{
            fontSize: "16px",
            color: "#000000",
            textAlign: "center",
            marginBottom: "40px",
            lineHeight: "1.6",
          }}
        >
          Please click here to continue.{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Handle sign in navigation
              console.log("Sign In clicked");
            }}
            style={{
              color: "#FF0000",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign In
          </a>
        </p>

        {/* Next Button */}
        <Button
          type="primary"
          onClick={() => {
            // Handle next button click
            console.log("Next clicked");
          }}
          style={{
            backgroundColor: "#FF0000",
            borderColor: "#FF0000",
            borderRadius: "8px",
            height: "40px",
            padding: "0 48px",
            fontSize: "14px",
            fontWeight: 500,
            minWidth: "120px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E60000";
            e.currentTarget.style.borderColor = "#E60000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FF0000";
            e.currentTarget.style.borderColor = "#FF0000";
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Finish;


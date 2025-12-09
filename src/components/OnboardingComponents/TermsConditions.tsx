import React from "react";
import { Button } from "antd";

const TermsConditions = () => {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h2
          style={{
            textAlign: "left",
            fontSize: "24px",
            fontWeight: 700,
            color: "#333333",
            marginBottom: "32px",
          }}
        >
          Terms & Conditions
        </h2>

        {/* Content */}
        <div
          style={{
            color: "#000000",
            fontSize: "14px",
            lineHeight: "1.6",
            marginBottom: "40px",
          }}
        >
          {/* Introduction */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Introduction
            </h3>
            <p style={{ marginBottom: "12px" }}>
              Welcome to MYPAY's services provided by MYTM. These Terms &
              Conditions govern your use of our services. By accessing or using
              our services, you agree to be bound by these terms.
            </p>
          </div>

          {/* Service Agreement */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Service Agreement
            </h3>
            <p style={{ marginBottom: "12px" }}>
              This Service Agreement constitutes a legally binding agreement
              between you and MYTM. By using MYPAY services, you acknowledge
              that you have read, understood, and agree to be bound by all terms
              and conditions set forth herein.
            </p>
          </div>

          {/* Registration */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Registration
            </h3>
            <p style={{ marginBottom: "12px" }}>
              To access certain features of our services, you may be required to
              register for an account. You agree to provide accurate, current,
              and complete information during the registration process and to
              update such information to keep it accurate, current, and
              complete.
            </p>
          </div>

          {/* Use of Services */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Use of Services
            </h3>
            <p style={{ marginBottom: "12px" }}>
              You agree to use our services only for lawful purposes and in
              accordance with these Terms & Conditions. You agree not to use the
              services in any way that violates any applicable federal, state,
              local, or international law or regulation.
            </p>
          </div>

          {/* Intellectual Property */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Intellectual Property
            </h3>
            <p style={{ marginBottom: "12px" }}>
              All content, features, and functionality of the services,
              including but not limited to text, graphics, logos, and software,
              are the exclusive property of MYTM and are protected by
              international copyright, trademark, patent, trade secret, and other
              intellectual property laws.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Limitation of Liability
            </h3>
            <p style={{ marginBottom: "12px" }}>
              To the fullest extent permitted by applicable law, MYTM shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use, goodwill,
              or other intangible losses.
            </p>
          </div>

          {/* Termination */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Termination
            </h3>
            <p style={{ marginBottom: "12px" }}>
              We may terminate or suspend your account and access to the
              services immediately, without prior notice or liability, for any
              reason whatsoever, including without limitation if you breach the
              Terms & Conditions.
            </p>
          </div>

          {/* Governing Law */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Governing Law
            </h3>
            <p style={{ marginBottom: "12px" }}>
              These Terms & Conditions shall be governed by and construed in
              accordance with the laws of [Jurisdiction], without regard to its
              conflict of law provisions.
            </p>
          </div>

          {/* Changes to Terms */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Changes to Terms
            </h3>
            <p style={{ marginBottom: "12px" }}>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms & Conditions at any time. If a revision is material,
              we will provide at least 30 days notice prior to any new terms
              taking effect.
            </p>
          </div>

          {/* Privacy Policy */}
          <div style={{ marginBottom: "24px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Privacy Policy
            </h3>
            <p style={{ marginBottom: "12px" }}>
              Your use of our services is also governed by our Privacy Policy.
              Please review our Privacy Policy to understand our practices
              regarding the collection and use of your personal information.
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <Button
            onClick={() => {
              // Handle previous button click
              console.log("Previous clicked");
            }}
            style={{
              backgroundColor: "#808080",
              borderColor: "#808080",
              color: "#FFFFFF",
              borderRadius: "8px",
              height: "40px",
              padding: "0 32px",
              fontSize: "14px",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#707070";
              e.currentTarget.style.borderColor = "#707070";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#808080";
              e.currentTarget.style.borderColor = "#808080";
            }}
          >
            Previous
          </Button>
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
              padding: "0 32px",
              fontSize: "14px",
              fontWeight: 500,
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
    </div>
  );
};

export default TermsConditions;


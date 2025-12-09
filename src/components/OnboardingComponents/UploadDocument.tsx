import React, { useState, useRef } from "react";
import { Button } from "antd";

const UploadDocument = () => {
  const [files, setFiles] = useState({
    cnicFront: null as File | null,
    cnicBack: null as File | null,
    ntnCertificate: null as File | null,
  });

  const cnicFrontRef = useRef<HTMLInputElement>(null);
  const cnicBackRef = useRef<HTMLInputElement>(null);
  const ntnCertificateRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (
    field: "cnicFront" | "cnicBack" | "ntnCertificate",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] || null;
    setFiles((prev) => ({
      ...prev,
      [field]: selectedFile,
    }));
  };

  const handleChooseFile = (field: "cnicFront" | "cnicBack" | "ntnCertificate") => {
    if (field === "cnicFront") {
      cnicFrontRef.current?.click();
    } else if (field === "cnicBack") {
      cnicBackRef.current?.click();
    } else if (field === "ntnCertificate") {
      ntnCertificateRef.current?.click();
    }
  };

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
          margin: "0 auto",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
          Upload Documents
        </h2>

        {/* Upload Sections */}
        <div style={{ marginBottom: "32px" }}>
          {/* CNIC Front and Back - Side by Side */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* CNIC Front */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#333333",
                  marginBottom: "12px",
                }}
              >
                CNIC Front
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "40px",
                }}
              >
                <input
                  type="file"
                  ref={cnicFrontRef}
                  onChange={(e) => handleFileChange("cnicFront", e)}
                  style={{ display: "none" }}
                  accept="image/*,.pdf"
                />
                <button
                  type="button"
                  onClick={() => handleChooseFile("cnicFront")}
                  style={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "0 16px",
                    height: "100%",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#666666",
                    cursor: "pointer",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Choose File
                </button>
                <div
                  style={{
                    flex: 1,
                    padding: "0 16px",
                    fontSize: "14px",
                    color: "#999999",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {files.cnicFront
                    ? files.cnicFront.name
                    : "No file chosen"}
                </div>
              </div>
            </div>

            {/* CNIC Back */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#333333",
                  marginBottom: "12px",
                }}
              >
                CNIC Back
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #E0E0E0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  height: "40px",
                }}
              >
                <input
                  type="file"
                  ref={cnicBackRef}
                  onChange={(e) => handleFileChange("cnicBack", e)}
                  style={{ display: "none" }}
                  accept="image/*,.pdf"
                />
                <button
                  type="button"
                  onClick={() => handleChooseFile("cnicBack")}
                  style={{
                    backgroundColor: "#F5F5F5",
                    border: "none",
                    padding: "0 16px",
                    height: "100%",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#666666",
                    cursor: "pointer",
                    borderRadius: "8px 0 0 8px",
                  }}
                >
                  Choose File
                </button>
                <div
                  style={{
                    flex: 1,
                    padding: "0 16px",
                    fontSize: "14px",
                    color: "#999999",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {files.cnicBack ? files.cnicBack.name : "No file chosen"}
                </div>
              </div>
            </div>
          </div>

          {/* NTN Certificate - Full Width */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              NTN Certificate
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
                overflow: "hidden",
                height: "40px",
              }}
            >
              <input
                type="file"
                ref={ntnCertificateRef}
                onChange={(e) => handleFileChange("ntnCertificate", e)}
                style={{ display: "none" }}
                accept="image/*,.pdf"
              />
              <button
                type="button"
                onClick={() => handleChooseFile("ntnCertificate")}
                style={{
                  backgroundColor: "#F5F5F5",
                  border: "none",
                  padding: "0 16px",
                  height: "100%",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#666666",
                  cursor: "pointer",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                Choose File
              </button>
              <div
                style={{
                  flex: 1,
                  padding: "0 16px",
                  fontSize: "14px",
                  color: "#999999",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {files.ntnCertificate
                  ? files.ntnCertificate.name
                  : "No file chosen"}
              </div>
            </div>
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
              console.log("Next clicked", files);
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

export default UploadDocument;


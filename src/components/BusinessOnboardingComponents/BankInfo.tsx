import React, { useState, useRef } from "react";
import { Form, Input, Select, Button } from "antd";

const { Option } = Select;

const BankInfo = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    iban: "",
    accountMaintenanceCertificate: null as File | null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      accountMaintenanceCertificate: selectedFile,
    }));
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // Sample bank names - replace with actual bank list
  const bankNames = [
    "Allied Bank Limited",
    "Askari Bank Limited",
    "Bank Alfalah Limited",
    "Bank of Punjab",
    "Faysal Bank Limited",
    "Habib Bank Limited",
    "MCB Bank Limited",
    "Meezan Bank Limited",
    "National Bank of Pakistan",
    "United Bank Limited",
  ];

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
          Bank Info
        </h2>

        {/* Form */}
        <Form layout="vertical">
          {/* Bank Name and IBAN - Side by Side */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Bank Name */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Bank Name
                  </span>
                }
                style={{ marginBottom: 0 }}
              >
                <Select
                  placeholder="Text Placeholder"
                  value={formData.bankName || undefined}
                  onChange={(value) => handleInputChange("bankName", value)}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  {bankNames.map((bank) => (
                    <Option key={bank} value={bank}>
                      {bank}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* IBAN */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    IBAN
                  </span>
                }
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.iban}
                  onChange={(e) => handleInputChange("iban", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>
            </div>
          </div>

          {/* Upload Account Maintenance Certificate */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 500,
                color: "#333333",
                marginBottom: "12px",
              }}
            >
              Upload Account Maintenance Certificate
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
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*,.pdf"
              />
              <button
                type="button"
                onClick={handleChooseFile}
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
                {formData.accountMaintenanceCertificate
                  ? formData.accountMaintenanceCertificate.name
                  : "No file chosen"}
              </div>
            </div>
          </div>
        </Form>

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
              console.log("Next clicked", formData);
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

export default BankInfo;


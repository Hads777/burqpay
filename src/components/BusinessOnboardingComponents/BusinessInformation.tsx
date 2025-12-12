import React, { useState, useRef } from "react";
import { Form, Input, Select, Button, Radio } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const BusinessInformation = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessPhoneNo: "",
    businessAddress: "",
    businessEmail: "",
    ntnNo: "",
    sourceOfIncome: "",
    companyType: "Private Limited",
    businessAddressFile: null as File | null,
    companyRegistrationCertificate: null as File | null,
    fromA: null as File | null,
    from2: null as File | null,
  });

  const businessAddressFileRef = useRef<HTMLInputElement>(null);
  const companyRegistrationCertificateRef = useRef<HTMLInputElement>(null);
  const fromARef = useRef<HTMLInputElement>(null);
  const from2Ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      [field]: selectedFile,
    }));
  };

  const handleChooseFile = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  return (
    <>
      <style>
        {`
          .business-info-radio .ant-radio-checked .ant-radio-inner {
            border-color: #4AB7B5 !important;
            background-color: #4AB7B5 !important;
          }
          .business-info-radio .ant-radio-checked .ant-radio-inner::after {
            background-color: #FFFFFF !important;
          }
          .business-info-radio .ant-radio-inner {
            border-color: #D9D9D9 !important;
          }
        `}
      </style>
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
          Business Information
        </h2>

        {/* Form */}
        <Form layout="vertical">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Business Name */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Business Name
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* Business Phone No. */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Business Phone No.
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  addonBefore={
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span>🇵🇰</span>
                      <span>+92</span>
                    </span>
                  }
                  placeholder="0300 - 1234657"
                  value={formData.businessPhoneNo}
                  onChange={(e) =>
                    handleInputChange("businessPhoneNo", e.target.value)
                  }
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* Business Address */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Business Address
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <TextArea
                  placeholder="Text Placeholder"
                  value={formData.businessAddress}
                  onChange={(e) =>
                    handleInputChange("businessAddress", e.target.value)
                  }
                  rows={4}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                  }}
                />
              </Form.Item>
            </div>

            {/* Right Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Business Email */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Business Email
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  type="email"
                  placeholder="Text Placeholder"
                  value={formData.businessEmail}
                  onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* NTN No. */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    NTN No.
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.ntnNo}
                  onChange={(e) => handleInputChange("ntnNo", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* Source of Income */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Source of Income
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Select
                  placeholder="Text Placeholder"
                  value={formData.sourceOfIncome || undefined}
                  onChange={(value) => handleInputChange("sourceOfIncome", value)}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  <Option value="salary">Salary</Option>
                  <Option value="business">Business</Option>
                  <Option value="investment">Investment</Option>
                  <Option value="rental">Rental</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          {/* Select Company Type */}
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
              Select Company Type
            </label>
            <Radio.Group
              className="business-info-radio"
              value={formData.companyType}
              onChange={(e) => handleInputChange("companyType", e.target.value)}
              style={{ display: "flex", gap: "24px" }}
            >
              <Radio
                value="Private Limited"
                style={{
                  fontSize: "14px",
                  color: "#333333",
                }}
              >
                Private Limited
              </Radio>
              <Radio
                value="Partnership"
                style={{
                  fontSize: "14px",
                  color: "#333333",
                }}
              >
                Partnership
              </Radio>
              <Radio
                value="Sole"
                style={{
                  fontSize: "14px",
                  color: "#333333",
                }}
              >
                Sole
              </Radio>
            </Radio.Group>
          </div>

          {/* Document Upload Fields */}
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
              Documents
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Business Address File */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333333",
                    marginBottom: "8px",
                  }}
                >
                  Business Address
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
                    ref={businessAddressFileRef}
                    onChange={(e) => handleFileChange("businessAddressFile", e)}
                    style={{ display: "none" }}
                    accept="image/*,.pdf"
                  />
                  <button
                    type="button"
                    onClick={() => handleChooseFile(businessAddressFileRef)}
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
                    {formData.businessAddressFile
                      ? formData.businessAddressFile.name
                      : "No file chosen"}
                  </div>
                </div>
              </div>

              {/* Company Registration Certificate */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333333",
                    marginBottom: "8px",
                  }}
                >
                  Company Registration Certificate
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
                    ref={companyRegistrationCertificateRef}
                    onChange={(e) => handleFileChange("companyRegistrationCertificate", e)}
                    style={{ display: "none" }}
                    accept="image/*,.pdf"
                  />
                  <button
                    type="button"
                    onClick={() => handleChooseFile(companyRegistrationCertificateRef)}
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
                    {formData.companyRegistrationCertificate
                      ? formData.companyRegistrationCertificate.name
                      : "No file chosen"}
                  </div>
                </div>
              </div>

              {/* From A */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333333",
                    marginBottom: "8px",
                  }}
                >
                  From A
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
                    ref={fromARef}
                    onChange={(e) => handleFileChange("fromA", e)}
                    style={{ display: "none" }}
                    accept="image/*,.pdf"
                  />
                  <button
                    type="button"
                    onClick={() => handleChooseFile(fromARef)}
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
                    {formData.fromA ? formData.fromA.name : "No file chosen"}
                  </div>
                </div>
              </div>

              {/* From 2 */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333333",
                    marginBottom: "8px",
                  }}
                >
                  From 2
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
                    ref={from2Ref}
                    onChange={(e) => handleFileChange("from2", e)}
                    style={{ display: "none" }}
                    accept="image/*,.pdf"
                  />
                  <button
                    type="button"
                    onClick={() => handleChooseFile(from2Ref)}
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
                    {formData.from2 ? formData.from2.name : "No file chosen"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>

        {/* Next Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "32px",
          }}
        >
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
    </>
  );
};

export default BusinessInformation;


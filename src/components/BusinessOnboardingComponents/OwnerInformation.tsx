import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const OwnerInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    phoneNumber: "",
    email: "",
    cnic: "",
    address: "",
    city: "",
    country: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
          Owner Information
        </h2>

        {/* Form */}
        <Form layout="vertical">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* First Name */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    First Name
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
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

              {/* Date of Birth */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Date of Birth
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <DatePicker
                  placeholder="Text Placeholder"
                  value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                  onChange={(date, dateString) =>
                    handleInputChange("dateOfBirth", dateString)
                  }
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                    border: "1px solid #E0E0E0",
                  }}
                />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Phone Number
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
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

              {/* CNIC */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    CNIC
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.cnic}
                  onChange={(e) => handleInputChange("cnic", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* Address */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Address
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
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

            {/* Right Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Last Name */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Last Name
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
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

              {/* Gender */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Gender
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Select
                  placeholder="Text Placeholder"
                  value={formData.gender || undefined}
                  onChange={(value) => handleInputChange("gender", value)}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              {/* Email */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Email
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  type="email"
                  placeholder="Text Placeholder"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* City */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    City
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    padding: "12px 16px",
                    fontSize: "14px",
                    height: "40px",
                  }}
                />
              </Form.Item>

              {/* Country */}
              <Form.Item
                label={
                  <span
                    style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}
                  >
                    Country
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Select
                  placeholder="Text Placeholder"
                  value={formData.country || undefined}
                  onChange={(value) => handleInputChange("country", value)}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  <Option value="pakistan">Pakistan</Option>
                  <Option value="saudi-arabia">Saudi Arabia</Option>
                  <Option value="uae">UAE</Option>
                  <Option value="usa">USA</Option>
                </Select>
              </Form.Item>
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

export default OwnerInformation;


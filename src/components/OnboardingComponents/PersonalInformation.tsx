import React, { useState } from "react";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    gender: "",
    phoneNumber: "",
    email: "",
    cnic: "",
    ntn: "",
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
          Personal Information
        </h2>

        {/* Form */}
        <Form layout="vertical">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* First Name */}
              <Form.Item 
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>First Name</span>} 
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
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>Date of Birth</span>} 
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
                  }}
                />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item 
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>Phone Number</span>} 
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
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>CNIC</span>} 
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
            </div>

            {/* Right Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Last Name */}
              <Form.Item 
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>Last Name</span>} 
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
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>Gender</span>} 
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
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>Email</span>} 
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

              {/* NTN */}
              <Form.Item 
                label={<span style={{ color: "#333333", fontSize: "14px", fontWeight: 500 }}>NTN</span>} 
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.ntn}
                  onChange={(e) => handleInputChange("ntn", e.target.value)}
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
        </Form>
      </div>
    </div>
  );
};

export default PersonalInformation;
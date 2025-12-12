import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Option } = Select;

const SetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Password validation checks
  const passwordChecks = {
    hasCapital: /[A-Z]/.test(formData.password),
    hasSmall: /[a-z]/.test(formData.password),
    hasNumbers: (formData.password.match(/\d/g) || []).length >= 3,
    hasLength: formData.password.length >= 8 && formData.password.length <= 64,
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  // Sample secret questions
  const secretQuestions = [
    "What was the name of your first pet?",
    "What city were you born in?",
    "What was your mother's maiden name?",
    "What was the name of your elementary school?",
    "What was your childhood nickname?",
    "What street did you grow up on?",
    "What was your favorite food as a child?",
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
          Set Password
        </h2>

        {/* Form */}
        <Form layout="vertical">
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {/* Left Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Set Password */}
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Set Password
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input.Password
                  placeholder="Text Placeholder"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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

              {/* Password Requirements */}
              <div
                style={{
                  marginBottom: "24px",
                  paddingLeft: "4px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    color: passwordChecks.hasCapital ? "#4CAF50" : "#666666",
                    marginBottom: "8px",
                  }}
                >
                  {passwordChecks.hasCapital ? "✓" : "•"} 1 capital letter
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: passwordChecks.hasSmall ? "#4CAF50" : "#666666",
                    marginBottom: "8px",
                  }}
                >
                  {passwordChecks.hasSmall ? "✓" : "•"} 1 small letter
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: passwordChecks.hasNumbers ? "#4CAF50" : "#666666",
                    marginBottom: "8px",
                  }}
                >
                  {passwordChecks.hasNumbers ? "✓" : "•"} 3 numbers
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: passwordChecks.hasLength ? "#4CAF50" : "#666666",
                    marginBottom: "8px",
                  }}
                >
                  {passwordChecks.hasLength ? "✓" : "•"} 8-64 characters
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: passwordChecks.hasSpecial ? "#4CAF50" : "#666666",
                    marginBottom: "8px",
                  }}
                >
                  {passwordChecks.hasSpecial ? "✓" : "•"} At least 1 special
                  character
                </div>
              </div>

              {/* Select Secret Question */}
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Select Secret Question
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Select
                  placeholder="Text Placeholder"
                  value={formData.secretQuestion || undefined}
                  onChange={(value) =>
                    handleInputChange("secretQuestion", value)
                  }
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    height: "40px",
                  }}
                >
                  {secretQuestions.map((question, index) => (
                    <Option key={index} value={question}>
                      {question}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Right Column */}
            <div style={{ flex: "1", minWidth: "300px" }}>
              {/* Confirm Password */}
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Confirm Password
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input.Password
                  placeholder="Text Placeholder"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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

              {/* Answer */}
              <Form.Item
                label={
                  <span
                    style={{
                      color: "#333333",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Answer
                  </span>
                }
                style={{ marginBottom: "24px" }}
              >
                <Input
                  placeholder="Text Placeholder"
                  value={formData.answer}
                  onChange={(e) => handleInputChange("answer", e.target.value)}
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

export default SetPassword;


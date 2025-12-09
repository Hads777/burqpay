import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { MailOutlined, MobileOutlined } from "@ant-design/icons";

const Verification = () => {
  const [emailCode, setEmailCode] = useState(["", "", "", ""]);
  const [phoneCode, setPhoneCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(14); // 14 seconds

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleEmailCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...emailCode];
    newCode[index] = value;
    setEmailCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`email-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePhoneCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...phoneCode];
    newCode[index] = value;
    setPhoneCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`phone-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    type: "email" | "phone"
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      const prevInput = document.getElementById(
        `${type}-input-${index - 1}`
      );
      prevInput?.focus();
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
          Verification
        </h2>

        {/* Two Column Layout */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {/* Email Verification Section */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Verify your Email Address
            </h3>

            {/* Email Icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#E8F5E9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MailOutlined
                  style={{
                    fontSize: "32px",
                    color: "#4CAF50",
                  }}
                />
              </div>
            </div>

            {/* Instruction */}
            <p
              style={{
                fontSize: "14px",
                color: "#666666",
                textAlign: "center",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Please enter the 4-digit code sent to your email address
            </p>

            {/* Code Input Fields */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  id={`email-input-${index}`}
                  value={emailCode[index]}
                  onChange={(e) =>
                    handleEmailCodeChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index, "email")}
                  maxLength={1}
                  style={{
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 600,
                    border: "2px dashed #E0E0E0",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#666666",
                fontWeight: 500,
              }}
            >
              {formatTime(timer)}
            </div>
          </div>

          {/* Phone Verification Section */}
          <div style={{ flex: "1", minWidth: "300px" }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#333333",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              Verify your Phone Number
            </h3>

            {/* Phone Icon */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#E8F5E9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MobileOutlined
                  style={{
                    fontSize: "32px",
                    color: "#4CAF50",
                  }}
                />
              </div>
            </div>

            {/* Instruction */}
            <p
              style={{
                fontSize: "14px",
                color: "#666666",
                textAlign: "center",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Please enter the 4-digit code sent to your phone number
            </p>

            {/* Code Input Fields */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  id={`phone-input-${index}`}
                  value={phoneCode[index]}
                  onChange={(e) =>
                    handlePhoneCodeChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index, "phone")}
                  maxLength={1}
                  style={{
                    width: "60px",
                    height: "60px",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: 600,
                    border: "2px dashed #E0E0E0",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#666666",
                fontWeight: 500,
              }}
            >
              {formatTime(timer)}
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
              console.log("Next clicked", { emailCode, phoneCode });
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

export default Verification;


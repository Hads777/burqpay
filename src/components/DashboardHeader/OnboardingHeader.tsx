import React, { useState } from "react";

const OnboardingHeader = () => {
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const [applicationNo] = useState("1324657891324");
  const [accountType] = useState("Freelance");

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* Left side - Application Info */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {/* Application Number */}
        <div
          style={{
            backgroundColor: "#A8E6CF",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "#000000",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
          }}
        >
          Application No : {applicationNo}
        </div>

        {/* Account Type */}
        <div
          style={{
            backgroundColor: "#A8E6CF",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "#000000",
            fontSize: "14px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
          }}
        >
          {accountType}
        </div>
      </div>

      {/* Right side - Language Selector */}
      <div
        style={{
          display: "flex",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
          backgroundColor: "#FFFFFF",
        }}
      >
        <button
          onClick={() => setLanguage("EN")}
          style={{
            padding: "8px 20px",
            border: "none",
            backgroundColor: language === "EN" ? "#0B8085" : "#FFFFFF",
            color: language === "EN" ? "#FFFFFF" : "#000000",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("AR")}
          style={{
            padding: "8px 20px",
            border: "none",
            backgroundColor: language === "AR" ? "#0B8085" : "#FFFFFF",
            color: language === "AR" ? "#FFFFFF" : "#000000",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
            borderLeft: "1px solid #E0E0E0",
          }}
        >
          AR
        </button>
      </div>
    </div>
  );
};

export default OnboardingHeader;


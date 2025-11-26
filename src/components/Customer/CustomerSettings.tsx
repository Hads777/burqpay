import React, { useState } from "react";
import { Switch, Button } from "antd";

export default function CustomerSettings() {
  const [autoRenew, setAutoRenew] = useState(true);
  const [sendInvoiceSms, setSendInvoiceSms] = useState(false);
  const [sendInvoiceReminder, setSendInvoiceReminder] = useState(true);

  return (
    <div style={{ padding: "30px", background: "#fff", borderRadius: 12 }}>
      
      {/* Auto Renew Row */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "18px 20px",
          border: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 500 }}>
          Auto Renew Service
        </div>
        <Switch
          checked={autoRenew}
          onChange={setAutoRenew}
          style={{ background: autoRenew ? "#29A8A8" : "#c9c9c9" }}
        />
      </div>

      {/* Second Row - Two Boxes */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 40,
        }}
      >
        {/* Send Invoice SMS */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: "18px 20px",
            border: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            Send Invoice SMS
          </div>
          <Switch
            checked={sendInvoiceSms}
            onChange={setSendInvoiceSms}
            style={{ background: sendInvoiceSms ? "#29A8A8" : "#c9c9c9" }}
          />
        </div>

        {/* Send Invoice Reminder */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 12,
            padding: "18px 20px",
            border: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 500 }}>
            Send Invoice Reminder
          </div>
          <Switch
            checked={sendInvoiceReminder}
            onChange={setSendInvoiceReminder}
            style={{ background: sendInvoiceReminder ? "#29A8A8" : "#c9c9c9" }}
          />
        </div>
      </div>

      {/* Save Settings Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button className="custom-Colorr"
         style={{
            backgroundColor: "#C91E14",
            borderColor: "#C91E14",
            borderRadius: "6px",
            padding: "8px 24px",
          }}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}

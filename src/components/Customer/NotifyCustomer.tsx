import React, { useState } from "react";
import { Input, Button, Typography } from "antd";

const { Text } = Typography;
const { TextArea } = Input;

export default function NotifyCustomer() {
  const [phone, setPhone] = useState("545878787846");
  const [message, setMessage] = useState("Type here....");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "20px 30px",
        width: "100%",
      }}
    >
      {/* Title */}
      <h3 style={{ marginBottom: 20, fontWeight: 600 }}>SMS</h3>

      {/* Phone Input */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, marginBottom: 6 }}>Phone</div>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            height: 46,
            borderRadius: 10,
            fontSize: 15,
          }}
        />
      </div>

      {/* Message Field */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ fontSize: 14, marginBottom: 6 }}>Message</div>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            borderRadius: 10,
            fontSize: 15,
            padding: 12,
            height: 140,
          }}
        />
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <Button className="new-White"
         
        >
          Clear
        </Button>

        <Button className="new-Bttn"
         
        >
          Update
        </Button>

        <Button className="custom-Colorr"
          
        >
          Send
        </Button>
      </div>
    </div>
  );
}

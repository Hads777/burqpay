import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Row, Col, Card } from "antd";
import {  Typography } from "antd";
import EmailTemplate from "./EmailTemplate";
import SmsTemplate from "./SmsTemplate";
import { FaSms } from "react-icons/fa";
const { Text } = Typography;


interface Field {
  label: string;
  value: string | number;
}

const leftColumn: Field[] = [
  { label: "Customer Name", value: "XXX Company Limited" },
  { label: "CR Number", value: "1010XXXX069" },
  { label: "NID Number", value: "20136521478" },
  { label: "Address", value: "XXX Company Limited" },
];

const rightColumn: Field[] = [
  { label: "Phone Number", value: "966254123654" },
  { label: "Business Type", value: "Contribution" },
  { label: "Type", value: "Business" },
];
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    margin: "0 auto",
    background: "#fff",
    borderRadius: 8,
    padding: "12px 0px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    marginBottom: "20px"
  },
  fieldRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #eee",
    padding: "6px 0",
    fontSize: 13,
  },
  label: {
    color: "#555",
    fontWeight: 500,
  },
  value: {
    fontWeight: 600,
    color: "#000",
  },
};
const TemplateManagement = () => {
  localStorage.setItem("tabs", "Email");
  const getTabs = localStorage.getItem("tabs");
  const [selectTab, setSelectedTab] = useState<any>(getTabs);

  const tapOptions = [
    {
      title: "Email Template",
      key: "Email",
      folder: <EmailTemplate/>,
    },
    {
      title: "SMS Template",
      key: "SMS",
      folder: <SmsTemplate/>,
    }
  ];
  return (
    <>
    
      <Tabs
        id="controlled-tab-example"
        className="mt-30 mb-4 position-relative tabs-overflow"
        activeKey={selectTab}
        style={{ display: "flex", flexWrap: "nowrap" }}
        onSelect={(tab: any) => {
          setSelectedTab(tab);
        }}
      >
        {tapOptions.map((item: any) => (
          <Tab eventKey={item.key} title={item.title}>
            {selectTab === item.key && item.folder}
          </Tab>
        ))}
      </Tabs>
    </>
  );
};

export default TemplateManagement;
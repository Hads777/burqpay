import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Row, Col, Card } from "antd";
import {  Typography } from "antd";
import CustomerInvoices from "./CustomerInvoices";
import CustomerPayments from "./CustomerPayments";
import NotifyCustomer from "./NotifyCustomer";
import CustomerReports from "./CustomerReports";
import CustomerSettings from "./CustomerSettings";
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
const CustomerInfo = () => {
  localStorage.setItem("tabs", "Invoices");
  const getTabs = localStorage.getItem("tabs");
  const [selectTab, setSelectedTab] = useState<any>(getTabs);

  const tapOptions = [
    {
      title: "Invoices",
      key: "Invoices",
      folder: <CustomerInvoices/>,
    },
    {
      title: "Payments",
      key: "Payment",
      folder: <CustomerPayments/>,
    },
    {
      title: "Notify Customer",
      key: "NotifyCustomer",
      folder: <NotifyCustomer/>,
    },
    {
      title: "Reports",
      key: "Reports",
      folder: <CustomerReports/>,
    },
    {
      title: "Settings",
      key: "Settings",
      folder: <CustomerSettings/>,
    }
  ];
  return (
    <>
     <Card
      style={{
        borderRadius: 12,
        padding: 0,
        overflow: "hidden",
      }}
      bodyStyle={{ padding: 0 }}
    >
      <Row>
        {/* Left Initials Box */}
        <Col
          span={4}
          style={{
            background: "#f5f5f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 140,
            borderRight: "1px solid #eee",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: 600 }}>AA</Text>
        </Col>

        {/* Right Content */}
        <Col span={20} style={{ padding: "20px 24px" }}>
          <Row>
            <Col span={12}>
              <Text strong>Customer Name:</Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text>Ahmad Aziz</Text>
            </Col>

            <Col span={12}>
              <Text strong>Unique ID:</Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text>1003330023553759893</Text>
            </Col>

            <Col span={12}>
              <Text strong>Phone Number:</Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text>501236666</Text>
            </Col>

            <Col span={12}>
              <Text strong>Created Date:</Text>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Text>09 September 2025</Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
    
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

export default CustomerInfo;
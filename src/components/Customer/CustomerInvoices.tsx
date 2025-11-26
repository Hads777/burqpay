import React from "react";
import { Table, Tag } from "antd";

export default function CustomerInvoices() {
  const columns = [
    {
      title: (
        <div style={{ fontWeight: 600 }}>Amount</div>
      ),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: (
        <div style={{ fontWeight: 600, textAlign: "center" }}>
          Created Date
        </div>
      ),
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
    },
    {
      title: (
        <div style={{ fontWeight: 600, textAlign: "right" }}>
          Status
        </div>
      ),
      key: "status",
      align: "right",
      render: () => (
        <Tag
          color="#06C167"
          style={{
            padding: "4px 14px",
            borderRadius: "20px",
            color: "#fff",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          Status
        </Tag>
      ),
    },
  ];

  const data = [
    { key: 1, amount: "SAR.51", createdDate: "10/08/2025" },
    { key: 2, amount: "SAR.50", createdDate: "10/08/2025" },
    { key: 3, amount: "SAR.51", createdDate: "10/08/2025" },
    { key: 4, amount: "SAR.50", createdDate: "10/08/2025" },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered={false}
        rowClassName={(record, index) =>
          index % 2 === 1 ? "striped-row" : ""
        }
        style={{
          borderRadius: 10,
          overflow: "hidden",
        }}
        // Inline row styling (alternating)
        rowClassName={(record, index) =>
          index % 2 === 1 ? "custom-row" : "default-row"
        }
        onRow={(record, index) => ({
          style: {
            background:
              index % 2 === 1 ? "#fafbff" : "#ffffff",
          },
        })}
        // Inline header style
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  background: "#e9fdf9",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  border: "none",
                  fontSize: 14,
                  padding: "14px 16px",
                }}
              />
            ),
          },
        }}
      />
    </div>
  );
}

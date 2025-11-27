import React from "react";
import { Button } from "antd";
import jsPDF from "jspdf";
import { Images } from "../Config/Images";

const InvoiceDetail: React.FC = () => {
  // Static dummy data for now – wire to real API later
  const invoice = {
    paymentCode: "1755246645",
    status: "PAID",
    issueDate: "15-Aug-2025",
    dueDate: "17-Aug-2025",
    requestCreatedAt: "13:29",
    name: "Ahmad Aziz",
    phoneNumber: "5012368666",
    purpose: "One Bill Check",
    total: "PKR 3,500",
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById("invoice-pdf");
    if (!element) return;

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.html(element, {
      callback: (docInstance) => {
        docInstance.save(`invoice-${invoice.paymentCode}.pdf`);
      },
      // small margins so content has full width and is not cut on the right
      margin: [30, 20, 30, 20],
      autoPaging: "text",
      // ensure HTML is rendered using the full page width to avoid truncation
      width: pageWidth - 40,
      windowWidth: element.scrollWidth,
      html2canvas: {
        scale: 0.9,
      },
    });
  };

  return (
    <div className="service">
      <div
        id="invoice-pdf"
        style={{
          maxWidth: 920,
          margin: "0 auto",
          backgroundColor: "#FFFFFF",
          padding: 20,
          borderRadius: 8,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src={Images.mabrourLogo}
              alt="BurqPay"
              style={{ height: 32, objectFit: "contain" }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {/* Card brand placeholders */}
            <div
              style={{
                width: 40,
                height: 24,
                backgroundColor: "#f4f4f4",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 40,
                height: 24,
                backgroundColor: "#f4f4f4",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 40,
                height: 24,
                backgroundColor: "#f4f4f4",
                borderRadius: 4,
              }}
            />
          </div>
        </div>

        {/* Invoice / Bank Copy bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #eee",
            borderRadius: 6,
            padding: "10px 16px",
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 600 }}>INVOICE</span>
          <span style={{ color: "#9C9C9C" }}>Bank Copy</span>
        </div>

        {/* Light green payment code bar */}
        <div
          style={{
            backgroundColor: "#F1FFF6",
            padding: "10px 16px",
            borderRadius: 6,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          Payment Code : {invoice.paymentCode}
        </div>

        {/* Pay online info blocks */}
        <div
          style={{
            backgroundColor: "#FFF7F0",
            padding: "12px 16px",
            borderRadius: 6,
            fontSize: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 600 }}>
            Pay ONLINE using HyperPay Via:
          </div>
          <div>Visa</div>
        </div>

        <div
          style={{
            backgroundColor: "#FFF7F0",
            padding: "12px 16px",
            borderRadius: 6,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          <div style={{ marginBottom: 6, fontWeight: 600 }}>
            Pay ONLINE using HyperPay Via
          </div>
          <div>CLYDESDALE BANK PLC</div>
        </div>

        {/* Payment code / status row */}
        <div
          style={{
            backgroundColor: "#FFE3EA",
            borderRadius: 6,
            padding: "12px 16px",
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span>Payment Code</span>
            <span style={{ fontWeight: 600 }}>{invoice.paymentCode}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Status</span>
            <span style={{ fontWeight: 600 }}>{invoice.status}</span>
          </div>
        </div>

        {/* Details list */}
        <div
          style={{
            fontSize: 12,
            borderRadius: 6,
            overflow: "hidden",
            border: "1px solid #F0F0F0",
          }}
        >
          {[
            { label: "Issue Date", value: invoice.issueDate },
            { label: "Due Date", value: invoice.dueDate },
            { label: "Request Created At", value: invoice.requestCreatedAt },
            { label: "Name", value: invoice.name },
            { label: "Phone Number", value: invoice.phoneNumber },
            { label: "Purpose", value: invoice.purpose },
          ].map((row, index) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 16px",
                backgroundColor: index % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
              }}
            >
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}

          {/* Total row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 16px",
              backgroundColor: "#FF3B30",
              color: "#FFFFFF",
              fontWeight: 600,
            }}
          >
            <span>Total</span>
            <span>{invoice.total}</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>BurqPay</div>
            <div>Powered By MyTM, LLC</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#F4F4F4",
                borderRadius: 4,
              }}
            />
            <div
              style={{
                width: 32,
                height: 32,
                backgroundColor: "#F4F4F4",
                borderRadius: 4,
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          onClick={handleDownloadPdf}
          style={{
            backgroundColor: "#FF3B30",
            borderColor: "#FF3B30",
            borderRadius: 6,
            padding: "6px 24px",
          }}
        >
          Print
        </Button>
      </div>
    </div>
  );
};

export default InvoiceDetail;



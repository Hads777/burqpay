import { useEffect, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import TableView from "../TableView/TableView";
import arrowDown from "../../assets/images/arrow-down.png";

const EmailTemplate = () => {
  const [skelitonLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [tableData, setTableData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);

  // Dummy data based on the provided design
  const dummyTemplates = [
    {
      id: 1,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 2,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 3,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 4,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 5,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 6,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 7,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
    {
      id: 8,
      messageId: "AB-12345",
      messageEnglish:
        "Your request has been submitted and under approval. We will get back to you in 24 hours",
      messageArabic:
        "لقد تم تقديم طلبك وهو قيد الموافقة. سنرد عليك خلال 24 ساعة",
      updatedAt: "12/05/2024 10:15am",
    },
  ];

  useEffect(() => {
    setTableData(dummyTemplates);
    setTotalRows(dummyTemplates.length);
    setFrom(1);
    setTo(dummyTemplates.length);
    setTotalPage(1);
  }, []);

  const handleMenuClick = (key: string, row: any) => {
    if (key === "edit") {
      setEditingRow(row);
    }
  };

  const menu = (row: any) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleMenuClick("edit", row)}>
        Edit
      </Menu.Item>
    </Menu>
  );

  const headers = [
    {
      name: "Message ID",
      selector: (row: { messageId: string }) => row.messageId,
      sortable: true,
      width: "140px",
    },
    {
      name: "Message in English",
      selector: (row: { messageEnglish: string }) => row.messageEnglish,
      sortable: true,
    },
    {
      name: "Message in Arabic",
      selector: (row: { messageArabic: string }) => row.messageArabic,
      sortable: true,
    },
    {
      name: "Updated Date",
      selector: (row: { updatedAt: string }) => row.updatedAt,
      sortable: true,
      width: "180px",
    },
    {
      name: "Action",
      sortable: false,
      width: "140px",
      cell: (row: any) => (
        <Dropdown overlay={menu(row)} trigger={["click"]}>
          <Button
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "#111827",
              color: "#fff",
              background: "#111827",
            }}
            type="primary"
          >
            <span style={{ flex: 1, textAlign: "left" }}>Select</span>
            <img src={arrowDown} alt="More" style={{ marginLeft: 8 }} />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const mappedData =
    tableData &&
    tableData.map((item: any, index: number) => ({
      id: item.id || index + 1,
      messageId: item.messageId,
      messageEnglish: item.messageEnglish,
      messageArabic: item.messageArabic,
      updatedAt: item.updatedAt,
    }));

  // When a row is selected for editing, show the edit template design instead of the table
  if (editingRow) {
    return (
      <div className="service customer-list-page">
        <div className="bp-card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold">Edit Email Template Here</h4>
          </div>

          {/* Details in English */}
          <div className="mb-4">
            <div className="custom-input-container">
              <label className="input-label">Details in English</label>
              <textarea
                defaultValue={editingRow.messageEnglish}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          {/* Details in Arabic */}
          <div className="mb-5">
            <div className="custom-input-container">
              <label className="input-label">Details in Arabic</label>
              <textarea
                defaultValue={editingRow.messageArabic}
                style={{
                  width: "100%",
                  minHeight: "120px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  padding: "12px 16px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <Button
              onClick={() => setEditingRow(null)}
              style={{
                borderRadius: "6px",
                padding: "8px 24px",
                border: "1px solid #D1D5DB",
                backgroundColor: "#ffffff",
                color: "#111827",
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#C91E14",
                borderColor: "#C91E14",
                borderRadius: "6px",
                padding: "8px 32px",
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service customer-list-page">
      <TableView
        header={headers}
        data={mappedData}
        totalRows={totalRows}
        isLoading={skelitonLoading}
        from={from}
        page={page}
        totalPage={totalPage}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        to={to}
      />
    </div>
  );
};

export default EmailTemplate;


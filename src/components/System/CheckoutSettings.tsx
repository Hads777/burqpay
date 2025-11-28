import { useState } from "react";
import { Button, Checkbox } from "antd";

const CheckoutSettings = () => {
  // Dummy settings grouped in three columns to match design
  const [settings, setSettings] = useState([
    { id: 1, label: "Placeholder", checked: true, column: 1 },
    { id: 2, label: "Placeholder", checked: true, column: 1 },
    { id: 3, label: "Placeholder", checked: false, column: 1 },
    { id: 4, label: "Placeholder", checked: true, column: 1 },
    { id: 5, label: "Placeholder", checked: true, column: 1 },
    { id: 6, label: "Placeholder", checked: true, column: 2 },
    { id: 7, label: "Placeholder", checked: false, column: 2 },
    { id: 8, label: "Placeholder", checked: true, column: 2 },
    { id: 9, label: "Placeholder", checked: true, column: 2 },
    { id: 10, label: "Placeholder", checked: false, column: 2 },
    { id: 11, label: "Placeholder", checked: true, column: 3 },
    { id: 12, label: "Placeholder", checked: false, column: 3 },
    { id: 13, label: "Placeholder", checked: true, column: 3 },
    { id: 14, label: "Placeholder", checked: true, column: 3 },
  ]);

  const handleToggle = (id: number, value: boolean) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: value } : s))
    );
  };

  const handleSave = () => {
    // For now just log; wire to API later
    console.log("Checkout settings saved", settings);
  };

  const columns = [1, 2, 3];

  return (
    <div className="service customer-list-page">
      <div className="bp-card">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <h4 className="mb-0 fw-bold">Checkout Settings</h4>
        </div>

        <div className="d-flex flex-wrap justify-content-between">
          {columns.map((col) => (
            <div
              key={col}
              className="d-flex flex-column gap-3"
              style={{ minWidth: "220px" }}
            >
              {settings
                .filter((s) => s.column === col)
                .map((setting) => (
                  <div
                    key={setting.id}
                    className="d-flex align-items-center gap-2"
                  >
                    <Checkbox
                      checked={setting.checked}
                      onChange={(e) =>
                        handleToggle(setting.id, e.target.checked)
                      }
                    />
                    <span
                      className={
                        setting.checked ? "text-dark" : "text-muted"
                      }
                    >
                      {setting.label}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end gap-3 mt-5">
          <Button
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
            onClick={handleSave}
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
};

export default CheckoutSettings;



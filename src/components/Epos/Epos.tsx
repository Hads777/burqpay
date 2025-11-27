import { useState } from "react";
import { Button, Switch } from "antd";
import toast from "react-hot-toast";

const Epos = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [nameEnabled, setNameEnabled] = useState(true);
  const [phoneEnabled, setPhoneEnabled] = useState(false);

  const handleSave = () => {
    // Dummy save handler – integrate API later
    toast.success("Epos preferences saved");
  };

  return (
    <div className="service customer-list-page">
    <div className="bp-card">

        
      <div className="d-flex flex-column gap-4">
        {/* Email row */}
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-3 mb-1">
            <Switch checked={emailEnabled} onChange={setEmailEnabled} />
            <span className="fw-semibold fs-5">Email</span>
          </div>
          <span className="text-muted">
            Customers will see this when checking out.
          </span>
        </div>

        {/* Name row */}
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-3 mb-1">
            <Switch checked={nameEnabled} onChange={setNameEnabled} />
            <span className="fw-semibold fs-5">Name</span>
          </div>
          <span className="text-muted">
            Customers will see this when checking out.
          </span>
        </div>

        {/* Phone row */}
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center gap-3 mb-1">
            <Switch checked={phoneEnabled} onChange={setPhoneEnabled} />
            <span className="fw-semibold fs-5">Phone</span>
          </div>
          <span className="text-muted">
            Customers will see this when checking out.
          </span>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-5">
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

export default Epos;

import { useState } from "react";
import { Button, Form, Input, Select, Switch } from "antd";
import toast from "react-hot-toast";

const { Option } = Select;

interface PaymentGatewayEditProps {
  initialData?: any;
  onCancel: () => void;
  onSave?: (values: any) => void;
}

const PaymentGatewayEdit: React.FC<PaymentGatewayEditProps> = ({
  initialData,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const handleFinish = (values: any) => {
    setSaving(true);
    // Dummy save handler – integrate API later
    toast.success("Payment gateway updated successfully");
    if (onSave) {
      onSave(values);
    }
    setSaving(false);
  };

  return (
    <div className="service customer-list-page">
      <div className="bp-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0 fw-bold">Edit</h4>
        </div>

        <Form
          form={form}
          initialValues={{
            displayName: initialData?.name || "Visa",
            currency: initialData?.currency || "SAR",
            phoneRequired: initialData?.phoneRequired || "Yes",
            enabled: initialData?.enabled ?? true,
          }}
          layout="vertical"
          onFinish={handleFinish}
          className="customer-form"
        >
          {/* Display name at checkout */}
          <Form.Item name="displayName" className="mb-3">
            <div className="custom-input-container">
              <label className="input-label">Display name at checkout</label>
              <Input
                placeholder="Enter display name"
                className="fs-6"
                style={{ height: "52px" }}
              />
            </div>
          </Form.Item>

          {/* Helper text under display name */}
          <p className="text-muted mb-4">
            Customers will see this when checking out.
          </p>

          {/* Currency */}
          <Form.Item name="currency" className="mb-3">
            <div className="custom-input-container">
              <label className="input-label">Currency</label>
              <Select
                placeholder="Select currency"
                style={{ height: "52px", width: "100%" }}
                className="fs-6"
              >
                <Option value="SAR">SAR</Option>
                <Option value="USD">USD</Option>
              </Select>
            </div>
          </Form.Item>

          {/* Phone Required */}
          <Form.Item name="phoneRequired" className="mb-4">
            <div className="custom-input-container">
              <label className="input-label">Phone Required</label>
              <Select
                placeholder="Select"
                style={{ height: "52px", width: "100%" }}
                className="fs-6"
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </div>
          </Form.Item>

          {/* Enable toggle */}
          <Form.Item name="enabled" valuePropName="checked" className="mb-4">
            <div className="d-flex align-items-center gap-3">
              <Switch />
              <span className="fw-semibold">Enable</span>
            </div>
          </Form.Item>

          {/* Actions */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <Button
              onClick={onCancel}
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
              htmlType="submit"
              loading={saving}
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
        </Form>
      </div>
    </div>
  );
};

export default PaymentGatewayEdit;



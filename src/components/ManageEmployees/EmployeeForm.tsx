import { useState, useEffect } from "react";
import { Button, Input, Form, Switch, Row, Col, Select } from "antd";

interface EmployeeFormProps {
  mode: "create" | "edit";
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

const EmployeeForm = ({ mode, initialData, onSubmit, onCancel }: EmployeeFormProps) => {
  const [form] = Form.useForm();
  
  // Permissions state
  const [allPermissionsEnabled, setAllPermissionsEnabled] = useState(false);
  const [permissions, setPermissions] = useState({
    disbursement: false,
    "beneficiary.create": false,
    "beneficiary.list": false,
    "disbursement.ibft.ledger": false,
    "disbursement.bulk.transaction": false,
    "beneficiary.delete": false,
    "beneficiary.bulk.import": false,
    "disbursement.instant.transfer": false,
  });

  // Initialize form with initial data when in edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      form.setFieldsValue({
        employeeName: initialData?.name || "",
        employeeEmail: initialData?.email || "",
        employeePassword: "", // Don't prefill password
        phoneNumber: initialData?.phone || "",
        department: initialData?.department || undefined,
        role: initialData?.role || undefined,
        status: initialData?.status || "active",
      });
      
      // Set permissions if provided in initialData
      if (initialData?.permissions) {
        setPermissions(initialData.permissions);
        // Check if all permissions are enabled
        const allEnabled = Object.values(initialData.permissions).every((val) => val === true);
        setAllPermissionsEnabled(allEnabled);
      }
    } else {
      // Reset form for create mode
      form.resetFields();
      setAllPermissionsEnabled(false);
      setPermissions({
        disbursement: false,
        "beneficiary.create": false,
        "beneficiary.list": false,
        "disbursement.ibft.ledger": false,
        "disbursement.bulk.transaction": false,
        "beneficiary.delete": false,
        "beneficiary.bulk.import": false,
        "disbursement.instant.transfer": false,
      });
    }
  }, [mode, initialData, form]);

  const handlePermissionToggle = (permissionKey: string, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [permissionKey]: checked,
    }));
    
    // Update all permissions toggle state
    const updatedPermissions = { ...permissions, [permissionKey]: checked };
    const allEnabled = Object.values(updatedPermissions).every((val) => val === true);
    setAllPermissionsEnabled(allEnabled);
  };

  const handleAllPermissionsToggle = (checked: boolean) => {
    setAllPermissionsEnabled(checked);
    setPermissions({
      disbursement: checked,
      "beneficiary.create": checked,
      "beneficiary.list": checked,
      "disbursement.ibft.ledger": checked,
      "disbursement.bulk.transaction": checked,
      "beneficiary.delete": checked,
      "beneficiary.bulk.import": checked,
      "disbursement.instant.transfer": checked,
    });
  };

  const handleSubmit = (values: any) => {
    const employeeData = {
      ...values,
      permissions: permissions,
    };
    onSubmit(employeeData);
  };

  return (
    <div className="service customer-form-page" style={{ marginBottom: 0 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-bold">
          {mode === "edit" ? "Edit Employee" : "Create Employee"}
        </h4>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="customer-form shadow-sm p-4 bg-white rounded"
      >
        {/* Employee Details Section */}
        <h5 className="mb-3 fw-bold">Employee Details</h5>
        <Row gutter={16}>
          {/* Left Column */}
          <Col span={12}>
            <Form.Item
              name="employeeName"
              rules={[{ required: true, message: "Please enter employee name" }]}
            >
              <div className="custom-input-container">
                <label className="input-label">Employee Name</label>
                <Input
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="employeeEmail"
              rules={[
                { required: true, message: "Please enter employee email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <div className="custom-input-container">
                <label className="input-label">Employee Email</label>
                <Input
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <div className="custom-input-container">
                <label className="input-label">Select Department</label>
                <Select
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                >
                  <Select.Option value="it">IT</Select.Option>
                  <Select.Option value="hr">HR</Select.Option>
                  <Select.Option value="finance">Finance</Select.Option>
                  <Select.Option value="sales">Sales</Select.Option>
                </Select>
              </div>
            </Form.Item>

            <Form.Item
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <div className="custom-input-container">
                <label className="input-label">Select Status</label>
                <Select
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                  defaultValue="active"
                >
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="inactive">Inactive</Select.Option>
                </Select>
              </div>
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col span={12}>
            <Form.Item
              name="employeePassword"
              rules={[
                {
                  required: mode === "create",
                  message: "Please enter employee password",
                },
              ]}
            >
              <div className="custom-input-container">
                <label className="input-label">Employee Password</label>
                <Input.Password
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <div className="custom-input-container">
                <label className="input-label">Phone Number</label>
                <Input
                  addonBefore="+966"
                  placeholder="Phone Number"
                  style={{ height: "56px" }}
                  className="fs-6"
                />
              </div>
            </Form.Item>

            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select role" }]}
            >
              <div className="custom-input-container">
                <label className="input-label">Select Role</label>
                <Select
                  placeholder="Placeholder"
                  style={{ height: "56px" }}
                  className="fs-6"
                >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="employee">Employee</Select.Option>
                </Select>
              </div>
            </Form.Item>
          </Col>
        </Row>

        {/* Permissions Section */}
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0 fw-bold">Permissions</h5>
            <div className="d-flex align-items-center gap-2">
              <Switch
                checked={allPermissionsEnabled}
                onChange={handleAllPermissionsToggle}
              />
            </div>
          </div>

          <Row gutter={16}>
            {/* Left Column Permissions */}
            <Col span={12}>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <span>disbursement</span>
                  <Switch
                    checked={permissions.disbursement}
                    onChange={(checked) =>
                      handlePermissionToggle("disbursement", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>beneficiary.create</span>
                  <Switch
                    checked={permissions["beneficiary.create"]}
                    onChange={(checked) =>
                      handlePermissionToggle("beneficiary.create", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>beneficiary.list</span>
                  <Switch
                    checked={permissions["beneficiary.list"]}
                    onChange={(checked) =>
                      handlePermissionToggle("beneficiary.list", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>disbursement.ibft.ledger</span>
                  <Switch
                    checked={permissions["disbursement.ibft.ledger"]}
                    onChange={(checked) =>
                      handlePermissionToggle("disbursement.ibft.ledger", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>disbursement.bulk.transaction</span>
                  <Switch
                    checked={permissions["disbursement.bulk.transaction"]}
                    onChange={(checked) =>
                      handlePermissionToggle("disbursement.bulk.transaction", checked)
                    }
                  />
                </div>
              </div>
            </Col>

            {/* Right Column Permissions */}
            <Col span={12}>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <span>beneficiary.delete</span>
                  <Switch
                    checked={permissions["beneficiary.delete"]}
                    onChange={(checked) =>
                      handlePermissionToggle("beneficiary.delete", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>beneficiary.bulk.import</span>
                  <Switch
                    checked={permissions["beneficiary.bulk.import"]}
                    onChange={(checked) =>
                      handlePermissionToggle("beneficiary.bulk.import", checked)
                    }
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span>disbursement.instant.transfer</span>
                  <Switch
                    checked={permissions["disbursement.instant.transfer"]}
                    onChange={(checked) =>
                      handlePermissionToggle("disbursement.instant.transfer", checked)
                    }
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end mt-4">
          {onCancel && (
            <Button
              onClick={onCancel}
              style={{
                marginRight: "12px",
                borderRadius: "6px",
                padding: "8px 32px",
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#C91E14",
              borderColor: "#C91E14",
              borderRadius: "6px",
              padding: "8px 32px",
            }}
          >
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EmployeeForm;




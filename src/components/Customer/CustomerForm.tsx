import { Form, Input, Button, Select, Switch } from "antd";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";

const { Option } = Select;

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isEdit = location.pathname.toLowerCase().includes("/edit/");

  useEffect(() => {
    // Placeholder for fetching customer details when in edit mode
    if (isEdit && id) {
      // fetchCustomer(id);
    }
  }, [id, isEdit]);

  const onFinish = (values: any) => {
    console.log("Customer form submitted:", values);
    // Placeholder for create / update API
    navigate("/Customers/AllCustomers");
  };

  return (
    <div className="service customer-form-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* <h4 className="mb-0 fw-bold">
          {isEdit ? "Edit Customer" : "Create Customer"}
        </h4> */}
      </div>

      <Form
        layout="vertical"
        onFinish={onFinish}
        className="customer-form shadow-sm p-4 bg-white rounded"
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="First Name" name="first_name">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Last Name" name="last_name">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="National ID/Iqama No*" name="national_id">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Email*" name="email">
              <Input placeholder="Placeholder" type="email" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item
              label="Street address of the customer*"
              name="street_address"
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="State*" name="state">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="City*" name="city">
              <Select placeholder="Placeholder">
                <Option value="riyadh">Riyadh</Option>
                <Option value="jeddah">Jeddah</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Country of the customer*" name="country">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>

          <div className="col-md-6">
            <Form.Item label="Customer postcode*" name="postcode">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item label="Phone Number" name="phone">
              <Input addonBefore="+966" placeholder="Phone Number" />
            </Form.Item>
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <Form.Item label="Customer ID*" name="customer_id" className="w-100">
              <Input
                placeholder="Auto generated"
                suffix={
                  <Button
                    type="default"
                    size="small"
                    onClick={() =>
                      console.log("Generate customer ID clicked")
                    }
                  >
                    Generate
                  </Button>
                }
              />
            </Form.Item>
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="d-flex align-items-center gap-2 mt-4">
              <span>Status</span>
              <Form.Item name="status" valuePropName="checked" noStyle>
                <Switch defaultChecked />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button
            type="default"
            className="me-2"
            onClick={() => navigate("/Customers/AllCustomers")}
          >
            Cancel
          </Button>
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
            {isEdit ? "Edit" : "Create"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;



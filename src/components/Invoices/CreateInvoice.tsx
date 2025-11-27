import React from "react";
import { Button, Col, Form, Input, Row, Select, Switch } from "antd";

const { Option } = Select;

const CreateInvoice: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    // TODO: integrate with API later
    console.log("Invoice form values:", values);
  };

  return (
    <div className="service">
      {/* <h4 className="mb-4 fw-bold">Create Invoice</h4> */}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="create-invoice-form"
      >
        <Row gutter={[24, 16]}>
          <Col span={24}>
            <Form.Item
              label="Select Customer"
              name="customer"
              rules={[{ required: true, message: "Please select customer" }]}
            >
              <Select placeholder="Placeholder">
                <Option value="customer1">Customer 1</Option>
                <Option value="customer2">Customer 2</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name*"
              name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email*"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input
                addonBefore="+966"
                placeholder="Phone Number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Street address of the customer*"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="City*"
              name="city"
              rules={[{ required: true, message: "Please select city" }]}
            >
              <Select placeholder="Placeholder">
                <Option value="city1">City 1</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="State*"
              name="state"
              rules={[{ required: true, message: "Please select state" }]}
            >
              <Select placeholder="Placeholder">
                <Option value="state1">State 1</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Customer postcode*"
              name="postcode"
              rules={[{ required: true, message: "Please enter postcode" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Select Currency"
              name="currency"
              rules={[{ required: true, message: "Please select currency" }]}
            >
              <Select placeholder="Placeholder">
                <Option value="sar">SAR</Option>
                <Option value="usd">USD</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Purpose*"
              name="purpose"
              rules={[{ required: true, message: "Please enter purpose" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Amount*"
              name="amount"
              rules={[{ required: true, message: "Please enter amount" }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="GST Percentage"
              name="gstPercentage"
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Sales Tax No."
              name="salesTaxNo"
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          <div className="d-flex align-items-center gap-2">
            <Switch />
            <span>Show QR Code</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button
              htmlType="button"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#000000",
                borderRadius: 6,
                padding: "8px 24px",
              }}
            >
              Email Invoice
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#C91E14",
                borderColor: "#C91E14",
                borderRadius: 6,
                padding: "8px 32px",
              }}
            >
              Create
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateInvoice;



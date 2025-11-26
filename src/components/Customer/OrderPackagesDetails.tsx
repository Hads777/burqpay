import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";

import OrderDetailsTable from "./OrderDetailsTable";
import { useEffect, useState } from "react";
import { Button, Select, Modal, Input, Form,  Upload } from "antd";

const OrderPackagesDetails = () => {
  const packageDetails = useSelector(
    (state: RootState) => state.block.packageDetails
  );
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    cancellation_reason: "",
    refund_type: "",
    refund_reason: "",
    additional_notes: "",
    file: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const passengers = packageDetails?.data?.passengers || [];
    console.log(passengers, "heloo12345645");

    const allImages = [];

    passengers.forEach((passenger) => {
      passenger?.documents?.forEach((doc) => {
        doc?.images?.forEach((img) => {
          if (img?.path) {
            allImages.push(img);
          }
        });
      });
    });

    setFiles(allImages);
  }, [packageDetails]);

  const customerDetails = [
    { label: "Customer ID", value: packageDetails?.order_number || "-" },
    { label: "Customer Name", value: packageDetails?.customer_name || "-" },
    { label: "Order ID", value: packageDetails?.order_number || "-" },

    {
      label: "Order Status",
      value: (
        <span className="badge bg-success text-light">
          {packageDetails?.status}
        </span>
      ),
    },
    // { label: "Amount", value: `SAR ${packageDetails?.total_amount}` },
    // {
    //   label: "Start Date",
    //   value:
    //     packageDetails?.data?.package_details?.start_date ||
    //     packageDetails?.data?.start_date ||
    //     "-",
    // },
    // {
    //   label: "Stay in Makkah",
    //   value:
    //     `${packageDetails?.data?.package_details?.stay_in_makkah} days` ||
    //     `${packageDetails?.data?.stay_in_makkah} days` ||
    //     "-",
    // },
  ];
  console.log(files, "fiels");

  const additionalDetails = [
    { label: "Email", value: packageDetails?.email || "-" },
    { label: "Mobile No", value: packageDetails?.mobile_no || "-" },
    { label: "Order Date", value: packageDetails?.order_date || "-" },
    // {
    //   label: "Title",
    //   value:
    //     packageDetails?.data?.package_details?.title ||
    //     packageDetails?.data?.title ||
    //     "-",
    // },
    // { label: "Currency", value: "SAR" },
    // {
    //   label: "Duration",
    //   value:
    //     `${packageDetails?.data?.package_details?.total_duration} days` ||
    //     `${packageDetails?.data?.total_duration} days` ||
    //     "-",
    // },
    // {
    //   label: "Visa Requirement",
    //   value:
    //     packageDetails?.data?.package_details?.visa_requirements ||
    //     packageDetails?.data?.visa_requirements ||
    //     "-",
    // },
    // {
    //   label: "Cancellation Policy",
    //   value:
    //     packageDetails?.data?.package_details?.cancellation_policy ||
    //     packageDetails?.data?.cancellation_policy ||
    //     "-",
    // },
    // {
    //   label: "Minimum Age",
    //   value:
    //     `${packageDetails?.data?.package_details?.minimum_age} years` ||
    //     `${packageDetails?.data?.minimum_age} years` ||
    //     "-",
    // },
    // {
    //   label: "Allowed People",
    //   value:
    //     packageDetails?.data?.package_details?.allowed_people ||
    //     packageDetails?.data?.allowed_people ||
    //     "-",
    // },
    // {
    //   label: "Stay in Madina",
    //   value:
    //     `${packageDetails?.data?.package_details?.stay_in_madinah} days` ||
    //     `${packageDetails?.data?.stay_in_madinah} days` ||
    //     "-",
    // },
  ];
  const packageInfo = [
    {
      label: "Title",
      value:
        packageDetails?.data?.package_details?.title ||
        packageDetails?.data?.title ||
        "-",
    },
    { label: "Package Category", value: packageDetails?.customer_name || "-" },

    {
      label: "Departure City",
      value: packageDetails?.data?.package_details?.departure_city || "-",
    },
    { label: "Currency", value: "SAR" },
    // { label: "Amount", value: `SAR ${packageDetails?.total_amount}` },
    {
      label: "Start Date",
      value:
        packageDetails?.data?.package_details?.start_date ||
        packageDetails?.data?.start_date ||
        "-",
    },
    {
      label: "No of People",
      value:
        packageDetails?.data?.package_details?.allowed_people ||
        packageDetails?.data?.allowed_people ||
        "-",
    },
  ];
  const packageAdditionalDetails = [
    {
      label: "Package Type",
      value: packageDetails?.data?.package_details?.package_type || "-",
    },
    {
      label: "Vendor",
      value: packageDetails?.data?.package_details?.vendor_id || "-",
    },
    {
      label: "Destination City",
      value: packageDetails?.data?.package_details?.destination_city || "-",
    },
    {
      label: "Duration",
      value:
        `${packageDetails?.data?.package_details?.total_duration} days` ||
        `${packageDetails?.data?.total_duration} days` ||
        "-",
    },
    {
      label: "End Date",
      value:
        packageDetails?.data?.package_details?.end_date ||
        packageDetails?.data?.end_date ||
        "-",
    },
    {
      label: "Package Price",
      value: `SAR${packageDetails?.data?.package_details?.price}` || "-",
    },
  ];
  const handleOk = async () => {
    const {
      cancellation_reason,
      refund_type,
      refund_reason,
      additional_notes,
      file,
    } = formValues;

    let validationErrors: Record<string, string> = {};

    if (!cancellation_reason) {
      validationErrors.cancellation_reason = "Cancellation Reason is required";
    }
    if (!refund_type) {
      validationErrors.refund_type = "Refund Type is required";
    }
    if (!refund_reason) {
      validationErrors.refund_reason = "Refund Reason is required";
    }
    if (!additional_notes) {
      validationErrors.additional_notes = "Notes are required";
    }
    if (!file) {
      validationErrors.file = "File upload is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      // setIsLoading(true); // optionally show loading

      const formData = new FormData();
      formData.append("cancellation_reason", cancellation_reason);
      formData.append("refund_type", refund_type);
      formData.append("refund_reason", refund_reason);
      formData.append("additional_notes", additional_notes);
      if (file) {
        formData.append("file", file); // assuming file is already a File object
      }

      // Now send formData to backend via API
      // await api.post("/your-endpoint", formData);

      // Optionally close modal or reset form
      // setIsModalVisible(false);
    } catch (error: any) {
      console.error("Error during submission:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <h3 className="mb-3">Customer Details</h3>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => setIsModalVisible(true)}
          className="btn btn-outline-success"
        >
          Cancel Order
        </button>
      </div>
      <div className="profile-sec mt-3 mb-3">
        <div className="row g-3 align-items-center account-card">
          <div className="col-12">
            <div className="row p-3">
              <div className="col-6">
                {customerDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 mb-3"
                    style={{ borderBottom: "1px solid #CFCFCF" }}
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#6C727F",
                        fontSize: "14px",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-6">
                {additionalDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 mb-3"
                    style={{ borderBottom: "1px solid #CFCFCF" }}
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="mb-3">Package Details</h3>
      </div>
      <div className="profile-sec mt-3">
        <div className="row g-3 align-items-center account-card">
          <div className="col-12">
            <div className="row p-3">
              <div className="col-6">
                {packageInfo.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 mb-3"
                    style={{
                      borderBottom: "1px solid #CFCFCF",
                      marginBottom: "1rem",
                    }}
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#6C727F",
                        fontSize: "14px",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-6">
                {packageAdditionalDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center mt-2 mb-3"
                    style={{ borderBottom: "1px solid #CFCFCF" }}
                  >
                    <p
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        lineHeight: "1.5rem",
                      }}
                    >
                      {detail.label}
                    </p>
                    <span
                      style={{
                        color: "#6C727F",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3>Documents</h3>
        <div className="profile-sec mt-3">
          {files.length > 0 && (
            <p
              style={{
                color: "#6C727F",
                fontSize: "14px",
                lineHeight: "1.5rem",
                marginTop: "30px",
              }}
            ></p>
          )}
          {files.map((obj, index) => {
            const imageUrl = `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${
              obj.path
            }`;
            console.log("Image URL:", imageUrl);

            return (
              <div className="col-md-2 text-center mb-3" key={index}>
                <img
                  src={imageUrl}
                  alt={`Profile Image ${index + 1}`}
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%", maxHeight: "150px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
       <Modal
        className="custom-mod"
        style={{ maxWidth: "732px" }}
        title="Order Cancellation"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={
          <div className="d-flex justify-content-end gap-2 w-100">
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>
            <Button
              key="save"
              type="primary"
              className="theme-btn"
              onClick={handleOk}
              style={{ width: "fit-content" }}
            >
              Save
            </Button>
          </div>
        }
      >
        <div className="Ente-details">
          <Form layout="vertical">
            <div className="row p-2 mt-4">
              {/* Cancellation Reason */}
              <div className="col-6 mb-3">
                <div className="form-group form-label-group align-items-start flex-column">
                  <Select
                    placeholder="Placeholder"
                    style={{ height: "55px" }}
                    value={formValues.cancellation_reason}
                    onChange={(val) => handleChange("cancellation_reason", val)}
                  >
                    <option value="reason1">Reason 1</option>
                    <option value="reason2">Reason 2</option>
                  </Select>
                  <label style={{ color: "#666666" }}>
                    Cancellation Reason
                  </label>
                  {errors.cancellation_reason && (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.cancellation_reason}
                    </div>
                  )}
                </div>
              </div>

              {/* Refund Type */}
              <div className="col-6 mb-3">
                <div className="form-group form-label-group align-items-start flex-column">
                  <Select
                    placeholder="Placeholder"
                    style={{ height: "55px" }}
                    value={formValues.refund_type}
                    onChange={(val) => handleChange("refund_type", val)}
                  >
                    <option value="full">Full</option>
                    <option value="partial">Partial</option>
                  </Select>
                  <label style={{ color: "#666666" }}>Refund Type</label>
                  {errors.refund_type && (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.refund_type}
                    </div>
                  )}
                </div>
              </div>

              {/* Refund Reason */}
              <div className="col-6 mb-3">
                <div className="form-group form-label-group align-items-start flex-column">
                  <Select
                    style={{ height: "55px" }}
                    value={formValues.refund_reason}
                    placeholder="Placeholder"
                    onChange={(val) => handleChange("refund_reason", val)}
                  >
                    <option value="reason1">Reason 1</option>
                    <option value="reason2">Reason 2</option>
                  </Select>
                  <label style={{ color: "#666666" }}>Refund Reason</label>
                  {errors.refund_reason && (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.refund_reason}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="col-6 mb-3">
                <div
                    style={{ height: "55px" }}
                className="form-group form-label-group align-items-start flex-column">
                  <Input
                    placeholder="Placeholder"
                    style={{ height: "55px" }}
                    value={formValues.additional_notes}
                    onChange={(e) =>
                      handleChange("additional_notes", e.target.value)
                    }
                  />
                  <label style={{ color: "#666666" }}>Additional Notes</label>
                  {errors.additional_notes && (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.additional_notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Upload File */}
              <div className="col-12 mb-3">
                <div className="form-group flex-column-reverse align-items-lg-start">
                  <Upload
                    accept="*"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleChange("file", file);
                      return false;
                    }}
                  >
                    <Button>Browse..</Button>
                  </Upload>
                  <label style={{ color: "#666666" }}>Upload File</label>
                  {formValues.file && (
                    <span style={{ marginLeft: "10px", color: "green" }}>
                      1 File Uploaded
                    </span>
                  )}
                  {errors.file && (
                    <div style={{ color: "red", fontSize: "13px" }}>
                      {errors.file}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default OrderPackagesDetails;

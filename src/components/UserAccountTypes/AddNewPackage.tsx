import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import {
  createPackage2,
  getCities,
  getCountries,
  getHotels,
} from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const NewPackages = () => {
  const [files, setFiles] = useState([]);
  const [country, setCountry] = useState<any>([]);
  const [departureCities, setDepartureCities] = useState<any>([]);
  const [destinationCities, setDestinationCities] = useState<any>([]);
  // const [packageCategory, setPackageCategory] = useState<any>([]);
  const [packageList, setPackageList] = useState<any>([]);
  const [packageOne, setOnePackage] = useState<any>([]);
  const [hotel, setHotel] = useState<any>([]);
  const [formData, setFormData] = useState({});
  const [packageType, setPackageType] = useState("flat");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const enums = {
    packageType: [
      { id: 1, name: "Economy" },
      { id: 2, name: "Three Star" },
      { id: 3, name: "Four Star" },
      { id: 4, name: "Five Star" },
    ],
    paymentType: [
      { id: 1, name: "full_payment" },
      { id: 2, name: "bnpl" },
    ],
    packageCategory: [
      { id: 1, name: "hajj" },
      { id: 2, name: "umrah" },
    ],
    currency: [{ id: 1, name: "SAR" }],
    minPeople: [{ id: 1, name: "1" }],
    vendor: [{ id: 1, name: "Mabrour" }],
    hotel: [
      { id: 1, name: "conrad_makkah_madinah" },
      { id: 2, name: "pullman_zamzam_madinah" },
      { id: 3, name: "intercontinental_dar_al_tawhid" },
    ],
  };
  const getPackageType = (value: any) => {
    const type = enums?.packageType.find((g) => g.id === value);
    return type ? type.name : "";
  };
  const getHotel = (value: any) => {
    const type = enums?.hotel.find((g) => g.id === value);
    return type ? type.name : "";
  };
  const paymentTypeID = (value: any) => {
    const type = enums?.paymentType.find((g) => g.id === value);
    return type ? type.name : "";
  };
  const packageCategoryID = (value: any) => {
    const type = enums?.packageCategory.find((g) => g.id === value);
    return type ? type.name : "";
  };
  const currencyList = (value: any) => {
    const type = enums?.currency.find((g) => g.id === value);
    return type ? type.name : "";
  };
  const vendorId = (value: any) => {
    const type = enums?.vendor.find((g) => g.id === value);
    return type ? type.name : "";
  };
  function formatLabel(text?: string): string {
    if (!text) return ""; // or return text ?? "" if you prefer
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const fields = [
    {
      key: "title",
      label: "Title",
      placeholder: "Enter Title",
      type: "input",
      //height: "6vh",
    },
    {
      key: "packageType",
      label: "Package Type",
      placeholder: "Select Package Type",
      type: "select",
      options: enums?.packageType,
      value: getPackageType(enums?.packageType),
      height: "5vh",
    },
    {
      key: "payment_type_id",
      label: "Payment Type",
      placeholder: "Select Payment Type",
      type: "select",
      options: enums?.paymentType,
      value: paymentTypeID(enums?.paymentType),
      height: "5vh",
    },
      {
      key: "package_category_id",
      label: "Package Category",
      placeholder: "Select Category",
      type: "select",
      options: enums?.packageCategory,
      value: packageCategoryID(enums?.packageCategory),
      height: "5vh",
    },
    {
      key: "vendor",
      label: "Vendor",
      placeholder: "Select Vendor",
      type: "select",
      options: enums?.vendor,
      value: vendorId(enums?.vendor),
      height: "5vh",
    },
    {
      key: "Available_on_BNPL",
      label: "Available on BNPL",
      type: "switch",
    },
    {
      key: "flight_inclusive",
      label: "Package is inclusive of Flight",
      type: "switch",
    },
    {
      key: "visa_inclusive",
      label: "Package Inclusive of visa",
      type: "switch",
    },
    {
      key: "Return_Flight",
      label: "Return Flight",
      type: "switch",
    },
    {
      key: "description",
      label: "Description",
      placeholder: "Enter Description",
      type: "textarea",
      colSize: "col-12",
      height: "20vh",
    },
    {
      key: "Departure Country",
      label: "Departure Country",
      placeholder: "Select Departure Country",
      type: "select",
      value: country?.name || "",
      options: country,
      colSize: "col-4",
      height: "5vh",
    },
    {
      key: "Departure City",
      label: "Departure City",
      placeholder: "Select Departure City",
      type: "select",
      value: departureCities?.name || "",
      options: departureCities,
      colSize: "col-4",
      height: "5vh",
    },
     {
      key: "Destination Country",
      label: "Destination Country",
      placeholder: "Select Destination Country",
      type: "select",
      value: country?.name || "",
      options: country,
      colSize: "col-4",
      height: "5vh",
    },
    {
      key: "Destination City",
      label: "Destination City",
      placeholder: "Select Destination City",
      type: "select",
      value: destinationCities?.name || "",
      options: destinationCities,
      colSize: "col-4",
      height: "5vh",
    },
    {
      key: "Currency",
      label: "Currency",
      placeholder: "Select Currency",
      type: "select",
      options: enums?.currency,
      value: currencyList(enums?.currency),
      colSize: "col-4",
      height: "5vh",
    },

    {
      key: "total_duration",
      label: "Duration",
      placeholder: "Enter Duration",
      type: "input",
      colSize: "col-4",
      //height: "5vh",
    },

    {
      key: "stay_in_makkah",
      label: "Stay in Makkah",
      placeholder: "Enter Duration",
      type: "input",
      colSize: "col-4",
      //height: "5vh",
    },
    {
      key: "stay_in_madinah",
      label: "Stay in Madinah",
      placeholder: "Enter Duration",
      type: "input",
      colSize: "col-4",
      //height: "5vh",
    },

    {
      key: "start_date",
      label: "Start Date",
      placeholder: "Enter Start Date",
      type: "date",
      colSize: "col-4",
      height: "7vh",
    },
    {
      key: "end_date",
      label: "End Date",
      placeholder: "Enter End Date",
      type: "date",
      colSize: "col-4",
      height: "7vh",
    },

    {
      key: "no_of_people",
      label: "No of People",
      placeholder: "Enter No of People",
      type: "input",
      colSize: "col-4",
    },

    {
      key: "hotel_id",
      label: "Hotel",
      placeholder: "Select Hotel",
      type: "select",
      options: enums?.hotel,
      value: getHotel(hotel?.name),
      colSize: "col-4",
      height: "5vh",
    },
    // {
    //   key: "Airline/Flight",
    //   label: "Airline/Flight",
    //   placeholder: "Enter Airline/Flight",
    //   type: "select",
    //   options: [
    //     { value: "basic", label: "Basic" },
    //     { value: "premium", label: "Premium" },
    //     { value: "enterprise", label: "Enterprise" },
    //   ],
    //   colSize: "col-4",
    //   height: "5vh",
    // },
  ];

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const removeFile = (fileKey: any) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileKey));
    if (fileInputRef.current && files.length === 1) {
      fileInputRef.current.value = ""; // Clears selected files
    }
  };
  //api implementation
  const getCountryList = async () => {
    try {
      const response = await getCountries(1000);
      if (response) {
        const data = response?.data?.data;
        setCountry(data || []);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const getDepartureCitiList = async (id) => {
    try {
      const response = await getCities(id);
      if (response) {
        const data = response?.data?.data;
        setDepartureCities(data || []);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const getDestinationCitiList = async (id) => {
    try {
      const response = await getCities(id);
      if (response) {
        const data = response?.data?.data;
        setDestinationCities(data || []);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const getHotelList = async () => {
    try {
      const response = await getHotels();
      if (response) {
        const data = response?.data?.data;
        setHotel(data || []);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleTextAreaChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      combined_content: `
        <h2>FAQs</h2>
        <p>Write your FAQs here...</p>
        <h2>Package Includes</h2>
        <p>Write what the package includes here...</p>
        <h2>Package Excludes</h2>
        <p>Write what the package excludes here...</p>
        <h2>Itinerary</h2>
        <p>Write the itinerary here...</p>
      `,
    }));
  }, []);

  const addPackage2 = async () => {
    const content = formData["combined_content"] || "";
    setLoading(true);
    try {
      const formDataBody = new FormData();

      // Basic fields
      formDataBody.append("title", formData["title"] || "");
      formDataBody.append("vendor_id", formData["vendor"] || "");
      formDataBody.append(
        "available_on_bnpl",
        formData["Available_on_BNPL"] || 0
      );
      formDataBody.append(
        "flight_inclusive",
        formData["flight_inclusive"] || 0
      );
      formDataBody.append("visa_inclusive", formData["visa_inclusive"] || 0);
      formDataBody.append("return_flight", formData["Return_Flight"] || 0);
      formDataBody.append("package_type_id", formData["packageType"] || "");
      // formDataBody.append("price", formData["price"] || "");
      formDataBody.append("allowed_people", formData["no_of_people"] || "");
      formDataBody.append(
        "package_category_id",
        formData["package_category_id"] || ""
      );
      formDataBody.append("payment_type_id", formData["payment_type_id"] || "");
      // formDataBody.append("package_category_id", '1');
      formDataBody.append("description", formData["description"] || "");
      formDataBody.append("departure_city", formData["Departure City"] || "");
      formDataBody.append("destination_city", formData["Destination City"] || "");
      formDataBody.append("return_from", formData["Destination City"] || "");
      formDataBody.append(
        "visa_requirements",
        formData["Visa Requirments"] || ""
      );
      formDataBody.append(
        "cancellation_policy",
        formData["Cancellation Policy"] || ""
      );
      formDataBody.append(
        "terms_and_conditions",
        formData["Terms & Conditions"] || ""
      );
      if (packageType === "flat") {
        formDataBody.append("price", formData["price"] || "");
      } else {
        formDataBody.append("adult_price", formData["adult_price"] || "");
        formDataBody.append("child_price", formData["child_price"] || "");
        formDataBody.append("infant_price", formData["infant_price"] || "");
      }
      formDataBody.append("hotel_id", formData["hotel_id"] || "");
      formDataBody.append("status", formData["active"] || 0);
      formDataBody.append("start_date", formData["start_date"] || "");
      formDataBody.append("end_date", formData["end_date"] || "");
      formDataBody.append("total_duration", formData["total_duration"] || "");
      formDataBody.append("currency", formData["Currency"] || "");
      formDataBody.append("stay_in_makkah",formData["stay_in_makkah"] || "");
      formDataBody.append("stay_in_madinah",formData["stay_in_madinah"] || "");

      // Static fields
      
      // formDataBody.append("return_from", "7980");
      formDataBody.append("content_description", "hello");
      // formDataBody.append("allowed_people", "6");
      formDataBody.append("minimum_age", "5");
      formDataBody.append("transport", "2");

      // HTML extracted sections
      formDataBody.append("faqs", extractSectionByHeading(content, "FAQs"));
      formDataBody.append(
        "package_includes",
        extractSectionByHeading(content, "Package Includes")
      );
      formDataBody.append(
        "package_exclude",
        extractSectionByHeading(content, "Package Excludes")
      );
      formDataBody.append(
        "itinerary",
        extractSectionByHeading(content, "Itinerary")
      );

      files.forEach((file) => {
        formDataBody.append("images[]", file);
      });

      const response = await createPackage2(formDataBody);
      console.log(response, "responseresponse");
      if (response?.data?.success) {
        const data = response?.data.data;
        setOnePackage(data);
        setLoading(false);
        navigate("/Packages/AllPackages");
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.errors || "Something went wrong");
    }
  };

  useEffect(() => {
    getCountryList();
    // getCitiList();
    getHotelList();
    // getPackage();
    // getCategory();
  }, []);
  const handleSave = () => {
    addPackage2();
  };
  const handleFieldChange = (key, value) => {
    if(key==='Departure Country'){
      getDepartureCitiList(value)
    }else if(key==='Destination Country')(
      getDestinationCitiList(value)
    )
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const extractSectionByHeading = (html, heading) => {
    const regex = new RegExp(`<h2>${heading}</h2>([\\s\\S]*?)(?=<h2>|$)`, "i");
    const match = html.match(regex);
    return match ? match[1].trim() : "";
  };

  return (
    <>
    {loading && <Loader />}
    <Form layout="vertical">
      <div className="row p-2 mt-4">
        {fields.map((field) => (
          <div className={`${field.colSize || "col-6"} mb-3`} key={field.key}>
            <div className="form-group form-label-group">
              {field.type === "input" ? (
                <Input
                  className="shadow-none  modal-input br-10"
                  placeholder={field.placeholder}
                  value={formData[field.key] || ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  style={{
                    height: field.height || "",
                  }}
                />
              ) : field.type === "textarea" ? (
                <TextArea
                  className="modal-input shadow-none "
                  value={formData[field.key] || ""}
                  onChange={(e) => handleFieldChange(field.key, e.target.value)}
                  style={{
                    height: field.height || "100px",
                    resize: "none",
                  }}
                />
              ) : field.type === "date" ? (
                <DatePicker
                  style={{ width: "100%", height: field.height || "" }}
                  value={
                    formData[field.key] ? dayjs(formData[field.key]) : null
                  }
                  onChange={(date, dateString) =>
                    handleFieldChange(field.key, dateString)
                  }
                />
              ) : field.type === "switch" ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 12px",
                    height: field.height || "5vh",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600, color: "#181717" }}>
                    {field.label}
                  </p>
                  <Switch
                    checked={formData[field.key] === 1}
                    onChange={(checked) =>
                      handleFieldChange(field.key, checked ? 1 : 0)
                    }
                  />
                </div>
              ) : (
                <Select
                  style={{
                    height: "55px",
                  }}
                  value={formData[field.key] || undefined}
                  placeholder={field.placeholder}
                  onChange={(value) => handleFieldChange(field.key, value)}
                >
                  {field.options.map((option) => (
                    <option
                      key={option.id || option.value}
                      value={option.id || option.value}
                    >
                      {formatLabel(option?.name)}
                    </option>
                  ))}
                </Select>
              )}
              {
                field.type !== "switch"  &&
              <label style={{ color: "#666666" }}>{field.label}</label>
              }
            </div>
          </div>
        ))}

        <div className="col-12 mt-5">
          <Form.Item label="Package Price">
            <Radio.Group
              onChange={(e) => setPackageType(e.target.value)}
              value={packageType}
            >
              <Radio value="flat">Flat Package Price (All Ages)</Radio>
              <Radio value="installment">Variable Package Price</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="form-group form-label-group ">
            {packageType === "flat" && (
              <>
                <Form.Item className="col-6 mt-2" name="flat_amount">
                  <Input
                    placeholder="Enter amount"
                    value={formData["price"] || ""}
                    onChange={(e) => handleFieldChange("price", e.target.value)}
                  />
                  <label style={{ color: "#666666" }}>Package Price</label>
                </Form.Item>
              </>
            )}
          </div>
          <div className="d-flex gap-1 form-group form-label-group">
            {packageType === "installment" && (
              <>
                <Form.Item className="col-4" name="adult_price">
                  <Input
                    placeholder="Enter adult package price"
                    value={formData["adult_price"] || ""}
                    onChange={(e) =>
                      handleFieldChange("adult_price", e.target.value)
                    }
                  />
                  <label style={{ color: "#666666" }}>
                    Package Price for Adult
                  </label>
                </Form.Item>

                <Form.Item className="col-4" name="child_price">
                  <Input
                    placeholder="Enter child package price"
                    value={formData["child_price"] || ""}
                    onChange={(e) =>
                      handleFieldChange("child_price", e.target.value)
                    }
                  />
                  <label style={{ color: "#666666" }}>
                    Package Price for Child
                  </label>
                </Form.Item>

                <Form.Item className="col-4" name="infant_price">
                  <Input
                    placeholder="Enter infant package price"
                    value={formData["infant_price"] || ""}
                    onChange={(e) =>
                      handleFieldChange("infant_price", e.target.value)
                    }
                  />
                  <label style={{ color: "#666666" }}>
                    Package Price for Infant
                  </label>
                </Form.Item>
              </>
            )}
          </div>
        </div>
        <div className="col-12 mb-5">
          <Form.Item label="Package Details">
            <CKEditor
              //@ts-ignore
              editor={ClassicEditor}
              data={formData["combined_content"] || ""}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleFieldChange("combined_content", data);
              }}
            />
          </Form.Item>
        </div>

        <div className="col-12 gap-2 d-flex mt-5 ">
          <div className="col-6 ">
            <div className="form-group form-label-group">
              <TextArea
                placeholder="Terms & Conditions"
                name="Terms & Conditions"
                style={{ height: "96px" }}
                value={formData["Terms & Conditions"] || ""}
                onChange={(e) =>
                  handleTextAreaChange("Terms & Conditions", e.target.value)
                }
              />
              <label style={{ color: "#666666" }}>Terms & Conditions</label>
            </div>
          </div>
          <div className="col-6 ">
            <div className="form-group form-label-group">
              <TextArea
                placeholder="Cancellation Policy"
                name="Cancellation Policy"
                style={{ height: "96px" }}
                value={formData["Cancellation Policy"] || ""}
                onChange={(e) =>
                  handleTextAreaChange("Cancellation Policy", e.target.value)
                }
              />
              <label style={{ color: "#666666" }}>Cancellation Policy</label>
            </div>
          </div>
        </div>
        <div className="col-12 gap-2 d-flex mt-5 mb-3">
          <div className="col-6 ">
            <div className="form-group form-label-group">
              <TextArea
                placeholder="Visa Requirments"
                name="Visa Requirments"
                style={{ height: "96px" }}
                value={formData["Visa Requirments"] || ""}
                onChange={(e) =>
                  handleTextAreaChange("Visa Requirments", e.target.value)
                }
              />
              <label style={{ color: "#666666" }}>Visa Requirments</label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Switch
            checked={formData["active"] === 1}
            onChange={(checked) => handleFieldChange("active", checked ? 1 : 0)}
          />
          <label style={{ color: "black", marginLeft: "0.5rem" }}>
            {" "}
            Status
          </label>
        </div>
        <Row className="mb-3" align="bottom" gutter={16}>
          {/* File Upload Field */}
          <Col span={8}>
            <Form.Item
              label="Upload File"
              labelCol={{
                style: { fontSize: "18px", fontWeight: 800, marginTop: 8 },
              }}
            >
              <Input
                type="file"
                onChange={handleFileInput}
                className="p-2"
                style={{ height: "100%" }}
                // ref={fileInputRef}
              />
            </Form.Item>
          </Col>

          {/* Uploaded Files Count */}
          <Col
            span={8}
            style={{ height: "40px", display: "flex", alignItems: "center" }}
          >
            {files.length > 0 && (
              <span style={{ color: "#EB0D0D" }}>
                {files.length} documents uploaded
              </span>
            )}
          </Col>
          <div className="d-flex col-12  pt-3" style={{ listStyle: "none" }}>
            {files.map((file, index) => (
              <span
                key={index}
                className="d-flex me-3"
                style={{
                  border: "1px solid #E3EFF4",
                  borderRadius: "5px",
                  padding: "4px",
                  background: "#E3EFF4",
                }}
              >
                <span className="col-11 px-3 d-flex align-items-center">
                  {file.name}{" "}
                </span>
                <span
                  className="col-1 px-2 justify-content-center d-flex align-items-center cursor-pointer"
                  onClick={() => removeFile(index)}
                >
                  <CloseOutlined />
                </span>
              </span>
            ))}
          </div>
        </Row>
        <div className="border-top">
          <div className="row justify-content-end gap-2 mt-4 ">
            <Button className="col-1 theme-btn p-4">Close</Button>
            <button
              className="col-2 theme-btn"
              onClick={() => {
                handleSave();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Form>
    </>
  );
};

export default NewPackages;

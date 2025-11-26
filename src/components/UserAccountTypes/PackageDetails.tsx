import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getHotels, getPackagesbyId } from "../../redux/apis/apisCrud";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const PackageDetails = () => {
  const [files, setFiles] = useState([]);
  const [country, setCountry] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [packageOne, setOnePackage] = useState<any>([]);
  const [hotel, setHotel] = useState<any>([]);
  const [formData, setFormData] = useState<any>({});
  const [packageType, setPackageType] = useState("flat");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const flightDetails = useSelector(
    (state: RootState) => state.block.flightDetails
  );
  console.log(flightDetails?.booking_details?.pnr, "1122");

  useEffect(() => {
    getHotelList();
    fetchOnePackage();
  }, []);
  const enums = {
    packageType: [
      { id: 1, name: "Economy" },
      { id: 2, name: "Three Star" },
      { id: 3, name: "Four Star" },
      { id: 4, name: "Five Star" },
    ],
    packageCategory: [
      { id: 1, name: "full_payment" },
      { id: 2, name: "bnpl" },
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
  const getHotel = (value: any) => {
    const type = hotel.find((g) => g.id === value);
    return type ? formatLabel(type.name) : "";
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
  const getCity = (id: any) => {
    const type = cities.find((item) => item.id === id);
    return type ? type.name : "";
  };
  function formatLabel(text?: string): string {
    if (!text) return ""; // or return text ?? "" if you prefer
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  //api implementation;
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
  const fetchOnePackage = async () => {
    try {
      const content = formData["combined_content"] || "";
      setLoading(true);
      const response = await getPackagesbyId(id);

      if (response?.data?.success) {
        const apiData = response?.data?.data[0]?.package;
        console.log(apiData, "apiData");
        const combined = `
          <h2>FAQs</h2>
         <p>${apiData.faqs || "No FAQs provided"}</p>
          <h2>Package Includes</h2>
          <p>${apiData.package_includes || "No Package Includes provided"}</p>
          <h2>Package Excludes</h2>
          <p>${apiData.package_exclude || "No Package Excludes provided"}</p>
          <h2>Itinerary</h2>
          <p>${apiData.itinerary || "No Itinerary provided"}</p>
        `;
        // console.log(combined, "combined");

        setFormData({
          id: apiData.id,
          title: apiData.title || "",
          vendor: apiData.vendor_id || "",
          available_on_bnpl: apiData.available_on_bnpl ?? 0,
          flight_inclusive: apiData.flight_inclusive ?? 0,
          visa_inclusive: apiData.visa_inclusive ?? 0,
          Return_Flight: apiData.return_flight ?? 0,
          packageType: apiData.package_type || "",
          allowed_people: apiData.allowed_people || "",
          package_category: apiData.package_category || "",
          description: apiData.description || "",
          departure_city: apiData.departure_city || "",
          destination_city: apiData.destination_city || "",
          Currency: apiData.currency || "",
          total_duration: apiData.total_duration || "",
          start_date: apiData.start_date || "",
          end_date: apiData.end_date || "",
          hotel_id: apiData.hotel_id || "",
          adult_price: apiData.adult_price,
          child_price: apiData.child_price,
          combined_content: combined,

          "Terms & Conditions": apiData.terms_and_conditions || "",
          "Cancellation Policy": apiData.cancellation_policy || "",
          "Visa Requirments": apiData.visa_requirements || "",
          active: apiData.status ?? 0,
          price: apiData.price || "",

          infant_price: apiData.infant_price || "",
        });

        setPackageType(apiData.adult_price != null ? "installment" : "flat");

        setFiles(apiData.images || []);

        setOnePackage(apiData);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to load package");
    } finally {
      setLoading(false);
    }
  };

  const customerDetails = [
    { label: "Package Name", value: formData?.title || "-" },
    {
      label: "Package Type",
      value: formatLabel(formData?.packageType) || "-",
    },
    {
      label: "Package Category",
      value: formData?.package_category || "-",
    },
    { label: "Vendor", value: vendorId(formData.vendor) || "-" },
    {
      label: "Package is inclusive of Flight",
      value: formData.flight_inclusive ? "Yes" : "No",
    },
    {
      label: "Package is inclusive of Visa",
      value: formData.visa_inclusive ? "Yes" : "No",
    },
    { label: "Return Flight", value: formData.Return_Flight ? "Yes" : "No" },
    { label: "Package Price", value: `${formData.price} SAR` || "-" },
  ];
  const additionalDetails = [
    { label: "Departure City", value: formData.departure_city || "-" },
    {
      label: "Destination City",
      value: formData.destination_city || "-",
    },
    { label: "Currency", value: currencyList(formData.Currency) || "-" },
    { label: "Duration", value: formData.total_duration || "-" },
    { label: "Start Date", value: formData.start_date || "-" },
    { label: "End Date", value: formData.end_date || "-" },
    { label: "No of People", value: formData.allowed_people || "-" },
    { label: "Hotel", value: getHotel(formData.hotel_id) || "-" },
  ];

  return (
    <>
      <div className="profile-sec mt-3">
        <div className="row g-3 align-items-center account-card">
          <div className="col-12">
            <div className="row p-3">
              <div className="col-6">
                {customerDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between align-items-center"
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
                    className="d-flex justify-content-between align-items-center"
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
          <div className="col-12">
            <div className="d-flex flex-column justify-content-between align-items-start">
              <p
                style={{
                  color: "#6C727F",
                  fontSize: "14px",
                  lineHeight: "1.5rem",
                }}
              >
                Description
              </p>
              <span
                style={{
                  fontWeight: "600",
                  color: "#6C727F",
                  fontSize: "14px",
                }}
              >
                {formData.description}
              </span>
            </div>
          </div>
          {files.length > 0 && (
            <p
              style={{
                color: "#6C727F",
                fontSize: "14px",
                lineHeight: "1.5rem",
                marginTop: "30px",
              }}
            >
              Images
            </p>
          )}
          {files.map((obj) => (
            <div className="col-md-2 text-center">
              <img
                src={`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/${
                  obj.path
                }`}
                alt="Profile Image"
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="profile-tab mt-3 col-12 d-flex justify-content-center">
        <div>
          <img
            src={flightDetails?.data?.flight_details?.airLineImg}
            alt=""
            width={140}
            height={70}
          />
        </div>
        <div className="col-9 d-flex">
          <div className="col-3 text-end">
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.DepartureCountry
                : flightDetails?.data?.flight_details?.outbound
                    ?.DepartureCountry || "----"}
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "400" }}
              className="mt-2"
            >
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.flightStartDate
                : flightDetails?.data?.flight_details?.outbound
                    ?.flightStartDate || "----"}
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "600" }}
              className="mt-2"
            >
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.flightStartTime
                : flightDetails?.data?.flight_details?.outbound
                    ?.flightStartTime || "----"}
            </div>
          </div>
          <div className="col-6">
            <div className="px-2 mt-2">
              <div className="d-flex my-text pb-2 justify-content-center">
                {flightDetails?.data?.flight_details?.inbound
                  ? flightDetails?.data?.flight_details?.inbound
                      ?.totalElapsedTime
                  : flightDetails?.data?.flight_details?.outbound
                      ?.totalElapsedTime || "----"}
              </div>
             
            </div>
          </div>
          <div className="col-3 text-start">
            <div style={{ fontSize: "18px", fontWeight: "700" }}>
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.ArrivalCountry
                : flightDetails?.data?.flight_details?.outbound
                    ?.ArrivalCountry || "----"}
            </div>
            <div
              style={{ fontSize: "14px", fontWeight: "400" }}
              className="mt-2"
            >
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.flightEndDate
                : flightDetails?.data?.flight_details?.outbound
                    ?.flightEndDate || "----"}
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "600" }}
              className="mt-2"
            >
              {flightDetails?.data?.flight_details?.inbound
                ? flightDetails?.data?.flight_details?.inbound?.flightEndTime
                : flightDetails?.data?.flight_details?.outbound
                    ?.flightEndTime || "----"}
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="profile-tab mt-3">
        <Tabs
          id="controlled-tab-example"
          className="mt-30 position-relative tabs-overflow"
          activeKey={selectTab}
          style={{ borderBottom: "none" }}
          onSelect={(tab: any) => {
            setSelectedTab(tab);
          }}
        >
          {tapOptions.map((item: any) => (
            <Tab eventKey={item.key} title={item.title}>
              <div className="mt-3">
              </div>
            </Tab>
          ))}
        </Tabs>
      </div> */}
      {/* <div className="profile-sec mt-3">
        <Tabs
          id="controlled-tab-example"
          className="mt-30"
          style={{ display: "none", borderBottom: "none" }}
          activeKey={selectTab}
          onSelect={(tab: any) => {
            setSelectedTab(tab);
          }}
        >
          {tapOptions.map((item: any) => (
            <Tab eventKey={item.key} title={""}>
              <div className="mt-3">
                {selectTab === item.key && item.folder}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div> */}
    </>
  );
};

export default PackageDetails;

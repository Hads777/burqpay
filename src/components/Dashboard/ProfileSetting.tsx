import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import { Tab, Tabs } from "react-bootstrap";
import toast from "react-hot-toast";
import {
  changePassword,
  getCountries,
  updateProfileSetting,
} from "../../redux/apis/apisCrud";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const ProfileSetting = () => {
  const [country, setCountry] = useState<any>([]);
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    phone: "",
    dob: "",
    address: "",
    country_id: "",
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getCountryList = async () => {
    try {
      const response = await getCountries();
      if (response) {
        const data = response?.data?.data;
        setCountry(data || []);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  const updateProfile = async () => {
    try {
      const body = {
        _method: "put",
        name: formData.name,
        phone: formData.phone,
        dob: formData.dob,
        address: formData.address,
        country_id: formData.country_id,
      };
      const response = await updateProfileSetting(body);
      if (response?.data?.message) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors);
    }
  };
  const updatePassword = async () => {
    try {
      const body = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation,
      };
      const response = await changePassword(body);
      if (response?.data?.message) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors[0]);
    }
  };
  useEffect(() => {
    getCountryList();
  }, []);

  return (
    <>
      <div className="col-12 d-flex mb-5 mt-2">
        <h2 className="">Profile Setting</h2>
      </div>
      <div className="col-12">
        {/* Tabs positioned outside the container */}
        <Tabs defaultActiveKey="general" className="profile-tab">
          <Tab title="General Information" eventKey="general">
            <div className="">
              <Form>
                <div className="d-flex col-12 mt-4 gap-2">
                  <div className="col-6">
                    <div className="form-group form-label-group  d-grid">
                      <Input
                        className="shadow-none form-control modal-input br-10"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                      <label style={{ color: "#666666" }} htmlFor="password">
                        Name
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group form-label-group  d-grid">
                      <Input
                        className="shadow-none form-control modal-input br-10"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                      <label style={{ color: "#666666" }}>Email</label>
                    </div>
                  </div>
                </div>
                <div className="d-flex col-12 mt-4 gap-2">
                  <div className="col-6">
                    <div className="form-group form-label-group  d-grid">
                      <Input
                        className="shadow-none form-control modal-input br-10"
                        placeholder="Mobile No"
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                      <label style={{ color: "#666666" }}>Mobile No</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group form-label-group  d-grid">
                      <DatePicker
                        className="shadow-none form-control modal-input br-10"
                        placeholder="Date"
                        format="YYYY-MM-DD"
                        value={
                          formData["dob"]
                            ? dayjs(formData["dob"], "YYYY-MM-DD")
                            : null
                        }
                        onChange={(date, dateString) =>
                          //@ts-ignore
                          handleInputChange("dob", dateString)
                        }
                      />
                      <label style={{ color: "#666666" }} htmlFor="">
                        DOB
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex col-12 mt-4 gap-2">
                  <div className="col-6">
                    <div className="form-group form-label-group  d-grid">
                      <Input
                        className="shadow-none form-control modal-input br-10"
                        placeholder="Address"
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                      <label style={{ color: "#666666" }}>Address</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group form-label-group d-grid">
                      <Select
                        value={formData["country_id"]}
                        placeholder={country}
                        style={{ height: "5vh" }}
                        onChange={(value) =>
                          handleInputChange("country_id", value)
                        }
                      >
                        {country.map((option) => (
                          <option
                            key={option.id || option.value}
                            value={option.id || option.value}
                          >
                            {option.name}
                          </option>
                        ))}
                      </Select>
                      <label style={{ color: "#666666" }} htmlFor="password">
                        Country
                      </label>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end  mt-4 gap-2">
                  {/* <div>
                    <Switch />
                  </div> */}

                  <div className="">
                    <Button
                      onClick={() => {
                        updateProfile();
                      }}
                      style={{ backgroundColor: "#0B8644" }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Tab>

          <Tab eventKey="password" title="Password Settings">
            <div className="">
              <Form className="mt-5 gap-2">
                <div className="col-6 mb-2 mt-3">
                  <div className="form-group form-label-group  d-grid">
                    <Input
                      className="shadow-none form-control modal-input br-10"
                      placeholder="Old Password"
                      onChange={(e) =>
                        handleInputChange("current_password", e.target.value)
                      }
                    />
                    <label style={{ color: "#666666" }} htmlFor="password">
                      Old Password
                    </label>
                  </div>
                </div>
                <div className="col-6 mb-4">
                  <div className="form-group form-label-group  d-grid">
                    <Input
                      className="shadow-none form-control modal-input br-10"
                      placeholder="New Password"
                      onChange={(e) =>
                        handleInputChange("new_password", e.target.value)
                      }
                    />
                    <label style={{ color: "#666666" }} htmlFor="password">
                      New Password
                    </label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group form-label-group  d-grid">
                    <Input
                      className="shadow-none form-control modal-input br-10"
                      placeholder="Confirm New Password"
                      onChange={(e) =>
                        handleInputChange(
                          "new_password_confirmation",
                          e.target.value
                        )
                      }
                    />
                    <label style={{ color: "#666666" }} htmlFor="password">
                      Confirm New Password
                    </label>
                  </div>
                </div>

                <div className="d-flex col-6 justify-content-end  mt-4 gap-2">
                  <div className="">
                    <Button
                      onClick={() => {
                        updatePassword();
                      }}
                      style={{ backgroundColor: "#0B8644" }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileSetting;

import React, { useState } from "react";
import barqlogo from "../../assets/images/barqlogo.png";
import {
  customerLogin,
  customerReset,
  getPermissionForAllWeb,
  getPermissionList,
  refreshToken,
  resetPassword,
} from "../../redux/apis/apisCrud"; // Adjust the import path to where your `customerLogin` function is defined
import toast from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  setPermisssions,
  setRefreshToken,
  setToken,
} from "../../redux/apis/apisSlice";
import { useDispatch } from "react-redux";
import { Images } from "../Config/Images";
import {
  Button,
  Dropdown,
  Menu,
  Select,
  Modal,
  Input,
  Form,
  DatePicker,
  Upload,
} from "antd";
import Loader from "../Loader/Loader";
const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    changePassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    changePassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  console.log(token, "112233445566");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (value: any) => {
    setIsLoading(true);

    try {
      const body = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.changePassword,
        token: token,
      };
      const res = await resetPassword(body);

      if (res?.data?.success) {
        const value = res?.data?.data;
        console.log("Error during login:", res?.data?.message?.message);
        setIsLoading(false);
        toast.success(res?.data?.message?.message);
        navigate("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log("Error during login:", error?.response?.data?.message);
      toast.error(
        error?.response?.data?.errors[0] || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="col-12 p-3 d-flex vh-100">
        <div className="col-7 d-flex  align-items-center  ">
          <img className="col-12 kaba-img" src={Images.mabrourLogin} alt="" />
        </div>
        <div className="d-flex col-5 justify-content-start align-items-center">
          <div className="col-12 justify-content-start">
            <div className="w-100 form-p">
              <div className="col-12 d-flex justify-content-center">
                <img src={Images.mabrourLogo} alt="" className="logo-img " />
              </div>
              <div className="text-center mb-4">
                <div className="mabrour-heading">Welcome To Mabrour</div>
                <span className="login-continue">Reset Password</span>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ password: "", email: "" }}
              >
                <div className="form-group form-label-group">
                  <Input
                    className="shadow-none form-control modal-input br-10 mb-2"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label>Enter Your Email</label>
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>

                <div className="form-group form-label-group i-view-password d-grid">
                  <Input
                    className="shadow-none form-control modal-input br-10 d-flex"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    suffix={
                      passwordVisible ? (
                        <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setPasswordVisible(true)}
                        />
                      )
                    }
                    onChange={handleInputChange}
                  />
                  <label
                    style={{
                      zIndex: "1",
                      width: "72px",
                    }}
                  >
                    Password
                  </label>
                  {errors.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                </div>

                <div className="form-group form-label-group i-view-password    d-grid">
                  <Input
                    className="shadow-none form-control modal-input br-10 d-flex "
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="changePassword"
                    value={formData.changePassword}
                    onChange={handleInputChange}
                    suffix={
                      confirmPasswordVisible ? (
                        <EyeTwoTone
                          onClick={() => setConfirmPasswordVisible(false)}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setConfirmPasswordVisible(true)}
                        />
                      )
                    }
                  />
                  <label
                    style={{
                      zIndex: "1",
                      width: "130px",
                    }}
                  >
                    Confirm Password
                  </label>
                  {errors.password && (
                    <div className="text-danger mt-2">
                      {errors.changePassword}
                    </div>
                  )}
                </div>
                <div className="d-flex login-btn-mabrour justify-content-center">
                  <button
                    className="btn w-100"
                    type="submit"
                    disabled={isLoading}
                    style={{
                      backgroundColor: "#0B8644",
                      borderRadius: "16px",
                      border: "none",
                      padding: "10px 20px",
                      color: "#fff",
                    }}
                  >
                    {isLoading ? "Loading..." : "Change Password"}
                  </button>
                </div>

                {/* <div className="text-center account-size mt-3">
                  <p>
                    Don't have an account?{" "}
                    <span
                      onClick={() => {
                        navigate("/signup");
                      }}
                      style={{ color: "#0B8644" }}
                    >
                      Sign Up
                    </span>
                  </p>
                </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

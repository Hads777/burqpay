import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  setPermisssions,
  setRefreshToken,
  setToken,
} from "../../redux/apis/apisSlice";
import { useDispatch } from "react-redux";
import { Images } from "../Config/Images";
import { Modal, Input, Form } from "antd";
import Loader from "../Loader/Loader";
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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

  // Static login: no API calls, just set dummy auth + permissions and navigate
  const handleSubmit = () => {
    // very basic front-end validation
    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setIsLoading(true);

    // Fake user data (shaped to work with existing header usage)
    const fakeUser = [
      {
        name: "Admin",
        email: formData.email,
        activity_user: "Admin",
        token: "static-token",
        refreshToken: "static-refresh-token",
      },
    ];

    localStorage.setItem("userData", JSON.stringify(fakeUser));
    localStorage.setItem("activity_user", fakeUser[0].activity_user);
    localStorage.setItem("name", fakeUser[0].name);
    localStorage.setItem("email", fakeUser[0].email);

    // Static token & permissions so the rest of the app works without API
    dispatch(setToken({ token: "static-token" }));
    dispatch(setRefreshToken({ refreshToken: "static-refresh-token" }));
    dispatch(
      setPermisssions({
        permissions: {
          modules: [
            { name: "dashboard_module" },
            { name: "customer_module" },
            { name: "roles_module" },
            { name: "department_module" },
            { name: "employee_module" },
            { name: "package_module" },
            { name: "orders_module" },
            { name: "topup_module" },
            { name: "faq_module" },
            { name: "terms&conditions_module" },
            { name: "mabrour_module" },
          ],
        },
      })
    );

    toast.success("Logged in (static)");
    navigate("/Dashboard");
    setIsLoading(false);
  };

  // Static reset password: just show a toast and close modal
  const handleReset = () => {
    if (!resetLink) {
      toast.error("Please enter an email address");
      return;
    }
    toast.success("Password reset link sent (static)");
    setIsDeleteModalVisible(false);
    setResetLink("");
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
                <span className="login-continue">Login to Continue</span>
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

                <div className="form-group form-label-group i-view-password  d-grid">
                  <Input
                    className="shadow-none form-control modal-input br-10 i-view-password d-flex"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: "48px",
                      borderRadius: "5px",
                      right: 0,
                      margin: "0 auto",
                      paddingLeft: "15px",
                      marginRight: "0px",
                    }}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    suffix={
                      passwordVisible ? (
                        <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setPasswordVisible(true)}
                        />
                      )
                    }
                  />
                  <label
                    style={{ position: "relative", zIndex: "1", width: "72px" }}
                  >
                    Password
                  </label>
                  {errors.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                </div>

                <div className="d-flex align-items-center remember-padding">
                  <input type="checkbox" />
                  <span className="ps-2">Remember me</span>
                  <div className="ms-auto">
                    <div
                      onClick={() => {
                        // navigate("/Dashboard/ProfileSetting");
                        setIsDeleteModalVisible(true);
                      }}
                      style={{ color: "#0B8644", cursor: "pointer" }}
                    >
                      Forgot Password?
                    </div>
                  </div>
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
                    {isLoading ? "Loading..." : "Login"}
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
        <Modal
          className="custom-mod center-footer"
          style={{ maxWidth: "500px" }}
          visible={isDeleteModalVisible}
          closable={true}
          footer={null}
          onCancel={() => setIsDeleteModalVisible(false)}
          centered
        >
          <div
            className="mabrour-heading"
            style={{ display: "flex", alignItems: "start" }}
          >
            Forgot your password
          </div>
          <div style={{ textAlign: "start" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                marginBottom: "0",
                whiteSpace: "nowrap",
              }}
            >
              Please enter the registered email address, we will
            </p>
          </div>
          <div style={{ textAlign: "start" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                marginBottom: "0",
                whiteSpace: "nowrap",
              }}
            >
              send you the password reset information.
            </p>
          </div>
          <div className="form-group mt-5 form-label-group  d-grid">
            <Input
              className="shadow-none form-control modal-input br-10"
              type="email"
              placeholder="Email"
              name="email"
              value={resetLink}
              onChange={(e: any) => {
                setResetLink(e.target?.value);
              }}
            />
            <label>Enter Email Address</label>
          </div>
          <div>
            <button
              onClick={() => {
                handleReset();
              }}
              className="theme-btn mt-3 col-12"
            >
              Request reset link
            </button>
          </div>
          <div>
            <div
              onClick={() => {
                navigate("/login");
                setIsDeleteModalVisible(false);
              }}
              className="col-12 d-flex align-items-center mt-3 justify-content-center"
              style={{ color: "#17908D" }}
            >
              Back to Login
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Login;

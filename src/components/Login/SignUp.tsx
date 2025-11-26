import React, { useState } from "react";
import barqlogo from "../../assets/images/barqlogo.png";
import { customerLogin } from "../../redux/apis/apisCrud"; // Adjust the import path to where your `customerLogin` function is defined
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/apis/apisSlice";
import { useDispatch } from "react-redux";
import { Images } from "../Config/Images";
import { Form, Input } from "antd";
const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // State for validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // State for loading
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
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

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "User ID is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form has errors");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      // Call the customerLogin function
      const res = await customerLogin(formData);

      if (res?.data?.success) {
        const value = res?.data?.data;
        localStorage.setItem("userData", JSON.stringify(value));
        dispatch(setToken({ token: value?.token }));
        if (value?.token) {
          navigate("/dashboard");
        }
        // Handle successful login (e.g., store token, redirect, etc.)
        // Example: localStorage.setItem('token', value.token);

        toast.success("Login Successful");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="col-12 p-3 d-flex vh-100">
        <div className="col-7 d-flex  align-items-center  ">
          <img className="col-12 p-5" src={Images.mabrourSignup} alt="" />
        </div>
        <div className="d-flex col-5 justify-content-start align-items-center">
          <div className="col-12 justify-content-start">
            <div className="w-100">
              <div className="col-12 d-flex justify-content-center">
                <img
                  style={{ marginBottom: "3rem" }}
                  src={Images.mabrourLogo}
                  alt=""
                />
              </div>
              <div className="text-center mb-4">
                <h1>Welcome To Mabrour</h1>
                <span>Create An Account</span>
              </div>

              <Form>
                <div className="form-group form-label-group ">
                  <Input
                    className="shadow-none form-control modal-input br-10 mb-2"
                    placeholder="Name"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="name" className="">
                    Enter Your Name
                  </label>
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>
                <div className="form-group form-label-group ">
                  <Input
                    className="shadow-none form-control modal-input br-10 mb-2"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email" className="">
                    Enter Your Email
                  </label>
                  {errors.email && (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  )}
                </div>

                <div className="form-group form-label-group ">
                  <Input
                    className="shadow-none form-control modal-input br-10 mb-2"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">Password</label>
                  {errors.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                </div>
                <div className="form-group form-label-group ">
                  <Input
                    className="shadow-none form-control modal-input br-10 mb-2"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password">Confirm Password</label>
                  {errors.password && (
                    <div className="text-danger mt-2">{errors.password}</div>
                  )}
                </div>
                <div className="d-flex align-items-center pt-3">
                  <input type="checkbox" />
                  <span className="ps-2">Remember me</span>
                  <div className="ms-auto">
                    <a href="#" style={{ color: "#0B8644" }}>
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
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
                    {isLoading ? "Loading..." : "Sign Up"}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => {
                        navigate("/");
                      }}
                      style={{ color: "#0B8644" }}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

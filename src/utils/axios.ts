// src/utils/axios.js

import Axios from "axios";
import { store } from "../redux/store";
import { navigate } from "./const.utils";
import toast from "react-hot-toast";
import { refreshToken } from "../redux/apis/apisCrud";
import { setToken } from "../redux/apis/apisSlice";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

axios.interceptors.request.use((reqConfig) => {
  const config = { ...reqConfig };
  const token = (store.getState() as any).block.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept"] = "application/json";
//     config.headers["Content-Type"] = "application/json";
// config.headers["Cache-Control"] = "no-cache";
// config.headers["Accept-Encoding"] = "gzip, deflate, br";
// config.headers["Connection"] = "keep-alive";
    
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        // const refreshtoken = (store.getState() as any).block.refreshToken;
        // const response = await refreshToken({
        //   _method: "put",
        //   refreshToken: `${refreshtoken}`
        // });
        // if (response) {
        //   const value = response?.data?.data;
        //   store.dispatch(setToken({ token: value[0]?.accessToken }));
        //   console.log(response,"response")
        // }
        // else{
        //   console.log("response1")
        //   navigate("/login")
        //   store.dispatch(setToken({ token: "" }));
        // }
        navigate("/login");
        store.dispatch(setToken({ token: "" }));
      } catch (err: any) {
        toast.error(err?.message);
        console.log("response2");
        navigate("/login");
        store.dispatch(setToken({ token: "" }));
      }
    }
    if (error?.response?.status === 422) {
      try {
        // toast.error(error?.response?.data?.errors[0])
        console.log(error?.response?.data?.errors[0], "124");
      } catch (err: any) {
        toast.error(err?.message);
      }
    }

    return Promise.reject(error);
  }
);

export default axios;

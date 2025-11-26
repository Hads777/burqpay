import Axios from "axios";

import { v4 as uuidv4 } from 'uuid'

const axiosTenant = Axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_BUSINESS,
  // withCredentials: true,
});
let tokenValue = localStorage.getItem("accessToken");
axiosTenant.interceptors.request.use((reqConfig) => {
  const config = { ...reqConfig };

  // console.log("Trying to add token")
  // if (!config.headers["Authorization"]) {


    // console.log(accessToken);
    // if (accessToken && accessToken !== "undefined") {
      config.headers["Authorization"] = `Bearer `;
      config.headers["Content-Type"] = "application/json";
      config.headers["Request-Id"] = uuidv4();

      // console.log("Adding token", accessToken)
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Request-Id": "eef836f0-1a0d-43e5-8200-b02fe4730ce4",
    //   },
      // config.headers.authorization = accessToken;
    // }
  // }
  return config;
});

axiosTenant.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    console.log(error)
    if (error?.response?.status === 401) {
      console.log("Returing error")
    }
    return error;
  },
);

// const refreshAccessToken = async () => {
//   const refreshToken = Cookies.get("refreshToken");
//   const token = Cookies.get("token");

//   if (
//     !(refreshToken && token) ||
//     refreshToken === "undefined" ||
//     token === "undefined"
//   ) {
//     return Promise.reject("Access denied... No token found");
//   }

//   const tokens = await axios.post("/v1/auth/refresh-token", {
//     refreshToken: refreshToken,
//   });

//   Cookies.set("token", tokens.token);
//   Cookies.set("refreshToken", tokens.refreshToken);
//   return Promise.resolve(tokens);
// };

export default axiosTenant;
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";
// import qs from "qs";

export const ACCESS_TOKEN_HEADER_NAME = "Authorization";
export const ACCESS_TOKEN_HEADER_VALUE_PREFIX = "Bearer";
const axiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Cache-Control": "no-store, no-cache, must-validate",
    "Content-Type": "application/json",
  },
  withCredentials: true,
  // paramsSerializer: {
  //   serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }),
  // },
};

const liveInstance = axios.create(axiosRequestConfig);

const instance = liveInstance;

// Add request interceptor to attach access token to requests
instance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers[
        ACCESS_TOKEN_HEADER_NAME
      ] = `${ACCESS_TOKEN_HEADER_VALUE_PREFIX} ${accessToken}`;
      // ] = `${ACCESS_TOKEN_HEADER_VALUE_PREFIX} ${accessToken}`;
    }

    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => Promise.reject(error)
);

// Add refresh token logic
// createAuthRefreshInterceptor(
//   instance,
//   async (failedRequest) => {
//     const refreshToken = Cookies.get("refreshToken");
//     debugger;
//     if (!refreshToken && window.location.pathname !== "/login") {
//       // Redirect to login if no refresh token is available
//       window.location.href = "/login";
//       return Promise.reject(failedRequest);
//     }

//     try {
//       // Make a request to refresh the token
//       const response = await axios.post(
//         `${process.env.SMARTFRONT_BASE_URL}/refresh`,
//         {
//           refresh_token: refreshToken,
//         }
//       );

//       const newAccessToken = response.data.access_token;
//       const newRefreshToken = response.data.refresh_token;

//       // Store the new tokens in cookies
//       Cookies.set("accessToken", newAccessToken, { expires: 3 / 24 }); // Expires in 30 min
//       Cookies.set("refreshToken", newRefreshToken, { expires: 6 / 24 }); // Expires in 8 hours

//       // Update the failed request with the new token
//       failedRequest.response.config.headers[
//         ACCESS_TOKEN_HEADER_NAME
//       ] = `${ACCESS_TOKEN_HEADER_VALUE_PREFIX} ${newAccessToken}`;

//       return Promise.resolve();
//     } catch (error) {
//       // Handle token refresh errors (e.g., invalid refresh token)
//       window.location.href = "/auth";
//       return Promise.reject(error);
//     }
//   },
//   {
//     statusCodes: [401],
//     pauseInstanceWhileRefreshing: true,
//   }
// );

export default instance;

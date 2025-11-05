import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");
    const rtoken = Cookies.get("rtoken");

    config.headers = config.headers || {};

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    if (rtoken) {
      config.headers.refreshToken = `${rtoken}`;
    }

    // Set appropriate Content-Type based on request data
    config.headers["Content-Type"] =
      config.data instanceof FormData
        ? "multipart/form-data"
        : "application/json";

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      // logout if inActive // uncomment if real time respone coming from api
      // if (error.response.status === 601) {
      //   return LogoutAll();
      // }

      // refresh token api call
      if (error.response.status === 420) {
        try {
          const rtoken = Cookies.get("rtoken");

          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
            {
              headers: {
                refreshToken: rtoken,
              },
            }
          );

          if (data.status) {
            const { token } = data?.data;
            Cookies.set("token", token);
            error.config.headers.Authorization = token;
            return axiosInstance(error.config);
          }
        } catch (err: any) {
          // logout if inActive // uncomment if real time respone coming from api
          // if (err.status === 601) LogoutAll();
        }
      }
    } else {
      toast.error("Oops! No response from server");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

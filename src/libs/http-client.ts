import axios, { AxiosInstance } from "axios";
import nookies from "nookies";
import { removeCookie } from "./cookies";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    const isServer = typeof window === "undefined";

    if (!isServer) {
      const cookies = nookies.get();
      const token = cookies.token;

      if (!config.headers.Authorization && token) {
        config.headers.Authorization = `${token}`;
      }
    }

    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeCookie("token");
    }
    return await Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import alertify from "alertifyjs";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7003/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

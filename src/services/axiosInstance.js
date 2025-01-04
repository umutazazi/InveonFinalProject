import axios from "axios";
import alertify from "alertifyjs";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7003/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error), alertify.error("An error occurred");
  }
);

export default axiosInstance;

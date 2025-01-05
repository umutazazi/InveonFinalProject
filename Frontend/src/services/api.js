import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = "https://localhost:7003/api"; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginWithToken = async (email, password) => {
  try {
    const response = await api.post("/Auth/CreateToken", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error posting example data:", error);
    throw error;
  }
};
export const registerUser = async (username, email, password) => {
  try {
    await api.post("/User", {
      username,
      email,
      password,
    });
  } catch (error) {
    console.error("Error posting example data:", error);
    throw error;
  }
};

export const createOrder = async (userId, courseId) => {
  try {
    const response = await axiosInstance.post(
      `/Order/${userId}/${courseId}/purchase`
    );
    return response.data;
  } catch (error) {
    console.error("Error posting example data:", error);
    throw error;
  }
};

export const createPayment = async (userId, orderId, amount) => {
  try {
    const payment = {
      userId: parseInt(userId),
      orderId: orderId,
      amount: amount,
      paymentMethod: "Credit Card",
      paymentDate: new Date().toISOString(),
    };

    const paymentResponse = await axiosInstance.post("/Payment/", payment);
    return paymentResponse.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

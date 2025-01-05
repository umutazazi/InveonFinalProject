import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Failed to decode token", error);
        logout();
      }
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          const timeLeft = decodedToken.exp - currentTime;
          if (timeLeft < 300) {
            // If less than 5 minutes left
            refreshToken();
          } else if (decodedToken.exp < currentTime) {
            logout();
          }
        } catch (error) {
          console.error("Failed to decode token", error);
          logout();
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const login = (token, refreshToken) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles;
    const userId = decodedToken.sub;
    localStorage.setItem("role", roles);
    localStorage.setItem("userId", userId);
    setUser(decodedToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await axiosInstance.post(
        "/Auth/CreateTokenByRefreshToken/",
        {
          token: refreshToken,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to refresh token");
      }

      const data = response.data.data;
      login(data.accessToken, data.refreshToken);
    } catch (error) {
      console.error("Failed to refresh token", error);
      alertify.error("Login session expired. Please log in again.");
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

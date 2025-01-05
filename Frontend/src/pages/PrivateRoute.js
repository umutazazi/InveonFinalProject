import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            logout();
          }
        } catch (error) {
          console.error("Failed to decode token", error);
          logout();
        }
      }
    };

    checkTokenExpiration();
  }, [logout]);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

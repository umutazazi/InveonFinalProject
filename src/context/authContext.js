import React, { createContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (token, refreshToken) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);

    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles;
    const userId = decodedToken.sub;
    localStorage.setItem("role", roles);
    localStorage.setItem("userId", userId);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
    alertify.error("Logout successful");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

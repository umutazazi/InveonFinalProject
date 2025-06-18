import React, { useState, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";
import { loginWithToken } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{6,}$/;
    return re.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alertify.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      alertify.error(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character"
      );
      return;
    }

    try {
      const response = await loginWithToken(email, password);
      const { accessToken, refreshToken } = response.data;

      login(accessToken, refreshToken);
      alertify.success("Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alertify.error("Email or password is incorrect");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="form-container fade-in-up">
        <div className="text-center mb-4">
          <h1 className="h2 fw-bold text-dark">Welcome Back</h1>
          <p className="text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="fas fa-envelope me-2"></i>
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            onClick={handleLogin}
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Sign In
          </button>

          <div className="text-center">
            <p className="text-muted mb-3">Don't have an account?</p>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={handleRegister}
            >
              <i className="fas fa-user-plus me-2"></i>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

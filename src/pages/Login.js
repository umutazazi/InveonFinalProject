import React, { useState, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";

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
      const response = await axios.post(
        "https://localhost:7003/api/Auth/CreateToken",
        {
          email,
          password,
        }
      );
      const { accessToken, refreshToken } = response.data.data;
      login(accessToken, refreshToken);
      navigate("/");
    } catch (error) {
      console.error(error);
      alertify.error("Email or password is incorrect");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="row m-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
            <button className="btn btn-secondary mt-3" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

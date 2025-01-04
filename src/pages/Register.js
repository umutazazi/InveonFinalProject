import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d]).{6,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
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

    if (password !== confirmPassword) {
      alertify.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://localhost:7003/api/Auth/Register", {
        username,
        email,
        password,
      });

      alertify.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alertify.error("An error occurred");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="text-center">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

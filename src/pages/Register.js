import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";
import { registerUser } from "../services/api";

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
      await registerUser(username, email, password);

      alertify.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alertify.error("An error occurred");
    }
  };
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="form-container fade-in-up">
        <div className="text-center mb-4">
          <h1 className="h2 fw-bold text-dark">Create Account</h1>
          <p className="text-muted">Join thousands of learners</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <i className="fas fa-user me-2"></i>
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>

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

          <div className="mb-3">
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
              placeholder="Create a password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleRegister}
          >
            <i className="fas fa-user-plus me-2"></i>
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary text-decoration-none fw-semibold"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

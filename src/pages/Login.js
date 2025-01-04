import React, { useState, useContext } from "react";
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7003/api/Auth/CreateToken",
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken } = response.data.data;

      const decodedToken = jwtDecode(accessToken);
      const roles = decodedToken.roles;
      console.log(roles);
      localStorage.setItem("role", JSON.stringify(roles));

      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      login(accessToken, roles);
      alertify.success("Login successful");
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
          <div className="row px-3">
            <button
              type="submit"
              className="btn btn-primary "
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

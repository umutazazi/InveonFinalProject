import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const role = localStorage.getItem("role");
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary  sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Inveon Course
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                {role === "Instructor" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/create-course">
                      Create Course
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

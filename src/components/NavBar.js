import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function NavBar() {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [token]);

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
  };
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
                    <p>Add Course</p>
                  </li>
                )}
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
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

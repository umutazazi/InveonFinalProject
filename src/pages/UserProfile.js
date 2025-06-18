import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [current, setCurrent] = useState("item1");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [courses, setCourses] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    try {
      axiosInstance.get(`/Order/${userId}/purchases`).then((res) => {
        setCourses(res.data.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [current]);

  useEffect(() => {
    try {
      axiosInstance.get(`/User/${userId}`).then((res) => {
        setEmail(res.data.data.email);
        setUsername(res.data.data.userName);
      });
    } catch (error) {
      console.error(error);
    }
  });

  const handleSaveChanges = () => {
    try {
      axiosInstance.put(`/User/${userId}`, {
        Email: email,
        UserName: username,
        NewPassword: password,
        CurrentPassword: currentPassword,
      });
      alertify("Changes saved successfully");
    } catch (error) {
      console.error("Failed to save changes", error);
      alertify("Failed to save changes");
    }
  };
  return (
    <div className="profile-container">
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="profile-sidebar">
              {" "}
              {/* Profile Header */}
              <div className="profile-header">
                <h4 className="profile-name">{username || "User"}</h4>
                <p className="profile-email">{email}</p>
                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-number">{courses.length}</span>
                    <span className="stat-label">Courses</span>
                  </div>
                </div>
              </div>
              {/* Navigation Menu */}
              <nav className="profile-nav">
                <button
                  className={`nav-item ${current === "item1" ? "active" : ""}`}
                  onClick={() => setCurrent("item1")}
                >
                  <i className="fas fa-user"></i>
                  <span>Profile Settings</span>
                </button>
                <button
                  className={`nav-item ${current === "item2" ? "active" : ""}`}
                  onClick={() => setCurrent("item2")}
                >
                  <i className="fas fa-graduation-cap"></i>
                  <span>My Courses</span>
                </button>
                <button
                  className={`nav-item ${current === "item3" ? "active" : ""}`}
                  onClick={() => setCurrent("item3")}
                >
                  <i className="fas fa-history"></i>
                  <span>Order History</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            <div className="profile-content">
              {current === "item1" && (
                <div className="content-section fade-in-up">
                  <div className="section-header">
                    <h2>
                      <i className="fas fa-user-edit"></i> Profile Settings
                    </h2>
                    <p>
                      Update your personal information and security settings
                    </p>
                  </div>

                  <div className="settings-card">
                    <div className="card-header">
                      <h5>
                        <i className="fas fa-info-circle"></i> Personal
                        Information
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">
                              <i className="fas fa-envelope"></i> Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="username">
                              <i className="fas fa-user"></i> Username
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="Enter your username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-card">
                    <div className="card-header">
                      <h5>
                        <i className="fas fa-lock"></i> Security Settings
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="currentPassword">
                              <i className="fas fa-key"></i> Current Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="currentPassword"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              placeholder="Enter current password"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="newPassword">
                              <i className="fas fa-lock"></i> New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter new password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-actions">
                        <button
                          className="btn btn-primary"
                          onClick={handleSaveChanges}
                        >
                          <i className="fas fa-save"></i> Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current === "item2" && (
                <div className="content-section fade-in-up">
                  <div className="section-header">
                    <h2>
                      <i className="fas fa-graduation-cap"></i> My Courses
                    </h2>
                    <p>Access your enrolled courses and track your progress</p>
                  </div>

                  {courses.length > 0 ? (
                    <div className="courses-grid">
                      {courses.map((course) => (
                        <div key={course.id} className="course-item">
                          <div className="course-card-modern">
                            <div className="course-image">
                              <img
                                src={
                                  course.imageUrl ||
                                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                }
                                alt={course.courseName}
                              />
                              <div className="course-overlay">
                                <button className="btn btn-light btn-sm">
                                  <i className="fas fa-play"></i> Continue
                                  Learning
                                </button>
                              </div>
                            </div>
                            <div className="course-info">
                              <h5 className="course-title">
                                {course.courseName}
                              </h5>
                              <div className="course-meta">
                                <span className="price">
                                  ${course.coursePrice}
                                </span>
                                <span className="date">
                                  Enrolled:{" "}
                                  {new Date(
                                    course.orderDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="progress-bar">
                                <div
                                  className="progress-fill"
                                  style={{ width: "65%" }}
                                ></div>
                              </div>
                              <p className="progress-text">65% Complete</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-graduation-cap empty-state-icon"></i>
                      <h3>No Courses Yet</h3>
                      <p>Start your learning journey by enrolling in courses</p>
                      <Link to="/" className="btn btn-primary">
                        <i className="fas fa-search"></i> Browse Courses
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {current === "item3" && (
                <div className="content-section fade-in-up">
                  <div className="section-header">
                    <h2>
                      <i className="fas fa-history"></i> Order History
                    </h2>
                    <p>View your purchase history and transaction details</p>
                  </div>

                  {courses.length > 0 ? (
                    <div className="orders-table-container">
                      <div className="table-responsive">
                        <table className="orders-table">
                          <thead>
                            <tr>
                              <th>
                                <i className="fas fa-hashtag"></i> Order ID
                              </th>
                              <th>
                                <i className="fas fa-book"></i> Course
                              </th>
                              <th>
                                <i className="fas fa-calendar"></i> Date
                              </th>
                              <th>
                                <i className="fas fa-dollar-sign"></i> Amount
                              </th>
                              <th>
                                <i className="fas fa-check-circle"></i> Status
                              </th>
                              <th>
                                <i className="fas fa-cog"></i> Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses.map((order) => (
                              <tr key={order.id}>
                                <td>
                                  <span className="order-id">#{order.id}</span>
                                </td>
                                <td>
                                  <div className="course-cell">
                                    <img
                                      src={
                                        order.imageUrl ||
                                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                                      }
                                      alt={order.courseName}
                                      className="course-thumb"
                                    />
                                    <span className="course-name">
                                      {order.courseName}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  {new Date(
                                    order.orderDate
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  <span className="amount">
                                    ${order.coursePrice}
                                  </span>
                                </td>
                                <td>
                                  <span className="status-badge success">
                                    <i className="fas fa-check"></i> Completed
                                  </span>
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    <button className="btn btn-sm btn-outline-primary">
                                      <i className="fas fa-download"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-secondary">
                                      <i className="fas fa-eye"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-receipt empty-state-icon"></i>
                      <h3>No Orders Found</h3>
                      <p>You haven't made any purchases yet</p>
                      <Link to="/" className="btn btn-primary">
                        <i className="fas fa-shopping-cart"></i> Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

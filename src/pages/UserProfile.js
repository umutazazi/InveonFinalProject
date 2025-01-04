import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [current, setCurrent] = useState("item1");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const userId = localStorage.getItem("userId");

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
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row" style={{ height: "100%" }}>
        <div className="col-md-3 col-12 shadow" style={{ height: "100%" }}>
          <div className="d-flex justify-content-center align-items-center flex-column mb-3 pt-3">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              className="rounded-circle"
            />
            <h3>{username}</h3>
          </div>

          <div className="list-group list-group-flush">
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                current === "item1" ? "active" : ""
              }`}
              onClick={() => setCurrent("item1")}
            >
              User Information
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                current === "item2" ? "active" : ""
              }`}
              onClick={() => setCurrent("item2")}
            >
              My Courses
            </a>
            <a
              href="#"
              className={`list-group-item list-group-item-action ${
                current === "item3" ? "active" : ""
              }`}
              onClick={() => setCurrent("item3")}
            >
              Order History
            </a>
          </div>
        </div>
        <div className="col-md-9 col-12" style={{ height: "100%" }}>
          <div className="row-md-12">
            {current === "item1" && (
              <div className="container-fluid">
                <h2 className="text-center">User Information</h2>
                <div className="row">
                  <div className="col-md-6">
                    <form className="form-floating">
                      <div className="mb-3">
                        <label htmlFor="floatingInputValue1">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInputValue1"
                          placeholder={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="floatingInputValue4">
                          Current Password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInputValue4"
                          placeholder="Current Password"
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <form className="form-floating">
                      <div className="mb-3">
                        <label htmlFor="floatingInputValue2">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInputValue2"
                          placeholder={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="floatingInputValue5">
                          New Password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInputValue5"
                          placeholder="New Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  className="btn btn-success mt-3"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            )}
            {current === "item2" && (
              <div>
                <h2>My Courses</h2>
                <p>Details about the user's courses.</p>
              </div>
            )}
            {current === "item3" && (
              <div>
                <h2>Order History</h2>
                <p>Details about the user's order history.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Spinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="loading-text">Loading courses...</p>
    </div>
  );
};

export default Spinner;

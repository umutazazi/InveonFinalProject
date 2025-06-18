import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="col-md-4 mb-4 fade-in-up" key={course.id}>
      <div className="card course-card h-100">
        <img
          src={
            course.imageUrl ||
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
          alt={course.name}
          className="card-img-top"
        />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title">{course.name}</h3>
          <p className="card-text flex-grow-1">{course.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="course-price">${course.price}</span>
            <Link to={`/courses/${course.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

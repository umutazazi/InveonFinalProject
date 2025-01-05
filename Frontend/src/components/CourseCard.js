import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="col-md-4 mb-4" key={course.id}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <img
            src={course.imageUrl}
            alt={course.name}
            className="img-fluid mb-3"
          />
          <h3 className="card-title ">{course.name}</h3>
          <p className="card-text">{course.description}</p>
          <p className="card-text">Price: ${course.price}</p>
          <Link to={`/courses/${course.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

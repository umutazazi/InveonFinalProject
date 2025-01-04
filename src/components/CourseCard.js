import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="col-md-4 mb-4" key={course.id}>
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <img
            src={"https://dummyimage.com/600x400/a1a1a1/ffffff&text=Course"}
            alt={course.name}
            className="img-fluid mb-3"
          />
          <p className="card-title width-bold">{course.name}</p>
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

import React, { useState, useEffect, useContext } from "react";
import { CourseContext } from "../context/courseContext";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6); // Number of courses per page

  const { courses } = useContext(CourseContext);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark mb-3">
          Discover Amazing Courses
        </h1>
        <p className="lead text-muted mb-4">
          Learn from industry experts and advance your skills
        </p>
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      {courses.length === 0 ? (
        <Spinner />
      ) : (
        <>
          {filteredCourses.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>No courses found</h3>
              <p>
                Try adjusting your search terms or browse all available courses.
              </p>
            </div>
          ) : (
            <>
              <div className="row">
                {currentCourses.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}
              </div>{" "}
              {filteredCourses.length > coursesPerPage && (
                <Pagination
                  coursesPerPage={coursesPerPage}
                  totalCourses={filteredCourses.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

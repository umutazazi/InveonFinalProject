import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5); // Number of courses per page

  useEffect(() => {
    try {
      axiosInstance.get("/Course/").then((response) => {
        setCourses(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    <div className="container">
      <SearchBar setSearchTerm={setSearchTerm} />
      {courses.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {currentCourses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </div>
          <Pagination
            coursesPerPage={coursesPerPage}
            totalCourses={filteredCourses.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

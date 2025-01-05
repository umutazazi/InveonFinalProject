import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";

export default function Instructor() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await axiosInstance.get(`/Course/${userId}/my-courses`);
      setCourses(response.data.data);
    } catch (error) {
      alertify.error("Failed to load courses");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        imageUrl:
          formData.imageUrl ||
          "https://dummyimage.com/600x400/a1a1a1/ffffff&text=Course",
        instructorId: parseInt(userId),
        instructorName: "",
      };

      await axiosInstance.post("/Course", courseData);
      alertify.success("Course added successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      });

      loadCourses();
    } catch (error) {
      alertify.error("Operation failed");
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axiosInstance.delete(`/Course/${courseId}`);
        alertify.success("Course deleted successfully");
        loadCourses();
      } catch (error) {
        alertify.error("Failed to delete course");
      }
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      description: course.description,
      price: course.price,
      category: course.category,
    });
  };

  return (
    <div className="container mt-4">
      <h2>{editingCourse ? "Edit Course" : "Add New Course"}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Course Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingCourse ? "Update Course" : "Add Course"}
        </button>
      </form>

      <h2>My Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">Price: ${course.price}</p>
                <div className="btn-group">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

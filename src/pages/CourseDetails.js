import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/authContext";
import { CartContext } from "../context/cartContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const user = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);

  const [isInCart, setIsInCart] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://localhost:7003/api/Course/${id}`)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const courseInCart = cart.find((item) => item.id === parseInt(id));
    console.log("courseInCart", courseInCart);
    if (courseInCart) {
      setIsInCart(true);
    }

    axiosInstance
      .get(`/Order/${userId}/purchases`)
      .then((response) => {
        const purchasedCourses = response.data.data;
        const coursePurchased = purchasedCourses.find(
          (item) => item.courseId === parseInt(id)
        );
        if (coursePurchased) {
          setIsPurchased(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, cart]);

  const handlePurchase = async () => {
    if (user.user === null) {
      alertify.error("Please login to add to cart the course!");
      navigate("/login");
    } else {
      if (isPurchased) {
        alertify.error("You have already purchased this course!");
        return;
      }

      if (isInCart) {
        alertify.error("This course is already in your cart!");
        return;
      }

      if (course) {
        addToCart(course);
        setIsInCart(true);
        alertify.success("Course added to cart!");
      }
    }
  };
  if (!course) {
    return <Spinner />;
  }

  return (
    <div className="container py-4">
      {/* Course Hero Section */}
      <div className="course-hero fade-in-up">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="category-badge">{course.category}</div>
            <h1>{course.name}</h1>
            <p className="lead mb-4">{course.description}</p>
            <div className="d-flex align-items-center gap-4">
              <span className="h2 mb-0 fw-bold">{course.price}₺</span>
              <button
                className="btn btn-success btn-lg"
                onClick={handlePurchase}
                disabled={isInCart || isPurchased}
              >
                {isPurchased ? (
                  <>
                    <i className="fas fa-check me-2"></i>
                    Purchased
                  </>
                ) : isInCart ? (
                  <>
                    <i className="fas fa-shopping-cart me-2"></i>
                    In Cart
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus me-2"></i>
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={
                course.imageUrl ||
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              }
              alt={course.name}
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>

      {/* Course Details Section */}
      <div className="row mt-5">
        <div className="col-md-8">
          <div className="card course-card">
            <div className="card-body">
              <h3 className="mb-4">Course Description</h3>
              <p className="text-muted">{course.description}</p>

              <h4 className="mt-4 mb-3">What you'll learn</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Master the fundamentals and advanced concepts
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Build real-world projects
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Get hands-on experience
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success me-2"></i>
                  Receive completion certificate
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card course-card">
            <div className="card-body">
              <h4 className="mb-3">Course Info</h4>
              <div className="mb-3">
                <strong>Category:</strong>
                <span className="ms-2 badge bg-primary">{course.category}</span>
              </div>
              <div className="mb-3">
                <strong>Price:</strong>
                <span className="ms-2 text-success fw-bold">
                  {course.price}₺
                </span>
              </div>
              <div className="mb-3">
                <strong>Duration:</strong>
                <span className="ms-2">8 weeks</span>
              </div>
              <div className="mb-3">
                <strong>Level:</strong>
                <span className="ms-2">Beginner to Advanced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

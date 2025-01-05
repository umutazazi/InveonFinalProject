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
  const { addToCart } = useContext(CartContext);

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
  }, [id]);

  const handlePurchase = async () => {
    if (user.user === null) {
      alertify.error("Please login to add to cart the course!");
      navigate("/login");
    } else {
      if (course) {
        addToCart(course);
        alertify.success("Course added to cart!");
      }
    }
  };

  if (!course) {
    return <Spinner />;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://www.dummyimage.co.uk/600x400/cbcbcb/959595/Dummy%20Image/40"
            }
            alt={course.title}
            className="img-fluid"
          ></img>
        </div>
        <div className="col-md-6">
          <h2>{course.name}</h2>
          <h4>Category: {course.category} </h4>
          <p>{course.description}</p>
          <h4>{course.price}₺</h4>
          <button className="btn btn-success" onClick={() => handlePurchase()}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

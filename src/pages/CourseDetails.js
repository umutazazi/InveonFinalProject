import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import alertify from "alertifyjs";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/authContext";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const user = useContext(AuthContext);

  useEffect(() => {
    axiosInstance
      .get(`/Course/${id}`)
      .then((response) => {
        setCourse(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handlePurchase = () => {
    if (user.user === false) {
      alertify.error("Please login to purchase the course!");
      navigate("/login");
    } else {
      alertify.success("Course purchased successfully!");
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
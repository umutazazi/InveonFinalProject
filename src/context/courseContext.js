import React, { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    try {
      axios.get("https://localhost:7003/api/Course/").then((response) => {
        setCourses(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <CourseContext.Provider value={{ courses }}>
      {children}
    </CourseContext.Provider>
  );
}

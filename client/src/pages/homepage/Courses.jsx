import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";

function Courses() {
  const [courses, setCourses] = useState([]);


  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <section className="popular-courses-section">
      <div className="container">
        <div className="title-section">
          <div className="left-part">
            <span>Academic Programs</span>
            <h1>Diplomas/ Courses</h1>
          </div>
          <div className="right-part">
            <a className="button-one" href="#">
              View All Courses
            </a>
          </div>
        </div>
        <div className="popular-courses-box">
          <div className="row">
            {courses.map((course) => (
              <div className="max-w-sm rounded overflow-hidden shadow-sm m-2">
                <img
                  className="w-full"
                  src={course.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {course.courseTitle}
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700 text-base ml-3">
                    Duration
                    <span className="text-green-500"> {course.duration}</span>
                  </p>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    ₹ {course.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;

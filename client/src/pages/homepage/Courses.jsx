import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const moveToCourse = (e,id) => {
    e.preventDefault()
    window.location.href = `/course-details/${id}`;
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <section className="grid bg-gray-200 lg:mx-auto w-full lg:p-[10rem] grid-cols-1 lg:grid-cols-3 gap-x-3">
      {courses.map((course, i) => (
        <div className="bg-white p-[1rem] rounded-t-[20px] rounded-b-[20px] mt-2 mb-2 lg:mb-0">
          <img
            src={"/images/dh.jpg"}
            className="rounded-t-[20px] w-full "
            alt={course.courseTitle}
          />

          <div className="mt-3">
            <h1 className="font-bold text-[14px] text-teal-700 leading-4 text-center">
              {course.courseTitle}
            </h1>
            <button
              onClick={(e) => moveToCourse(e,course._id)}
              className="w-full bg-[#22a65d] text-white font-bold uppercase py-2 rounded-[20px] hover:bg-[#0f604b] "
            >
              apply now
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Courses;

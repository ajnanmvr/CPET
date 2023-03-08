import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../Axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const moveToCourse = (e, id) => {
    e.preventDefault();
    navigate(`/course-details/${id}`);
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <section className=" w-full bg-gray-100 lg:p-[5rem]">
      <h1 className="text-3xl text-center font-bold text-green-500 pt-3 ">
        Our Courses{" "}
      </h1>

      <div className="grid lg:mx-autogrid-cols-1 lg:grid-cols-3 gap-x-3">
        {courses.slice(0, 3).map((course, i) => (
          <div className="bg-white relative p-[1rem] rounded-t-[20px] rounded-b-[20px] mt-2 mb-2 lg:mb-0">
            <img
              src={`/course/${course?.image}`}
              className="rounded-t-[20px] w-full "
              alt={course.courseTitle}
            />
            <div className="mt-3">
              <h1 className="font-bold mt-5 mb-10 uppercase text-[17px] text-teal-700 leading-4 text-center">
                {course.courseTitle}
              </h1>
              <button
                onClick={(e) => moveToCourse(e, course._id)}
                className="w-full absolute bottom-1 left-0 bg-teal-700 text-white font-bold uppercase py-3 rounded-[30px] hover:bg-[#0f604b] "
              >
                apply now
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex-1 text-center items-center" >
        <Link
          to={"/all-courses"}
          className="text-teal-500 font-semibold text-center ml-3  px-4 py-2 hover:text-white border-teal-500 border rounded-[30px] my-3  hover:bg-teal-500"
        >
          view more
        </Link>
      </div>
    </section>
  );
}

export default Courses;

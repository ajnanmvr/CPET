import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { CourseAccountContext } from "../../context/courseAccount";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { courseAccount } = useContext(CourseAccountContext);
  const navigate = useNavigate();

  const getCourseDetails = async () => {
    try {
      let { data } = await Axios.get(`/course/${id}`);
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };

  const applyCourse = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch(`/course/apply/${id}`, {
        student: courseAccount?._id,
      });

      alert("Course Application successful");
      navigate("/my-courses");
      getCourseDetails();
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
  };
  useEffect(() => {
    getCourseDetails();
  }, [id]);

  return (
    <article className="px-6 text-left max-w-3xl  py-24 mx-auto space-y-12 ">
      <img src="/images/dh.jpg" className="rounded-[20px]" alt="" />
      <div className="mx-auto space-y-4">
        <p className="text-xs font-semibold tracking-wider uppercase">
          CPET COURSES
        </p>
      </div>
      <div className="bg-gray-100 p-3 rounded-[20px]">
        <h1 className="text-xl lg:text-3xl text-[#2b6f9a] font-bold">
          {course?.courseTitle}
        </h1>
        <div className="lg:flex lg:justify-between my-4">
          <div className="mb-4">
            <div className="flex px-3 py-1 items-center rounded-[20px] bg-[#2b6f9a] ">
              <p className="lg:text-xl text-sm text-white">Duration </p>
              <p className="ml-1 lg:text-xl text-sm text-white">
                {course?.duration}
              </p>
            </div>
          </div>
          <div>
            <div className="flex px-3 py-1 items-center rounded-[20px] bg-[#2b6f9a] ">
              <p className="lg:text-xl text-sm text-white"> Course Fee (₹)</p>
              <p className="ml-1 lg:text-xl text-sm  text-white">
                {course?.amount}
              </p>
            </div>
          </div>
        </div>
        <p>
          This special diploma programme for doctors and medical students
          explains the Islamic perspective on life, illness, treatment,
          visitation, rituals during illness, death and post-death.
        </p>
      </div>
      <div className="mx-auto bg-gray-100 p-4 rounded-[20px]">
        <h4 className="text-lg font-semibold">course details</h4>
        <div
          className="dark:text-gray-400 "
          dangerouslySetInnerHTML={{ __html: course?.details }}
        ></div>
      </div>

      {!courseAccount ? (
        <a
          href="/student-login"
          className="bg-green-500  capitalize hover:bg-green-300 text-white py-3 px-6 rounded-[30px]"
        >
          login to get the course
        </a>
      ) : (
        <>
          {course?.learners.find(
            (item) => item?.student === courseAccount?._id
          ) ? (
            <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full">
              You Already Applied
            </button>
          ) : (
            <>
              <button
                onClick={(e) => applyCourse(e)}
                className="bg-[#042336] text-white font-bold py-2 px-4 rounded-full hover:bg-gray-600"
              >
                Apply Now
              </button>
            </>
          )}
        </>
      )}
    </article>
  );
}

export default CourseDetails;

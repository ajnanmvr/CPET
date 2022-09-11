import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../Axios";

const SingleCourse = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();
  const getCourse = async () => {
    let { data } = await Axios.get(`/course/${id}`);
    setCourse(data);
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  console.log(course);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 row-gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <img src={course?.image} alt="img" className="my-4" />
          <p className="mb-2 text-xs font-semibold tracking-wide text-gray-600 uppercase">
            {moment(course?.createdAt).format("MMMM Do YYYY")}
          </p>
          <div className="mb-3">
            <p className="font-sans  text-black font-bold text-2xl">
              {course?.courseTitle}
            </p>
          </div>

          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: course?.details }}
          ></div>

          <div className="mb-3">
            <p className="font-sans  text-gray-600 font-bold text-2xl">
              ₹ {course?.amount}
            </p>
          </div>
          <a
            href={course?.url}
            className="bg-green-600 hover:bg-green-400 px-3 py-3 text-white font-bold"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;

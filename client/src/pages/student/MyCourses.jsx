import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { CourseAccountContext } from "../../context/courseAccount";

function MyCourses() {
  const { courseAccount } = useContext(CourseAccountContext);
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    try {
      let { data } = await Axios.post("/course/my-courses");
      setCourses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(courses);

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <h1
              className="text-xl text-center font-bold text-teal-600"
              id="slide-over-title"
            >
              My courses
            </h1>
          </div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {courses?.map((item, index) => (
                  <li className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="lg:flex lg:justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href="#">{item.courseTitle}</a>
                          </h3>
                          <p className="lg:ml-4">Rs: {item.amount}</p>
                        </div>
                      </div>
                      <div className="lg:flex lg:flex-1 lg:items-end lg:justify-between text-sm">
                        <p className="text-gray-500"></p>
                        <div className="flex">
                          <div className="font-medium text-indigo-600 hover:text-indigo-500">
                            Duration : {item.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {/* More products... */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourses;

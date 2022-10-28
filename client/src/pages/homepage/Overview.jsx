import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Overview() {
  return (
    <div>
      <div className="flex justify-center my-[10%]">
        <div className="bg-gray-100 rounded-[20px] px-4 mx-3">
          <div className="bg-green-400  rounded-full m-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-3xl p-4 text-white"
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xl">15+</h4>
            <span className="font-semibold text-xl">courses</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[20px] px-4 mx-3">
          <div className="bg-orange-400  rounded-full m-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-3xl p-4 text-white"
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xl">15+</h4>
            <span className="font-semibold text-xl">courses</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[20px] px-4 mx-3">
          <div className="bg-blue-400  rounded-full m-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-3xl p-4 text-white"
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xl">15+</h4>
            <span className="font-semibold text-xl">courses</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[20px] px-4 mx-3">
          <div className="bg-yellow-400  rounded-full m-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-3xl p-4 text-white"
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xl">15+</h4>
            <span className="font-semibold text-xl">courses</span>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[20px] px-4 mx-3">
          <div className="bg-teal-500  rounded-full m-4">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="text-3xl p-4 text-white"
            />
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-xl">15+</h4>
            <span className="font-semibold text-xl">courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;

import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Axios from "../../Axios";
import { useEffect } from "react";

function AllClasses() {
  const { authData } = useContext(UserAuthContext);

  const [classes, setCLasses] = useState([]);
  const getAllClasses = async () => {
    try {
      let { data } = await Axios.get("/class");
      setCLasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <>
      <h1 className="text-gray-800 font-bold text-3xl mt-4 text-center">
        {authData?.branch.branchName}
      </h1>

      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-3">
        {classes.map((item, key) => (
          <Link
            to={`/all-students/${item._id}`}
            key={key}
            className="w-full p-2"
          >
            <div className=" py-4 overflow-hidden bg-gray-800 rounded-xl  duration-300 shadow-2xl group">
              <div className="flex">
                <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-2xl">
                  <FontAwesomeIcon
                    icon={faSchoolCircleCheck}
                    color="white"
                  ></FontAwesomeIcon>
                </div>
              </div>
              <h1 className="text-xl text-center font-bold text-white mt-4 group-hover:text-gray-50">
                {item.className}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default AllClasses;

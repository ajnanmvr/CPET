import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faUser,
  faDonate,
  faGraduationCap,
  faChalkboardUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserAuthContext } from "../context/user";
import Axios from "../Axios";
import { useState } from "react";
import { useEffect } from "react";

function Dashboard() {
  const { authData } = useContext(UserAuthContext);
  const [branch, setBranch] = useState({});

  const getBranch = async () => {
    try {
      let { data } = await Axios.get(
        "/branch/" + authData.adminCollegeName?._id
      );
      setBranch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SuperAdminItems = [
    {
      text: "ALL BRANCHES",
      icon: faSchool,
      link: "/all-branches",
    },
    {
      text: "ALL USERS",
      icon: faUser,
      link: "/all-users",
    },
    {
      text: "ALL TEACHERS",
      icon: faChalkboardUser,
      link: "/all-teachers",
    },
    {
      text: "ALL STUDENTS",
      icon: faGraduationCap,
      link: "/all-branch-students",
    },
    {
      text: "ALL DONATIONS",
      icon: faDonate,
      link: "/all-donations",
    },
  ];
  const AdminItems = [
    {
      text: "ALL STUDENTS",
      icon: faGraduationCap,
      link: "/all-class-students",
    },
    {
      text: "ALL TEACHERS",
      icon: faChalkboardUser,
      link: "/all-teachers",
    },

    {
      text: "ALL DONATIONS",
      icon: faDonate,
      link: "/all-donations",
    },
  ];

  useEffect(() => {
    authData?.role === "admin" && getBranch();
  }, [authData]);
  return (
    <div className="w-full">
      {authData ? (
        <>
          <h1 className="text-violet-500 text-center font-bold text-3xl my-4">
            {branch?.branchName}
          </h1>
          {authData?.role === "admin" && (
            <img
              src={branch.image}
              alt="branch image"
              className="object-cover w-full h-56"
            />
          )}

          {authData.role === "superAdmin" ? (
            <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-3">
              {SuperAdminItems.map((item, key) => (
                <Link to={item.link} key={key} className="w-full p-2">
                  <div className="flex flex-col px-6 py-10 overflow-hidden bg-gray-900 rounded-xl  duration-300 shadow-2xl group">
                    <div className="flex flex-row justify-between items-center">
                      <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-5xl">
                        <FontAwesomeIcon
                          icon={item.icon}
                          color="white"
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl xl:text-3xl text-center font-bold text-white mt-12 group-hover:text-gray-50">
                      {item.text}
                    </h1>
                    <div className="flex flex-row justify-between group-hover:text-gray-200">
                      <p>{""}</p>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-3">
              {AdminItems.map((item, key) => (
                <Link to={item.link} key={key} className="w-full p-2">
                  <div className="flex flex-col px-6 py-10 overflow-hidden bg-[#354259] rounded-xl hover:bg-blue-900   duration-300 shadow-2xl group">
                    <div className="flex flex-row justify-between items-center">
                      <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-5xl">
                        <FontAwesomeIcon
                          icon={item.icon}
                          color="white"
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl xl:text-3xl text-center font-bold text-white mt-12 group-hover:text-gray-50">
                      {item.text}
                    </h1>
                    <div className="flex flex-row justify-between group-hover:text-gray-200">
                      <p>{""}</p>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600 group-hover:text-gray-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Dashboard;

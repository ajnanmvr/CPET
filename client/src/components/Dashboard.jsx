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
      text: "ALL PAYMENTS",
      icon: faDonate,
      link: "/all-payments",
    },
  ];
  const AdminItems = [
    {
      text: "ALL STUDENTS",
      icon: faGraduationCap,
      link: "/all-classes",
    },
    {
      text: "ALL TEACHERS",
      icon: faChalkboardUser,
      link: "/all-teachers",
    },

    {
      text: "ALL PAYMENTS",
      icon: faDonate,
      link: "/all-payments",
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
            <div className="px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
              {SuperAdminItems.map((item, key) => (
                <Link to={item.link} key={key} className="w-full p-2">
                  <div className=" py-4 overflow-hidden bg-gray-800 rounded-xl  duration-300 shadow-2xl group">
                    <div className="flex">
                      <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-2xl">
                        <FontAwesomeIcon
                          icon={item.icon}
                          color="white"
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    <h1 className="text-xl text-center font-bold text-white mt-4 group-hover:text-gray-50">
                      {item.text}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full items-center px-4 py-8 mt-5 grid grid-cols-1 lg:grid-cols-3">
              {AdminItems.map((item, key) => (
                <Link to={item.link} key={key} className="w-full p-2">
                  <div className=" py-4 overflow-hidden bg-teal-800 rounded-xl  duration-300 shadow-2xl group">
                    <div className="flex">
                      <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-2xl">
                        <FontAwesomeIcon
                          icon={item.icon}
                          color="white"
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    <h1 className="text-xl text-center font-bold text-white mt-4 group-hover:text-gray-50">
                      {item.text}
                    </h1>
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

import {
  faBook,
  faBookOpenReader,
  faChalkboardUser,
  faDonate,
  faGraduationCap,
  faRightLeft,
  faSchool,
  faUser,
  faTools,
  faExchange,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { UserAuthContext } from "../context/user";
import AllBranchPie from "../pages/superAdmin/AllBranchPie";
import AllClassPie from "../pages/superAdmin/AllClassPie";

function Dashboard() {
  const { authData } = useContext(UserAuthContext);
  const [branch, setBranch] = useState({});
  const [admissionCount, setAdmissionCount] = useState([]);

  const getAdmissions = async () => {
    try {
      let { data } = await Axios.post(
        `student?branch=${authData?.branch?._id}&verified=false`
      );
      setAdmissionCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getBranch = async () => {
    try {
      let { data } = await Axios.get("/branch/" + authData.branch?._id);
      setBranch(data);
    } catch (error) {
      console.log(error);
    }
  };

  const SuperAdminItems = [
    {
      text: "BRANCHES",
      icon: faSchool,
      link: "/all-branches",
    },
    {
      text: "USERS",
      icon: faUser,
      link: "/all-users",
    },
    {
      text: "TEACHERS",
      icon: faChalkboardUser,
      link: "/all-branch-teachers",
    },
    {
      text: "STUDENTS",
      icon: faGraduationCap,
      link: "/all-branch-students",
    },
    {
      text: "SUBJECTS",
      icon: faBookOpenReader,
      link: "/all-subjects",
    },
    {
      text: "PAYMENTS",
      icon: faDonate,
      link: "/all-payments",
    },
    {
      text: "TRANSFER REQUESTS",
      icon: faRightLeft,
      link: "/transfer-request",
    },
    {
      text: "SETTINGS",
      icon: faTools,
      link: "/settings",
    },
  ];
  const AdminItems = [
    {
      text: "STUDENTS",
      icon: faGraduationCap,
      link: "/all-classes",
    },
    {
      text: "TEACHERS",
      icon: faChalkboardUser,
      link: "/all-teachers",
    },

    {
      text: "Admission Requests",
      icon: faBook,
      link: "/admissions",
    },
    {
      text: "Transfers",
      icon: faExchange,
      link: "/transfers",
    },
  ];

  useEffect(() => {
    authData?.role === "admin" && getBranch();
    authData?.role === "admin" && getAdmissions();
  }, [authData]);
  return (
    <div className="w-full">
      {authData ? (
        <>
          {authData?.role === "admin" && (
            <div className="lg:flex">
              <img
                src={branch.image}
                alt="branch image"
                className="lg:w-1/4 w-full h-56"
              />
              <div className="bg-gray-900 w-full items-center">
                <h1 className="text-white lg:my-[80px]  text-center font-bold text-3xl">
                  {branch?.branchName}
                </h1>
              </div>
            </div>
          )}

          {authData.role === "superAdmin" ? (
            <>
              <div className="px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
                {SuperAdminItems.map((item, key) => (
                  <Link to={item.link} key={key} className="w-full p-2">
                    <div className=" py-4 overflow-hidden bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
                      <div className="flex">
                        <div className="px-4 py-4 bg-gray-300 group-hover:bg-gray-900 rounded-xl bg-opacity-30 mx-auto text-2xl">
                          <FontAwesomeIcon
                            icon={item.icon}
                            color="white"
                          ></FontAwesomeIcon>
                        </div>
                      </div>
                      <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4">
                        {item.text}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
              <AllBranchPie />
              <AllClassPie />
            </>
          ) : (
            <div className="w-full items-center px-4 py-8 mt-5 grid grid-cols-1 lg:grid-cols-3">
              {AdminItems.map((item, key) => (
                <Link
                  to={item.link}
                  key={key}
                  className={`w-full p-2 ${
                    item.text === "Admission Requests" && "relative"
                  }`}
                >
                  {item.text === "Admission Requests" && (
                    <div className="absolute right-6 top-3 bg-orange-400 px-3  text-white font-bold">
                      {admissionCount}
                    </div>
                  )}
                  <div className=" py-4 overflow-hidden bg-sky-900 rounded-xl  duration-300 shadow-2xl group">
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

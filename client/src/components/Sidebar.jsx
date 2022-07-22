import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faClose,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "./../context/user";

function Sidebar() {
  const { authData, logout } = useContext(UserAuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigations = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "New Admission",
      route: "/add-student",
    },
    {
      name: "New Teacher",
      route: "/create-teacher",
    },
  ];
  const SuperAdmin = [
    {
      name: "Create Branch",
      route: "/create-branch",
    },
    {
      name: "All Branches",
      route: "/all-branches",
    },
    {
      name: "All Users",
      route: "/all-users",
    },
    {
      name: "New Admission",
      route: "/add-student",
    },
  ];
  return (
    <>
      <div onClick={() => setOpenSidebar(!openSidebar)}>
        <span className="absolute text-white text-4xl top-1 right-1 cursor-pointer">
          <button
            className="bi bi-filter-left px-2  rounded-md"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            {!openSidebar ? (
              <FontAwesomeIcon
                icon={faBars}
                color="black"
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faClose}
                color="black"
                className="bi bi-x cursor-pointer ml-28 lg:hidden"
              ></FontAwesomeIcon>
            )}
          </button>
        </span>

        <div
          className={`${
            !openSidebar && "invisible"
          } lg:visible  fixed top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-900`}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <Link
                to={"/"}
                className="font-bold text-gray-200 text-[25px] ml-3"
              >
                CPET
              </Link>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>

          {authData?.role === "admin" &&
            navigations.map((navigation, index) => (
              <NavLink
                to={navigation.route}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 bg-blue-600 cursor-pointer hover:bg-blue-600 text-white"
                    : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
              >
                <i className="bi bi-house-door-fill" />
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  {navigation.name}
                </span>
              </NavLink>
            ))}
          {authData?.role === "superAdmin" &&
            SuperAdmin.map((navigation, index) => (
              <NavLink
                to={navigation.route}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 bg-blue-600 cursor-pointer hover:bg-blue-600 text-white"
                    : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
              >
                <i className="bi bi-house-door-fill" />
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  {navigation.name}
                </span>
              </NavLink>
            ))}

          <div className="my-4 bg-gray-600 h-[1px]" />

          {authData ? (
            <div className="absolute bottom-2">
              <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white">
                <FontAwesomeIcon icon={faUser} />
                <span className="text-[15px] ml-4 text-teal-700 font-bold uppercase">
                  {authData.username}
                </span>
              </div>
              <div
                onClick={() => logout()}
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-600 text-white"
              >
                <FontAwesomeIcon icon={faPowerOff} />
                <span className="text-[15px] ml-4 text-gray-200 font-bold">
                  Logout
                </span>
              </div>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-green-600 text-white"
            >
              <i className="bi bi-box-arrow-in-right" />
              <span className="text-[15px] ml-4 text-gray-200 font-bold">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;

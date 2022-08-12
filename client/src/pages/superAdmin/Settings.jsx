import {
    faBookAtlas
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Settings() {
  const items = [
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#002B5B]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#2A0944]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#2B4865]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#607EAA]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#DF7861]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#94B49F]",
    },
    {
      text: "Class Management",
      link: "/class-management",
      icon: faBookAtlas,
      color: "bg-[#E4D192]",
    },
  ];
  return (
    <div>
      <div className="px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
        {items.map((item, key) => (
          <Link to={item.link} className="w-full p-2">
            <div
              className={`py-4 overflow-hidden ${item.color} rounded-xl group  duration-300 shadow-2xl group`}
            >
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
    </div>
  );
}

export default Settings;

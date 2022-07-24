import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Admissions() {
  const { authData } = useContext(UserAuthContext);

  const AdminItems = [
    {
      class: "Plus One",
      link: "/admissions/plus-one",
    },
    {
      class: "Plus Two",
      link: "/admissions/plus-two",
    },

    {
      class: "Mahdiyya First Year",
      link: "/admissions/mahdiyya-first-year",
    },
    {
      class: "Mahdiyya Second Year",
      link: "/admissions/mahdiyya-second-year",
    },
    {
      class: "Mahdiyya Third Year",
      link: "/admissions/mahdiyya-third-year",
    },
  ];

  return (
    <>
      <h1 className="text-gray-800 font-bold text-3xl mt-4 text-center">
        Admission Requests{" "}
      </h1>

      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-3">
        {AdminItems.map((item, key) => (
          <Link to={item.link} key={key} className="w-full p-2">
            <div className=" py-4 overflow-hidden bg-[#D61C4E] rounded-xl  duration-300 shadow-2xl group">
              <div className="flex">
                <div className="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30 mx-auto text-2xl">
                  <FontAwesomeIcon
                    icon={faSchoolCircleCheck}
                    color="white"
                  ></FontAwesomeIcon>
                </div>
              </div>
              <h1 className="text-xl text-center font-bold text-white mt-4 group-hover:text-gray-50">
                {item.class}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Admissions;

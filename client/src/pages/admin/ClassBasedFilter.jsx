import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function ClassBasedFilter() {
  const { authData } = useContext(UserAuthContext);

  const AdminItems = [
    {
      class: "Plus One",
      link: "/all-students/plus-one",
    },
    {
      class: "Plus Two",
      link: "/all-students/plus-two",
    },

    {
      class: "Mahdiyya First Year",
      link: "/all-students/mahdiyya-first-year",
    },
    {
      class: "Mahdiyya Second Year",
      link: "/all-students/mahdiyya-second-year",
    },
    {
      class: "Mahdiyya Third Year",
      link: "/all-students/mahdiyya-third-year",
    },
  ];

  return (
    <>
      <h1 className="text-gray-800 font-bold text-3xl mt-4 text-center">
        {authData?.branch.branchName}
      </h1>

      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-3">
        {AdminItems.map((item, key) => (
          <Link to={item.link} key={key} className="w-full p-2">
            <div className="flex flex-col px-6 py-10 overflow-hidden bg-[#354259] rounded-xl hover:bg-blue-900   duration-300 shadow-2xl group">
              <h1 className="text-3xl sm:text-4xl xl:text-3xl text-center font-bold text-white mt-12 group-hover:text-gray-50">
                {item.class}
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
    </>
  );
}

export default ClassBasedFilter;

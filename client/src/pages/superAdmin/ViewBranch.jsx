import { useQuery } from "@apollo/client";
import {
  faLocation,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_BRANCH } from "../../queries/branch";

function ViewBranch() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_BRANCH, {
    variables: { id },
  });

  console.log(data);
  if (error)
    return (
      <h1 className="text-red-600 font-bold text-3xl text-center">
        Something Went Wrong
      </h1>
    );
  if (loading)
    return (
      <h1 className="text-blue-600 font-bold text-3xl text-center">
        Loading ...
      </h1>
    );
  return (
    <div>
      <div
        className="mx-auto"
        style={{
          backgroundImage: data?.branch?.imageCover
            ? "url(" + data?.branch?.imageCover + ")"
            : "url(" +
              "https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg" +
              ")",
          width: "50%",
          height: "500px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <div className="-mr-2 flex items-center md:hidden"></div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                  <span className="block xl:inline">
                    {data.branch?.branchName}
                  </span>
                </h1>
                <div className="flex my-3">
                  <p className="block text-indigo-600 mr-3 xl:inline">
                    <FontAwesomeIcon icon={faLocation} /> {data.branch?.place}
                  </p>
                  <span className="block text-sky-600 xl:inline">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {data.branch?.district}
                  </span>
                </div>
                <div className="flex">
                  <p className="block text-indigo-600 mr-3 xl:inline">
                    <FontAwesomeIcon icon={faPhone} /> {data.branch?.phone1}
                  </p>
                  {data.branch?.phone2 && (
                    <span className="block text-sky-600 xl:inline">
                      <FontAwesomeIcon icon={faLocationDot} />{" "}
                      {data.branch?.phone2}
                    </span>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBranch;

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BRANCH } from "../../queries/branch";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLocation,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function ViewBranch() {
  const { authData } = useContext(UserAuthContext);
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_BRANCH, {
    variables: { id },
  });

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
      <div>
        <section className="relative h-[38vw] ">
          <div className="h-[100%] ">
            <div className="header__hero-overlay">&nbsp;</div>
            <img
              className="header__hero-img"
              src="https://my-tour-project-2021.herokuapp.com/img/tours/tour-1-1.jpg"
              alt="Tour 5"
            />
            {authData.role === "admin" && (
              <Link to={`/edit-photos`}>
                <div className="bg-green-400 px-4 py-2 absolute top-0 right-0 mx-3 my-3 rounded-full shadow-lg cursor-pointer hover:bg-green-500 transition hover:shadow-xl">
                  <span className="text-xl text-white mx-3 my-3">
                    update images
                  </span>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-xl text-white "
                  />
                </div>
              </Link>
            )}
          </div>
          <div className="absolute bottom-[12vw] left-[5%] top-[35%]">
            <h1 className="font-bold text-7xl  my-4">
              <span className="bg-gradient-to-r from-green-300 to-green-500 px-6 py-3 text-white">
                {data.branch.branchName}
              </span>
            </h1>
            <div className="flex">
              {" "}
              <h1 className="text-lg mt-8 mx-4">
                <span className="bg-gradient-to-r from-green-300 to-green-500 px-6 py-3 text-white">
                  <FontAwesomeIcon icon={faLocationDot} /> {data.branch.place}
                </span>
              </h1>{" "}
              <h1 className="text-lg mt-8 mx-4">
                <span className="bg-gradient-to-r from-green-300 to-green-500 px-6 py-3 text-white">
                  <FontAwesomeIcon icon={faLocation} /> {data.branch.district}
                </span>
              </h1>
              <h1 className="text-lg mt-8 mx-4">
                <span className="bg-gradient-to-r from-green-300 to-green-500 px-6 py-3 text-white">
                  <FontAwesomeIcon icon={faPhone} /> {data.branch.phone1}
                </span>
              </h1>
              <h1 className="text-lg mt-8 mx-4">
                {data.branch.phone2 && (
                  <span className="bg-gradient-to-r from-green-300 to-green-500 px-6 py-3 text-white">
                    <FontAwesomeIcon icon={faPhone} /> {data.branch.phone2}
                  </span>
                )}
              </h1>
            </div>
          </div>
        </section>
        <section className="section-pictures">
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--1"
              src="https://my-tour-project-2021.herokuapp.com/img/tours/tour-1-1.jpg"
              alt="The Park Camper Tour 1 "
            />
          </div>
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--2"
              src="https://my-tour-project-2021.herokuapp.com/img/tours/tour-1-1.jpg"
              alt="The Park Camper Tour 2 "
            />
          </div>
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--3"
              src="https://my-tour-project-2021.herokuapp.com/img/tours/tour-1-1.jpg"
              alt="The Park Camper Tour 3 "
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default ViewBranch;

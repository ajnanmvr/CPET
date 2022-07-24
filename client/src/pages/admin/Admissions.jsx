import { faSchoolCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import AdmissionCard from "./AdmissionCard";

function Admissions() {
  const AdminItems = [
    {
      class: "Plus One",
      link: "/admissions/plus-one",
      id: "plus-one",
    },
    {
      class: "Plus Two",
      link: "/admissions/plus-two",
      id: "plus-two",
    },

    {
      class: "Mahdiyya First Year",
      link: "/admissions/mahdiyya-first-year",
      id: "mahdiyya-first-year",
    },
    {
      class: "Mahdiyya Second Year",
      link: "/admissions/mahdiyya-second-year",
      id: "mahdiyya-second-year",
    },
    {
      class: "Mahdiyya Third Year",
      link: "/admissions/mahdiyya-third-year",
      id: "mahdiyya-third-year",
    },
  ];

  return (
    <>
      <h1 className="text-gray-800 font-bold text-3xl mt-4 text-center">
        Admission Requests{" "}
      </h1>

      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-5">
        {AdminItems.map((item, key) => (
          <AdmissionCard admClass={item.class} key={key} id={item.id} />
        ))}
      </div>
    </>
  );
}

export default Admissions;

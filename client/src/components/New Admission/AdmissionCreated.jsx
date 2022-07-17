import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AdmissionCreated() {
  return (
    <>
      <div className="text-center ">
        <h1 className="font-bold text-3xl">Your admission is in progress</h1>
        <FontAwesomeIcon icon={faCheck} className="text-9xl text-green-400 mt-8 font-bold" />
      </div>
    </>
  );
}

export default AdmissionCreated;

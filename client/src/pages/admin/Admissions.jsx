import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import AdmissionCard from "./AdmissionCard";

function Admissions() {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      let { data } = await Axios.get("/class");
      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);
  return (
    <>
      <h1 className="text-gray-800 font-bold text-3xl mt-4 text-center">
        Admission Requests
      </h1>

      <div className="w-full items-start px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-5">
        {classes.length > 0 &&
          classes.map((item, key) => (
            <AdmissionCard admClass={item.className} key={key} id={item._id} />
          ))}
      </div>
    </>
  );
}

export default Admissions;

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../Axios";

function AdmissionRequests() {
  const [admissions, setAdmissions] = useState([]);

  const getAllRequests = async () => {
    try {
      let { data } = await Axios.post(`/student/admission-requests`);
        setAdmissions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-3xl text-sky-800 my-5">
        Admission Requests
      </h1>
      {admissions.length > 0 ? (
        <div className="px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
          {admissions.map((item, key) => (
            <div key={key} className="w-full p-2">
              <div className=" py-4 overflow-hidden  bg-gray-800 rounded-xl group  duration-300 shadow-2xl group">
                <h1 className="text-xl text-center font-bold group-hover:text-gray-400 text-white mt-4 transition">
                  {item?.branch[0]?.branchName}
                </h1>
                <h2 className="text-xl bg-green-400 text-center font-bold group-hover:text-gray-400 text-white mt-4 transition">
                  {item?.numStudents}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center font-bold text-xl capitalize text-green-500 my-5">
          There is no pending requests
        </h1>
      )}
    </div>
  );
}

export default AdmissionRequests;

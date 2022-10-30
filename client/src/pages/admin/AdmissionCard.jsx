import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function AdmissionCard({ id, admClass }) {
  const [students, setStudents] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const getAllStudents = async () => {
    try {
      let { data } = await Axios.post(
        `/student?branch=${authData?.branch?._id}&class=${id}&verified=false`
      );
      setStudents(data.docs);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div>
      <div className="shadow-2xl">
        <h1 className="text-center bg-[#495C83] py-4 border-white border-r-2 overflow-hidden text-sm  text-white">
          {admClass} ({students.length})
        </h1>
        {students.map((student) => (
          <Link to={`/profile/${student._id}`} className="flex flex-col justify-center text-center mx-auto">
            <h6 className="text-center border-b-2 border-gray-400 font-bold cursor-pointer hover:text-orange-600 py-3">
              {student.studentName}
            </h6>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdmissionCard;

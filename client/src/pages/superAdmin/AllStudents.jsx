import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const { authData } = useContext(UserAuthContext);

  const { classId } = useParams();

  const getAllStudents = async () => {
    try {
      let { data } = await Axios.post(
        `/student?branch=${
          authData ? authData.branch._id : authData.branch
        }&class=${classId}`
      );
      setStudents(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <>
      <div className="flex flex-col ml-6">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          {classId} ({students.length})
        </h3>

        <div className="mx-auto ">
          <div className="flex"></div>
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {students.length > 0 && <StudentsTable />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function StudentsTable() {
    return (
      <div>
        <div className=" sm:-mx-6 lg:-mx-8 w-full">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      NAME
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      PHONE
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      VERIFY
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      EDIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.studentName}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button
                          className={`py-2 px-4 rounded-md text-white ${
                            student.verified ? "bg-green-500" : "bg-orange-600"
                          }`}
                        >
                          {student.verified ? "verified" : "not verified"}
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link to={"/profile/" + student._id}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link to={"/edit-student/" + student._id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const SuperAdminDashboard = () => {};
}
export default AllStudents;

import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const [start, setStart] = useState(0);

  const { classId } = useParams();

  const generateAdmissionNumber = async () => {
    try {
      let res = await Axios.post("/student/update-admission", {
        class: classId,
        start,
      });
      if (res.status === 200) {
        getAllStudents();
        setStart(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStudents = async () => {
    try {
      let { data } = await Axios.post(
        `/student?branch=${
          authData ? authData.branch._id : authData.branch
        }&class=${classId}&verified=true`
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
        <div className="px-4 sm:px-0 max-w-sm ml-auto mt-4 mr-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="username">
            ADMISSION NUMBER STARTING:
          </label>
          <input
            className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
            id="username"
            type="number"
            required
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          {students.length > 0 && start > 0 && (
            <button
              onClick={generateAdmissionNumber}
              className="bg-blue-800 px-4 py-3 font-bold text-white"
            >
              Generate Admission Numbers{" "}
            </button>
          )}
        </div>
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          {classId} ({students.length})
        </h3>
        <div className="mx-auto ">
          <div className="flex"></div>
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {students.length > 0 && <StudentsTable />}
              <div className="lg:col-span-1"></div>
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
                      ADM
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
                      DISTRICT
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      VIEW
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
                    <tr
                      key={index}
                      className="border-b hover:bg-blue-900 hover:cursor-pointer group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-white ">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-white ">
                        {student?.admissionNo}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        <Link to={`/profile/${student._id}`}>
                          {student.studentName}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student.district}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap group-hover:text-white  ">
                        <Link to={"/profile/" + student._id}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap group-hover:text-white  ">
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

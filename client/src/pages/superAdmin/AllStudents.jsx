import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faL } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const { classId } = useParams();

  const [searchResults, setSearchResults] = useState([]);

  const getAllStudents = async () => {
    try {
      let { data } = await Axios.post(
        `/student?branch=${authData.branch._id}&class=${classId}`
      );
      setStudents(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllStudents();
    getAllBranches();
  }, []);
  return (
    <>
      <div className="flex flex-col ml-6">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          All STUDENTS ({students.length})
        </h3>
        <span className="text-center uppercase font-bold my-2">{classId}</span>
        {authData?.role === "superAdmin" && (
          <select
            onChange={(e) => {
              setBranch(e.target.value);
            }}
            className="bg-gray-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 mx-auto my-2  p-2.5 "
          >
            <option>select branch </option>
            {branches?.map((branch, index) => (
              <>
                <option key={index} value={branch._id}>
                  {branch.branchName}
                </option>
              </>
            ))}
          </select>
        )}
        <div className="mx-auto ">
          <div className="flex"></div>
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            {/* <form className="w-full pr-8 mx-auto invisible lg:visible">
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Student Name"
                  required
                  value={wordEntered}
                  onChange={handleChange}
                />
              </div>
            </form> */}
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
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
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
                      PLACE
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      BRANCH
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      CLASS
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
                  {searchResults.length < 1 ? (
                    <>
                      {students.map((student, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.studentName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.place}
                          </td>

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.branch?.branchName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.class}
                          </td>

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.phone}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button
                              className={`py-2 px-4 rounded-md text-white ${
                                student.verified
                                  ? "bg-green-500"
                                  : "bg-orange-600"
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
                    </>
                  ) : (
                    <>
                      {searchResults.map((student, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.studentName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.place}
                          </td>
                          {authData?.role === "superAdmin" && (
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {student.branch?.branchName}
                            </td>
                          )}
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student.phone}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {student?.verified ? (
                              <button className="bg-green-500 py-2 px-4 rounded-md text-white ">
                                verified
                              </button>
                            ) : (
                              <button className="bg-orange-500 py-2 px-4 rounded-md text-white">
                                not verified
                              </button>
                            )}
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
                    </>
                  )}
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

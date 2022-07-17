import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function AllTeachers() {
  const [teachers, setTeachers] = useState([]);
  const { authData } = useContext(UserAuthContext);

  const getAllTeachers = async () => {
    try {
      let url = `${
        authData.role === "admin" ? "/teacher/my-teachers" : "/teacher"
      }`;
      let { data } = await Axios.get(url);
      setTeachers(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteTeacher = async (teacherId) => {
    try {
      if (window.confirm("Do you want to delete teacher")) {
        await Axios.delete(`/teacher/${teacherId}`);
        getAllTeachers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          All Teachers
        </h3>{" "}
        <div className="w-full mx-auto">
          {/* <div className="flex">
            <form className="w-full pr-8">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              >
                Search
              </label>
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
                  placeholder="Search Username"
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div> */}
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {teachers.length > 0 ? <TeacherTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function TeacherTable() {
    return (
      <div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                      USERNAME
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
                      EDIT
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {teacher.teacherName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {teacher.branch?.branchName}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link
                          to={"/edit-teacher/" + teacher._id}
                          className={" cursor-pointer"}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                      <td
                        onClick={() => deleteTeacher(teacher._id)}
                        className="text-sm text-red-600 font-light px-6 py-4 whitespace-nowrap "
                      >
                        <FontAwesomeIcon
                          icon={faRemove}
                          className={"cursor-pointer"}
                        />
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
}

export default AllTeachers;

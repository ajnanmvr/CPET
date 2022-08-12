import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";

function AllTeachers() {
  const [teachers, setTeachers] = useState([]);

  const getAllTeachers = async () => {
    try {
      let { data } = await Axios.get("/teacher/my-teachers");
      setTeachers(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  // const deleteTeacher = async (teacherId) => {
  //   try {
  //     if (window.confirm("Do you want to delete teacher")) {
  //       await Axios.delete(`/teacher/${teacherId}`);
  //       getAllTeachers();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      USERNAME
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      BRANCH
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      EDIT
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      VIEW
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
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link
                          to={"/teacher/" + teacher._id}
                          className={" cursor-pointer"}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>
                      {/* <td
                        onClick={() => deleteTeacher(teacher._id)}
                        className="text-sm text-red-600 font-light px-6 py-4 whitespace-nowrap "
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={"cursor-pointer"}
                        />
                      </td> */}
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

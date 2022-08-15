import { faEye, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { ScheduleContext } from "../../context/schedule";
import { UserAuthContext } from "../../context/user";

function AllStudents() {
  const [students, setStudents] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const [className, setClassName] = useState(null);

  const { classId } = useParams();

  const getClass = async () => {
    try {
      let { data } = await Axios.get(`/class/${classId}`);
      setClassName(data);
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
    getClass();
  }, [classId]);
  return (
    <>
      <div className="flex flex-col ml-6">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          {className?.className} ({students.length})
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
                          <FontAwesomeIcon icon={faUserEdit} />
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
}
export default AllStudents;

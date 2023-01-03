import { useQuery } from "@apollo/client";
import { faEye, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import { UserAuthContext } from "../../context/user";
import { MY_VERIFIED_STUDENTS } from "../../queries/student";

function AllStudents() {
  const { classId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { authData } = useContext(UserAuthContext);
  const [className, setClassName] = useState(null);
  const { data, error, loading } = useQuery(MY_VERIFIED_STUDENTS, {
    variables: { adminId: authData?.branch?._id, classId: classId },
  });

  const [file, setFile] = useState(null);

  const getClass = async () => {
    try {
      let { data } = await Axios.get(`/class/${classId}`);
      setClassName(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleExcelUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("class", classId);
    try {
      let res = await Axios.post("/student/excel",formData);
      if (res.status === 200) {
        alert("File uploaded successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getClass();
  }, [classId]);

  if (error) {
    return (
      <h1 className="text-3xl font-bold text-red-500">Something Went Wrong</h1>
    );
  }
  if (loading) {
    return <Loading />;
  }
  if (!error && !loading) {
    return (
      <>
        <div className="flex flex-col ml-6">
          <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
            {className?.className} ({data?.myVerifiedStudents?.length})
          </h3>
          <div className="mx-auto ">
            {!showModal && (
              <button
                onClick={(e) => setShowModal(true)}
                className="bg-green-500 px-3 py-2 font-bold text-white hover:bg-green-400 ml-[60%]"
              >
                Add Students
              </button>
            )}
            <div className="flex"></div>
            <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                {!showModal ? (
                  <StudentsTable />
                ) : (
                  <>
                    {" "}
                    <div className="p-6 space-y-6">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor="file_input"
                        >
                          upload excel file here..
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          id="file_input"
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button onClick={(e)=>handleExcelUpload(e)} className="bg-green-400 text-white float-right font-bold px-3 py-2 mt-3">Upload </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="lg:col-span-1"></div>
                <div className="overflow-hidden h-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                    {/* <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      EDIT
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {data?.myVerifiedStudents?.map((student, index) => (
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
                        <Link to={`/profile/${student.id}`}>
                          {student.studentName}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student.district}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap group-hover:text-white  ">
                        <Link to={"/profile/" + student.id}>
                          <FontAwesomeIcon icon={faEye} />
                        </Link>
                      </td>
                      {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap group-hover:text-white  ">
                        <Link to={"/edit-student/" + student.id}>
                          <FontAwesomeIcon icon={faUserEdit} />
                        </Link>
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
export default AllStudents;

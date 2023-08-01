import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link, useLocation, useParams } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import { UserAuthContext } from "../../context/user";
import { MY_VERIFIED_STUDENTS } from "../../queries/student";

function AllStudents() {
  const { classId } = useParams();
  const location = useLocation();
  const [students, setStudents] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const { authData } = useContext(UserAuthContext);
  const [className, setClassName] = useState(null);
  const { data, error, loading, refetch } = useQuery(MY_VERIFIED_STUDENTS, {
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
  const getStudents = async () => {
    try {
      let { data } = await Axios.post(`/student/my-students`);
      setStudents(data);
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
      let res = await Axios.post("/student/excel", formData);
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
    getStudents();
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    getClass();
  }, [classId]);

  if (students.length < 0) {
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
                  <StudentsTable className={className?.className} />
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
                        <button
                          onClick={(e) => handleExcelUpload(e)}
                          className="bg-green-400 text-white float-right font-bold px-3 py-2 mt-3"
                        >
                          Upload{" "}
                        </button>
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

  function StudentsTable({ className }) {
    return (
      <div>
        <div className=" sm:-mx-6 lg:-mx-8 w-full">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full" id="table-data">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    {/* <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      ADM
                    </th> */}
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      DOB
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      Father
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      Place
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      House Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      Post Office
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      Pin
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      State
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
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-blue-900 hover:cursor-pointer group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-white ">
                        {index + 1}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-white ">
                        {student?.admissionNo}
                      </td> */}
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        <Link
                          to={"/profile/" + student._id}
                          className="text-blue-700"
                        >
                          {student.studentName}
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student.district}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap group-hover:text-white  ">
                        {student?.verified ? (
                          <p className="text-green-500">verified</p>
                        ) : (
                          <p className="text-red-500">not verified</p>
                        )}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {/* {moment(student?.dob).format("DD-MM-YYYY")} */}
                        {student.dobDate}-{student.dobMonth}-{student.dobYear}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.fatherName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.place}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.houseName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.postOffice}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.pinCode}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap  group-hover:text-white ">
                        {student?.state}
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
              <ReactHTMLTableToExcel
                table="table-data"
                filename={className}
                sheet="sheet1"
                buttonText="Download as Excel"
                fileType="xlsx"
                className="bg-blue-500  mt-2 text-white px-3 py-2 border-blue-600 hover:bg-transparent hover:text-blue-600 hover:cursor-pointer border"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AllStudents;

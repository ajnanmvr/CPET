import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function AllBranchCard() {
  const [students, setStudents] = useState([]);
  const [branchDetails, setBranchDetails] = useState([]);
  const [start, setStart] = useState(0);

  const getAllDetails = async () => {
    try {
      let { data } = await Axios.post("/student/all-details?branch=true");
      setBranchDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllStudents = async () => {
    try {
      let { data } = await Axios.post("/student");
      console.log(data);
      setStudents(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAdmissionNumber = async () => {
    try {
      let res = await Axios.post("/student/update-admission", {
        start,
      });
      if (res.status === 200) {
        setStart(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStudents();
    getAllDetails();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-bold uppercase my-4 text-teal-500">
          All Students
        </h1>
        <ReactHTMLTableToExcel
          table="table-data"
          filename="Student Data"
          sheet="sheet1"
          buttonText="Download as Excel"
          fileType="xlsx"
          className="bg-blue-500 float-right mt-2 text-white px-3 py-2 border-blue-600 hover:bg-transparent hover:text-blue-600 hover:cursor-pointer border"
        />
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full ml-4" id="table-data">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Father
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      House
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      DOB
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Place
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Post Office
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      PIN
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Centre
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, i) => (
                    <tr className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.studentName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.fatherName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.houseName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.dobDate}-{student?.dobMonth}-
                        {student?.dobYear}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.place}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.postOffice}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.pinCode}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.district}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.state}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {student?.branch?.branchName}
                      </td>
                      <td className=" font-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                        {student?.class?.className}
                      </td>
                      {student.verified ? (
                        <td className="font-sm text-green-500 px-6 py-4 whitespace-nowrap">
                          verified
                        </td>
                      ) : (
                        <td className="font-sm text-orange-500 px-6 py-4 whitespace-nowrap">
                          not verified
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-4 gap-1">
        {branchDetails.map((branch, key) => (
          <div className="bg-gray-200 text-center uppercase">
            <h1 className="text-teal-900">{branch?.branch[0]?.branchName} </h1>
            <h4 className="text-sm">{branch?.branch[0]?.branchCode}</h4>
            <h4 className="text-sm">({branch?.numStudents}) students</h4>
          </div>
        ))}
      </div>
      {/* <div className="lg:w-1/4 ml-auto mr-4 my-4">
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
        <button
          onClick={generateAdmissionNumber}
          className="bg-blue-800 px-4 w-full py-3 font-bold text-white"
        >
          Generate Admission Numbers{" "}
        </button>
      </div> */}
    </>
  );
}

export default AllBranchCard;

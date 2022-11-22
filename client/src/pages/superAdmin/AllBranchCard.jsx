import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../Axios";

function AllBranchCard() {
  const [branches, setBranches] = useState([]);
  const [branchDetails, setBranchDetails] = useState([]);
  const [start, setStart] = useState(0);

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch?sort=branchName");
      setBranches(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDetails = async () => {
    try {
      let { data } = await Axios.post("/student/all-details?branch=true");
      console.log(data);
      setBranchDetails(data);
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
    getAllBranches();
    getAllDetails();
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-bold my-4 text-teal-500">
          Students
        </h1>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
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
                      Study Centre
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Code
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Students
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
                      District
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {branchDetails.map((details, i) => (
                    <tr className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {details?.branch[0]?.branchName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {details?.branch[0]?.branchCode}
                      </td>
                      <td className=" font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                        {details?.numStudents}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {details?.branch[0]?.place}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {details?.branch[0]?.district}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link className="px-4 py-2 bg-gray-800 text-white font-bold rounded-[20px]" to={`/all-branch-students/${details._id}`}>
                          view
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

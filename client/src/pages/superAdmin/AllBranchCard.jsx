import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import AllBranchPie from "./AllBranchPie";
import AllClassPie from "./AllClassPie";

function AllBranchCard() {
  const [branches, setBranches] = useState([]);
  const [start, setStart] = useState(0);

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
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
  }, []);
  return (
    <>
      <div className="w-full items-center px-4 py-8 m-auto mt-5 grid grid-cols-1 lg:grid-cols-4">
        {branches.length === 0 ? (
          <Loading />
        ) : (
          branches.map((branch, key) => (
            <>
              <Link to={branch._id} key={key} className="m-2 items-center">
                <div className="bg-gray-900 rounded-xl   duration-300 shadow-xl group">
                  <img
                    src={`/img/${branch._id}.jpeg`}
                    alt="image"
                    className="w-full rounded-t-xl max-h-40"
                  />

                  <h1 className="text-xl text-center font-bold text-white my-4 group-hover:text-gray-50">
                    {branch.branchName}
                  </h1>
                </div>
              </Link>
            </>
          ))
        )}
      </div>
      <AllBranchPie />
      <AllClassPie />
      <div className="w-1/4 ml-auto mr-4 my-4">
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
      </div>
    </>
  );
}

export default AllBranchCard;

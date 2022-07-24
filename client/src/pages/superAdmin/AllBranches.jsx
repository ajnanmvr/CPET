import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "../../queries/branch";

function AllBranches() {
  const [branches, setBranches] = useState([]);
  const { data, error, loading } = useQuery(GET_BRANCHES);

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteBranch = async (id) => {
    try {
      if (window.confirm("Do you want to delete this branch")) {
        await Axios.delete("/branch/" + id);
        getAllBranches();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (error)
    return (
      <h1 className="text-red-500 text-center font-bold">
        Something Went Wrong{" "}
      </h1>
    );
  if (loading)
    return <h1 className="text-blue-500 text-center font-bold">Loading ...</h1>;
  return (
    <>
      <div className="flex flex-col ">
        <h3 className="text-4xl text-center font-bold text-blue-900 uppercase my-4">
          All BRANCHES
        </h3>{" "}
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {data?.branches.length > 0 ? <BranchTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function BranchTable() {
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
                      BRANCH
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
                      VIEW
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
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.branches.map((branch, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {branch.branchName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {branch.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link to={"/branch/" + branch.id}>
                          <button className="bg-green-500 px-4 py-2 rounded-xl text-white">
                            view
                          </button>
                        </Link>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link to={"/edit-branch/" + branch.id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
                      </td>
                      <td className="text-sm text-red-900 font-light px-6 py-4 whitespace-nowrap">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => deleteBranch(branch.id)}
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

export default AllBranches;

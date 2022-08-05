import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { GET_BRANCHES } from "../../queries/branch";

function AllBranches() {
  const { data, error, loading, refetch } = useQuery(GET_BRANCHES);
  const { pathname } = useLocation();

  const deleteBranch = async (id) => {
    try {
      if (window.confirm("Do you want to delete this branch")) {
        await Axios.delete("/branch/" + id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, [pathname]);

  if (error) {
    return (
      <h1 className="text-red-500 text-center font-bold">
        Something Went Wrong{" "}
      </h1>
    );
  }
  if (loading) {
    return <h1 className="text-blue-500 text-center font-bold">Loading ...</h1>;
  }

  return (
    <>
      <div className="flex flex-col ">
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
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold capitalize leading-tight">
                All Branches
              </h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Branch Name / place
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        District
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phone / Admin
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        View
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Edit
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Delete
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                    </tr>
                  </thead>
                  <tbody>
                    {data?.branches?.length > 0 &&
                      data.branches.map((data, key) => (
                        <tr>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {key + 1}
                            </p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <div className="flex">
                              {/* <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                              alt
                            />
                          </div> */}
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {data?.branchName}
                                </p>
                                <p className="text-gray-600 whitespace-no-wrap">
                                  {data?.place}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data?.district}
                            </p>
                          </td>
                          <td className="px-5 py-5 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data?.phone}
                            </p>
                            <p className="text-gray-600 whitespace-no-wrap">
                              {data.admin?.username}
                            </p>
                          </td>

                          <td className="px-5 py-5 bg-white text-sm">
                            <Link
                              to={`/branch/${data.id}`}
                              className={`relative inline-block px-3 py-1 font-semibold text-green-800 leading-tight`}
                            >
                              <span
                                aria-hidden
                                className={`absolute inset-0 bg-green-400 opacity-50 rounded-full`}
                              />
                              <span className="relative">View</span>
                            </Link>
                          </td>

                          <td className="px-5 py-5 bg-white text-sm">
                            <span
                              className={`relative inline-block px-3 py-1 font-semibold  leading-tight`}
                            >
                              <Link to={`/edit-branch/${data.id}`}>
                                <span
                                  aria-hidden
                                  className={`absolute inset-0  opacity-50 rounded-full`}
                                />
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="text-blue-500"
                                />
                              </Link>
                            </span>
                          </td>

                          <td className="px-5 py-5 bg-white text-sm">
                            <span
                              className={`relative inline-block px-3 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden
                                className={`absolute inset-0  opacity-50 rounded-full`}
                              />
                              <span className="relative">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() => deleteBranch(data.id)}
                                  className="text-red-500 cursor-pointer"
                                />
                              </span>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AllBranches;

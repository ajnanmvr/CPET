import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { GET_BRANCHES } from "../../queries/branch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faLocationPinLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
function AllBranches() {
  const { data, error, loading, refetch } = useQuery(GET_BRANCHES);
  const { pathname } = useLocation();

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
        <div className="grid grid-cols-3">
          {data.branches.map((branch, index) => (
            <Link
              to={`/branch/${branch.id}`}
              className="rounded overflow-hidden m-3 shadow-lg group"
            >
              <img
                className="w-full"
                src={`https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg`}
                // src={`/img/${branch._id}.jpeg`}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-sky-800 text-xl mb-2 group-hover:text-blue-500">
                  {branch.branchName}
                </div>
                <p className="text-gray-700 text-base">
                  <FontAwesomeIcon icon={faLocation} /> {branch.place}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <FontAwesomeIcon icon={faLocationPinLock} /> {branch.district}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  <FontAwesomeIcon icon={faPhone} /> {branch.phone1}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default AllBranches;

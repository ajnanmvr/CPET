import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";

function AllBranches() {
  const [branches, setBranches] = useState([]);
  const { pathname } = useLocation();

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get(`/branch?sort=branchCode`);
      setBranches(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranches();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="flex flex-col h-auto">
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {branches.length > 0 ? <BranchTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function BranchTable() {
    return (
      <>
        <div className="flex flex-col">
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
                        Location
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
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((branch, i) => (
                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {i + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {branch.branchName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {branch.branchCode}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {branch.place}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {branch.district}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {branch.phone1}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AllBranches;

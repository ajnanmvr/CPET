import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import moment from "moment";
import { Link } from "react-router-dom";

function TransferRequest() {
  const [transferData, setTransferData] = useState([]);
  const getTransferData = async () => {
    try {
      let { data } = await Axios.get("/transfer");
      console.log(data);
      setTransferData(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getTransferData();
  }, []);
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold capitalize leading-tight">
              Transfer requests
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
                      Name / Adm
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date / Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      From Branch
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      To Branch
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      View
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                  </tr>
                </thead>
                <tbody>
                  {transferData.length > 0 &&
                    transferData.map((data, key) => (
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
                                {data?.studentId?.studentName}
                              </p>
                              <p className="text-gray-600 whitespace-no-wrap">
                                {data?.studentId?.admissionNo}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {moment(data.createdAt).format("dd-mm-yyyy")}
                          </p>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {moment(data.createdAt).format("hh:mm A")}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.fromBranch?.branchName}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {data.fromBranch?.place}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {data.toBranch?.branchName}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap">
                            {data.fromBranch?.place}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold ${
                              data?.accepted ? "text-white" : "text-red-900"
                            } leading-tight`}
                          >
                            <span
                              aria-hidden
                              className={`absolute inset-0 ${
                                data.accepted ? "bg-green-400" : "bg-red-400"
                              } opacity-50 rounded-full`}
                            />
                            <span className="relative">
                              {data?.accepted ? "Accepted" : "Pending"}
                            </span>
                          </span>
                        </td>
                        <td className="px-5 py-5 bg-white text-sm">
                          <span
                            className={`relative inline-block px-3 py-1 font-semibold text-green-800 leading-tight`}
                          >
                            <Link to={`/transfer-verify/${data._id}`}>
                              <span
                                aria-hidden
                                className={`absolute inset-0 bg-green-400 opacity-50 rounded-full`}
                              />
                              <span className="relative">View</span>
                            </Link>
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

export default TransferRequest;

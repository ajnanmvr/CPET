import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function BranchTranfers() {
  const [transferData, setTransferData] = useState([]);
  const { authData } = useContext(UserAuthContext);

  const getBranchTransfers = async () => {
    try {
      let { data } = await Axios.get(
        `/transfer?fromBranch=${authData?.branch?._id}`
      );
      setTransferData(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const deleteTransfer = async (id) => {
    try {
      if (window.confirm("Do you want to delete?")) {
        let data = await Axios.delete("/transfer/" + id);
        if (data.status === 200) {
          getBranchTransfers();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBranchTransfers();
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl font-bold capitalize py-6 text-teal-700">
        transferred students{" "}
      </h1>
      <div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-2">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      STUDENT NAME
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      TO BRANCH
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      VIEW
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transferData?.map((transfer, index) => (
                    <tr className="border-b">
                      <td className="px-5 py-5 bg-white text-sm">
                        {index + 1}
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        {transfer.studentId?.studentName}
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        {transfer?.toBranch?.branchName}
                      </td>

                      <td className="px-5 py-5 bg-white text-sm">
                        <Link to={"/transfer-verify/" + transfer._id}>
                          <FontAwesomeIcon
                            className="text-green-500"
                            icon={faEye}
                          />
                        </Link>
                      </td>

                      <td className="px-5 py-5 bg-white text-sm">
                        <div
                          className="cursor-pointer text-red-600"
                          onClick={() => deleteTransfer(transfer._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </div>
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

export default BranchTranfers;

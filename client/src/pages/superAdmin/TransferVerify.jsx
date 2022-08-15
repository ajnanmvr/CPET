import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function TransferVerify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transfer, setTransfer] = useState({});
  const { authData } = useContext(UserAuthContext);

  const getTranferData = async () => {
    try {
      let { data } = await Axios.get(`/transfer/${id}`);
      setTransfer(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e, accepted) => {
    e.preventDefault();
    try {
      let res = await Axios.patch(`/transfer/${id}`, { accepted });
      if (res.status === 200) {
        toast.success("tranfer successfully completed", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/transfer-request");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("error occured", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    getTranferData();
  }, [id]);
  return (
    <div>
      <h1 className="text-blue-900 text-center text-3xl font-bold py-4">
        Transfer Verification Page
      </h1>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Student Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {transfer?.studentId?.studentName}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Admission Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {transfer?.studentId?.admissionNo}
              </dd>
            </div>
     
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {transfer?.studentId?.phone}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Current Branch
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <p className="font-bold"> {transfer?.fromBranch?.branchName}</p>
                <p> {transfer?.fromBranch?.place}</p>
                <p> ({transfer?.fromBranch?.district})</p>
              </dd>
            </div>
            <h1 className="text-teal-600 text-center text-3xl font-bold py-4">
              Details
            </h1>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">To Branch</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <p className="font-bold">{transfer?.toBranch?.branchName}</p>
                <p>{transfer?.toBranch?.place}</p>
                <p>({transfer?.toBranch?.district})</p>
              </dd>
            </div>
            <div className="bg-gray-50   px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Reason To Transfer
              </dt>
              <p className="mt-1 text-sm overflow-auto  text-teal-900 sm:mt-0 sm:col-span-2">
                {transfer?.reason}
              </p>
            </div>
          </div>
        </div>
      </div>
      {authData?.role === "superAdmin" && (
        <>
          {!transfer?.accepted ? (
            <button
              onClick={(e) => handleSubmit(e, true)}
              className="px-6 py-3 bg-green-500 font-bold text-white hover:bg-white hover:text-green-500 border border-green-500 transition m-2 float-right"
            >
              Accept
            </button>
          ) : (
            <button
              onClick={(e) => handleSubmit(e, false)}
              className="px-6 py-3 bg-red-500 font-bold text-white hover:bg-white hover:text-red-500 border border-red-500 transition m-2 float-right"
            >
              Reject
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default TransferVerify;

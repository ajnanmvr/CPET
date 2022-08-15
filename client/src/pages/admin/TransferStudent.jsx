import { useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { GET_BRANCHES } from "../../queries/branch";
import { toast } from "react-toastify";

function TransferStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const { data } = useQuery(GET_BRANCHES);
  const [reason, setReason] = useState("");
  const [toBranch, setToBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const getStudent = async () => {
    try {
      let { data } = await Axios.get("/student/" + id);
      setStudent(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/transfer/" + id, {
        toBranch,
        reason,
      });
      if (res.status === 200) {
        toast.success("Student transfer request sent to Super Admin", {
          autoClose: 4000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        setReason("");
        navigate("/admin");
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 4000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    getStudent();
  }, [id]);
  return (
    <div className="mx-4">
      <h3 className="text-4xl text-center font-bold text-red-500 uppercase my-4">
        transfer page
      </h3>
      <div className="grid grid-cols-3 gap-x-4 gap-y-3">
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Student Name
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.studentName}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Admission Number
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.admissionNo}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Father's Name
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.fatherName}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Father's Name
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.fatherName}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Mother's Name
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.motherName}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              House Name
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.houseName}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Phone
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.phone}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto w-1/2">
        <h3 className="text-xl font-bold text-white capitalize px-4 py-3 my-4 bg-gray-800">
          Branch preferred by student
        </h3>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              To Branch{" "}
              <span className="text-sm font-normal text-red-600">
                (required)
              </span>{" "}
            </label>
            <select
              onChange={(e) => setToBranch(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 "
            >
              <option hidden>Select branch</option>
              {data?.branches.map((branch) => (
                <option value={branch.id} key={branch.id}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Reason{" "}
              <span className="text-sm font-normal text-red-600">
                (required) minimum 100 words
              </span>
            </label>
            <textarea
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              placeholder="Reason for transfer"
              onChange={(e) => {
                setReason(e.target.value);
                setCount(e.target.value.length);
              }}
            />
          </div>
        </div>
        <span className="text-green-500 font-bold">{count} words</span>
        <div className="lg:col-span-1 float-right mt-3">
          {count >= 100 && (
            <div className="px-4 sm:px-0">
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-green-400  capitalize px-4 py-2 font-bold hover:text-green-400 hover:bg-white border-2 border-green-400 text-white"
                >
                  submit
                </button>
              ) : (
                <button className="bg-blue-400  capitalize px-4 py-2 font-bold hover:text-green-400 hover:bg-white border-2 border-green-400 text-white">
                  Processing...
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransferStudent;

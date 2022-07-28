import { useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import { GET_BRANCHES } from "../../queries/branch";

function TransferStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const { data } = useQuery(GET_BRANCHES);

  const getStudent = async () => {
    try {
      let { data } = await Axios.get("/student/" + id);
      setStudent(data);
    } catch (error) {
      console.log(error.response);
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
              Guardian
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.guardian}
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
              Aadhar Number
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.aadhar}
            />
          </div>
        </div>{" "}
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
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Place
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.place}
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Post Office
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.postOffice}
            />
          </div>
        </div>{" "}
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Pin Code
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.pinCode}
            />
          </div>
        </div>{" "}
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              District
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.district}
            />
          </div>
        </div>{" "}
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              State
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.state}
            />
          </div>
        </div>{" "}
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              DOB
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={moment(student.dob).format("DD-MM-YYYY")}
            />
          </div>
        </div>{" "}
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Branch
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              disabled
              value={student.branch?.branchName}
            />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white capitalize px-4 py-3 my-4 bg-gray-800">
        Branch preferred by student
      </h3>
      <div className="grid grid-cols-2 gap-x-2 my-4">
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              To Branch
            </label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 ">
              <option>select branch</option>
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
              Reason
            </label>
            <input
              className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
              type="text"
              placeholder="Reason for transfer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferStudent;

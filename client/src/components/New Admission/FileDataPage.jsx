import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function FileDataPage() {
  const { aadhar } = useParams();
  const [student, setStudent] = useState({});

  const getStudent = async () => {
    try {
      let { data } = await Axios.get(`/student/student?aadhar=${aadhar}`);
      setStudent(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);
  return (
    <div className="w-full">
      <h1 className="text-gray-500 uppercase font-bold text-2xl text-center my-4">
        Upload Required Files{" "}
      </h1>
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="flex-col flex">
          <label className="text-center">Aadhar Number</label>
          <input
            type="text"
            className="border-2 border-blue-400 py-2 px-2 text-center "
            placeholder="Aadhar Number"
            value={aadhar}
          />
          <h1 className="text-gray-900  text-center mt-2">
            Name: <span className="font-bold">{student?.studentName}</span>
          </h1>
          <h1 className="text-gray-900 text-center mt-2">
            s/o: <span className="font-bold">{student?.fatherName}</span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              Upload Plus Two Certificate
            </label>
            <div className="flex items-center justify-center w-full my-4">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input type="file" className="opacity-0" />
              </label>
            </div>
          </div>
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              Upload Plus Two Certificate
            </label>
            <div className="flex items-center justify-center w-full my-4">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input type="file" className="opacity-0" />
              </label>
            </div>
          </div>
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              Upload Plus Two Certificate
            </label>
            <div className="flex items-center justify-center w-full my-4">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input type="file" className="opacity-0" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDataPage;

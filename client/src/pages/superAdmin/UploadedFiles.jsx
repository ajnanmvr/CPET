import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function UploadedFiles() {
  const { id } = useParams();
  const [uploads, setUploads] = useState([]);

  const getAllUploads = async () => {
    try {
      let { data } = await Axios.get(`/uploads/${id}`);
      setUploads(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllUploads();
  }, []);
  return (
    <div className="overflow-x-auto relative">
      <h1 className="text-center font-bold capitalize text-4xl my-12">
        uploaded files
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              Branch Name
            </th>
            <th scope="col" className="py-3 px-6">
              Branch Code
            </th>
            <th scope="col" className="py-3 px-6">
              File
            </th>
          </tr>
        </thead>
        <tbody>
          {uploads.length > 0 &&
            uploads.map((upload, key) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {upload?.referenceId?.title}
                </th>
                <td className="py-4 px-6">{upload?.uploadedBy?.branchName}</td>
                <td className="py-4 px-6">{upload?.uploadedBy?.branchCode}</td>
                <td className="py-4 px-6">
                  {" "}
                  <a
                    target={"_blank"}
                    href={`/${upload.fileName}`}
                    className="bg-[#333] px-3 py-2 font-bold text-white  hover:bg-gray-500"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadedFiles;

import {
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFileText,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import moment from 'moment'

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
      <h1 className="text-center font-bold uppercase text-4xl my-12">
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
              Download File
            </th>
            <th scope="col" className="py-3 px-6">
              File Type
            </th>
            <th scope="col" className="py-3 px-6">
             Uploaded Time
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
                  <a
                    target={"_blank"}
                    href={`/${upload.fileName}`}
                    className="bg-[#333] rounded-md px-3 py-2 font-bold text-white  hover:bg-gray-500"
                  >
                    Download
                  </a>
                </td>
                <td className="py-4 px-6">
                  <p>
                    {upload.fileName?.split(".").pop() == "pdf" ? (
                      <FontAwesomeIcon
                        className="text-3xl text-red-400"
                        icon={faFilePdf}
                      />
                    ) : (
                      ""
                    )}
                    {upload.fileName?.split(".").pop() == "xlsx" ||
                    upload.fileName?.split(".").pop() == "csv" ||
                    upload.fileName?.split(".").pop() == "xlsm" ? (
                      <FontAwesomeIcon
                        className="text-3xl text-green-400"
                        icon={faFileExcel}
                      />
                    ) : (
                      ""
                    )}
                    {upload.fileName?.split(".").pop() == "doc" ||
                    upload.fileName?.split(".").pop() == "docs" ? (
                      <FontAwesomeIcon
                        className="text-3xl text-blue-400"
                        icon={faFileWord}
                      />
                    ) : (
                      ""
                    )}
                    {upload.fileName?.split(".").pop() == "txt" ? (
                      <FontAwesomeIcon
                        className="text-3xl text-gray-400"
                        icon={faFileText}
                      />
                    ) : (
                      ""
                    )}
                    {upload.fileName?.split(".").pop() == "png" ||
                    upload.fileName?.split(".").pop() == "jpg" ||
                    upload.fileName?.split(".").pop() == "jpeg" ? (
                      <FontAwesomeIcon
                        className="text-3xl text-violet-400"
                        icon={faFileImage}
                      />
                    ) : (
                      ""
                    )}
                  </p>
                  .{upload.fileName?.split(".").pop()}
                </td>
                <td className="py-4 px-6">
                  <p className="text-green-500">{moment(upload?.createdAt).format('HH:MM A')}</p>
                  <p>{moment(upload?.createdAt).format('DD-MM-YY')}</p>
                  <p>{moment(upload?.createdAt).format('ddd')}</p>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UploadedFiles;

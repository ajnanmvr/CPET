import {
  faDownload,
  faEye,
  faFile,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function MyUploads() {
  const [downloads, setDownloads] = useState([]);
  const [uploads, setUploads] = useState([]);

  const deleteFile = async (e, id) => {
    e.preventDefault();
    if (window.confirm("do you want to delete this file")) {
      try {
        let res = await Axios.post(`/uploads/${id}`);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error.response);
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  const getDownloads = async () => {
    try {
      let { data } = await Axios.get("/downloads");
      setDownloads(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getUploads = async () => {
    try {
      let { data } = await Axios.get("/uploads");
      setUploads(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDownloads();
    getUploads();
  }, []);
  return (
    <div className="overflow-x-auto relative">
      <h1 className="text-center font-bold my-4 uppercase">Uploaded Files </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              #
            </th>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              File
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {uploads.map((upload, key) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {key + 1}
              </th>
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {upload?.referenceId?.title}
              </th>
              <td className="py-4 px-6">
                <a
                  href={`/${upload?.fileName}`}
                  target={"_blank"}
                  className="text-green-500 text-xl"
                >
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={(e) => deleteFile(e, upload._id)}
                  className="text-[#cf4949] text-xl hover:text-red-300 "
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-center font-bold my-4 uppercase text-[#333]">
        Pending Files{" "}
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              #
            </th>
            <th scope="col" className="py-3 px-6">
              Title
            </th>
            <th scope="col" className="py-3 px-6">
              File
            </th>
          </tr>
        </thead>
        <tbody>
          {downloads
            .filter(
              (item, index) => item._id !== uploads[index]?.referenceId?._id
            )
            .map((download, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {key + 1}
                </th>
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {download.title}
                </th>
                <td className="py-4 px-6">
                  <a
                    href={`/file-upload/${download._id}`}
                    className="bg-[#333] px-4 py-2 text-white"
                  >
                    Upload Now
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyUploads;

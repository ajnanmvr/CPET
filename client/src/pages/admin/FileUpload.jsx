import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const { referenceId } = useParams();

  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("referenceId", referenceId);

  const fileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post(`/uploads`, formData);
      if (res.status === 200) {
        setFile(null);
        setLoading(true);
        toast.success("file uploaded successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.href("/my-uploads");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center w-1/2 mx-auto mt-8">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <>
          {loading ? (
            <button className="ml-[45%] mt-4 bg-green-800 font-bold text-white px-4 py-2 rounded-[20px] hover:bg-green-400">
              Uploading...
            </button>
          ) : (
            <button
              onClick={(e) => fileUpload(e)}
              className="ml-[45%] mt-4 bg-green-500 font-bold text-white px-4 py-2 rounded-[20px] hover:bg-green-400"
            >
              Upload
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default FileUpload;

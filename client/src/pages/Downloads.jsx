import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { UserAuthContext } from "../context/user";

function Downloads() {
  const { authData } = useContext(UserAuthContext);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteFile = async (e, id) => {
    e.preventDefault();
    if (window.confirm("do you want to delete this file")) {
      try {
        let res = await Axios.delete(`/downloads/${id}`);
        if (res.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        console.log(error.response);
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
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  const fileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/downloads", formData);
      if (res.status === 200) {
        setFile(null);
        setLoading(true);
        toast.success("file uploaded successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error("Error occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    getDownloads();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-center">Downloads</h1>
      <div className="overflow-x-auto relative">
        <table className="w-1/2 mx-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Dowload
              </th>
              {authData?.role === "superAdmin" && (
                <th scope="col" className="py-3 px-6">
                  Delete
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {downloads.map((download, key) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {download.title}
                </th>
                <td className="py-4 px-6">
                  <a
                    target={"_blank"}
                    href={`/${download.fileName}`}
                    className="bg-[#333] px-3 py-2 font-bold text-white  hover:bg-gray-500"
                  >
                    Download
                  </a>
                </td>
                {authData?.role === "superAdmin" && (
                  <td className="py-4 px-6">
                    <button
                      onClick={(e) => deleteFile(e, download._id)}
                      className="bg-[#cf4949] px-3 py-2 font-bold text-white  hover:bg-gray-500"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {authData?.role === "superAdmin" && (
        <>
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            id="voice-search"
            class="bg-gray-50 border w-1/2 mx-auto border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title here..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {file && title && (
            <>
              {!loading ? (
                <button
                  onClick={(e) => fileUpload(e)}
                  className="bg-green-500 font-bold text-white px-4 py-2 rounded-[20px] hover:bg-green-400 mx-[45%]"
                >
                  Upload
                </button>
              ) : (
                <button className="bg-gray-500 font-bold text-white px-4 py-2 rounded-[20px] hover:bg-green-400 mx-[45%]">
                  uploading...
                </button>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default Downloads;

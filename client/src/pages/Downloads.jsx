import {
  faArrowRight,
  faFileImage,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFile,
  faFileAudio,
  faFileVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";
import { UserAuthContext } from "../context/user";

function Downloads() {
  const { authData } = useContext(UserAuthContext);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("student");
  const [fileIcon, setFileIcon] = useState(null);
  const [fileName, setFileName] = useState(null);

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
  const handleFileChange = (file) => {
    setFile(file);
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();
    const fileIcon = getFileIcon(fileExtension);
    setFileName(fileName);
    setFileIcon(fileIcon);
  };
  const getDownloads = async () => {
    try {
      let { data } = await Axios.get("/downloads?type=" + type);
      setDownloads(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("type", type);
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

  function getFileIcon(fileExtension) {
    const lowercaseExtension = fileExtension.toLowerCase();
    if (lowercaseExtension.includes("pdf")) {
      return faFilePdf;
    } else if (
      lowercaseExtension.includes("doc") ||
      lowercaseExtension.includes("docx")
    ) {
      return faFileWord;
    } else if (
      lowercaseExtension.includes("xls") ||
      lowercaseExtension.includes("xlsx")
    ) {
      return faFileExcel;
    } else if (
      lowercaseExtension.includes("ppt") ||
      lowercaseExtension.includes("pptx")
    ) {
      return faFilePowerpoint;
    } else if (
      lowercaseExtension.includes("jpg") ||
      lowercaseExtension.includes("jpeg") ||
      lowercaseExtension.includes("png") ||
      lowercaseExtension.includes("gif")
    ) {
      return faFileImage;
    } else if (
      lowercaseExtension.includes("mp3") ||
      lowercaseExtension.includes("wav")
    ) {
      return faFileAudio;
    } else if (
      lowercaseExtension.includes("mp4") ||
      lowercaseExtension.includes("avi") ||
      lowercaseExtension.includes("mov")
    ) {
      return faFileVideo;
    } else if (
      lowercaseExtension.includes("txt") ||
      lowercaseExtension.includes("csv")
    ) {
      return faFile;
    } else {
      return faFile; // Default icon for other file types
    }
  }

  useEffect(() => {
    getDownloads();
  }, [type]);
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Downloads</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              {authData?.role === "superAdmin" && (
                <th scope="col" className="py-3 px-6">
                  View Files
                </th>
              )}
              <th scope="col" className="py-3 px-6">
                Download
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
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={key}
              >
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {download.title}
                </td>
                {authData?.role === "superAdmin" && (
                  <td className="py-4 px-6">
                    <Link
                      to={`/uploaded-files/${download._id}`}
                      className="bg-blue-500 px-3 py-2 text-white font-bold hover:bg-blue-700"
                    >
                      Go to details <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </td>
                )}
                <td className="py-4 px-6">
                  <a
                    target="_blank"
                    href={`${download.fileName}`}
                    className="bg-gray-700 px-3 py-2 text-white font-bold hover:bg-gray-500"
                  >
                    Download
                  </a>
                </td>
                {authData?.role === "superAdmin" && (
                  <td className="py-4 px-6">
                    <button
                      onClick={(e) => deleteFile(e, download._id)}
                      className="bg-red-500 px-3 py-2 text-white font-bold hover:bg-red-700"
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
        <div className="mt-8">
          <label
            htmlFor="dropzone-file"
            className="flex items-center justify-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-100 dark:border-gray-500 dark:hover:border-gray-600"
          >
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              onChange={(e) => handleFileChange(e.target.files[0])}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
          <input
            type="text"
            id="voice-search"
            className="input-field w-1/2 mr-3 mt-2"
            placeholder="File Name Here..."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <select
            type="text"
            id="voice-search"
            className="input-field mt-2"
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          {file && title && (
            <>
              {!loading ? (
                <button
                  onClick={(e) => fileUpload(e)}
                  className="bg-green-500 text-white font-bold px-4 py-2 ml-3  hover:bg-green-400 mt-2"
                >
                  Upload
                </button>
              ) : (
                <button className="bg-gray-500 text-white font-bold px-4 py-2  hover:bg-green-400 mt-2">
                  Uploading...
                </button>
              )}
            </>
          )}
          <p className="mt-3 text-lg">
            {fileName}
            <FontAwesomeIcon className="text-red-400 ml-2 text-2xl" icon={fileIcon} />
          </p>
        </div>
      )}
    </div>
  );
}

export default Downloads;

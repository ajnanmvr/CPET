import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Axios from "../Axios";

function StudentDownloads() {
  const [downloads, setDownloads] = useState([]);
  const getDownloads = async () => {
    try {
      let res = await Axios.get("/downloads/student");
      setDownloads(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getDownloads();
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-2 uppercase">
        Downloads
      </h1>
      <div className="lg:flex">
        {downloads.map((download, key) => (
          <a
            key={key}
            href={download.fileName}
            className="relative lg:w-1/4   w-full group mt-2 mx-2"
            target={"_blank"}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#97d7e9] to-[#d9e3ff] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative min-h-[150px] px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
              <div className="space-y-2">
                <p className="text-slate-800 uppercase">{download.title}</p>
                <a
                  href={`/${download.fileName}`}
                  className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                  target="_blank"
                >
                  Download
                  <FontAwesomeIcon icon={faDownload} />
                </a>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default StudentDownloads;

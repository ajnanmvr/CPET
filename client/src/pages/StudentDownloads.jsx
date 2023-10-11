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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {downloads.map((download, key) => (
          <a
            key={key}
            href={download.fileName}
            className="group mt-2 mx-2 flex w-full items-center justify-center"
            target="_blank"
          >
            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <div className="px-6 py-4">
                <p className="text-slate-800 text-center font-bold uppercase">
                  {download.title}
                </p>
              </div>
              <div className="px-6 py-4 text-center">
                <a
                  href={download.fileName}
                  className="text-indigo-400 group-hover:text-slate-800 transition duration-200"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download
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

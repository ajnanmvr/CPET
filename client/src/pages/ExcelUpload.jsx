import axios from "axios";
import React from "react";
import { useState } from "react";

function ExcelUpload() {
  const [file, setFile] = useState(null);
  const formData = new FormData();
  formData.append("excelFile", file);
  const uploadFile = async (e) => {
    e.preventDefault();
    let data = await axios({
      url: `http://localhost:5000/api/student/excel`,
      method: "POST",
      data: formData,
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">
              Only excel (.xlsx,.xlsm,.xlsb,.xltx)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Upload File
                  </p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            {file && (
              <button
                onClick={(e) => uploadFile(e)}
                className="bg-green-400 px-4 py-2 text-white mt-4 w-full"
              >
                upload
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExcelUpload;

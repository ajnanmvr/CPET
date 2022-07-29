import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function FileDataPage({ setFormData, formData, setImageUploaded }) {
  const [image1, setImage1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const sendToCloudinary = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mern-chat");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
        formData
      );
      const { secure_url } = res.data;
      setLoading(false);
      return secure_url;
    } catch (error) {
      setLoading(false);
      toast.error("Image Uploading Error", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data1 = await sendToCloudinary(image1);
      let data2 = await sendToCloudinary(image2);
      let data3 = await sendToCloudinary(image3);
      if (data1 && data2 && data3) {
        setFormData({
          ...formData,
          certificateOne: data1,
          certificateTwo: data2,
          certificateThree: data3,
        });
        setImageUploaded(true);
      }
    } catch (error) {
      setImageUploaded(false);
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg shadow-xl bg-gray-50">
      <div className="m-4 ">
        <label
          htmlFor="formFile"
          className="form-label inline-block mb-2 font-bold text-gray-900 "
        >
          Default file input example
        </label>
        <input
          className="w-full focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded  py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
          type="file"
          id="formFile"
          onChange={(e) => setImage1(e.target.files[0])}
        />
      </div>
      <div className="m-4">
        <label
          htmlFor="formFile"
          className="form-label inline-block mb-2 font-bold text-gray-900 "
        >
          Default file input example
        </label>
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
          type="file"
          id="formFile"
          onChange={(e) => setImage2(e.target.files[0])}
        />
      </div>
      <div className="m-4">
        <label
          htmlFor="formFile"
          className="form-label inline-block mb-2 font-bold text-gray-900"
        >
          Default file input example
        </label>
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
          type="file"
          id="formFile"
          onChange={(e) => setImage3(e.target.files[0])}
        />
      </div>

      <div className="m-4">
        <div className="my-4">
          {loading ? (
            <button className="bg-green-800 w-full py-4 text-white font-bold">
              Processing....
            </button>
          ) : (
            <button
              onClick={(e) => handleUpload(e)}
              className="bg-green-400  py-4 text-white font-bold"
            >
              Upload Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileDataPage;

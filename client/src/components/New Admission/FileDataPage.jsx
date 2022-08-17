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
    <div className="rounded-lg bg-gray-50">
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Default file input example
          </label>{" "}
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />{" "}
        </div>{" "}
      </div>

      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Default file input example
          </label>{" "}
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />{" "}
        </div>{" "}
      </div>

      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Default file input example
          </label>{" "}
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />{" "}
        </div>{" "}
      </div>

      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Default file input example
          </label>{" "}
          <input
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default FileDataPage;

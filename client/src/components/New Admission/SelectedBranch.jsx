import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { DISTRICT } from "../../Consts";
import FileDataPage from "./FileDataPage";

function SelectedBranch({
  formData,
  nextPage,
  prevPage,
  setFormData,
  setImageUploaded,
  imageUploaded,
}) {
  const classes = [
    "plus-one",
    "plus-two",
    "mahdiyya-first-year",
    "mahdiyya-second-year",
    "mahdiyya-third-year",
  ];
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
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
        await nextPage(e);
      }
    } catch (error) {
      setImageUploaded(false);
      console.log(error);
    }
  };

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get(`/branch?district=${selectedBranch}`);
      setBranches(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, [selectedBranch]);

  return (
    <section className="bg-white p-6">
      <div className="max-w-screen-sm mx-auto">
        <h3 className="text-4xl font-bold text-blue-900 uppercase my-4">
          Admission SECTION
        </h3>

        <form className="lg:grid lg:grid-cols-1">
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Which district you prefer for your campus ?
            </label>

            <select
              name="branch"
              onChange={(e) => setSelectedBranch(e.target.value)}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option>select </option>
              {DISTRICT.map((district, index) => (
                <>
                  {" "}
                  <option key={index} value={district}>
                    {district}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Number of Branches {branches.length}{" "}
            </label>

            <div className="">
              {branches.map((branch, index) => (
                <div
                  className={`px-2  py-2 rounded-lg m-2 text-white cursor-pointer ${
                    formData.branch === branch._id
                      ? "bg-green-600"
                      : "bg-violet-800"
                  }`}
                  key={index}
                  onClick={(e) =>
                    setFormData({ ...formData, branch: branch._id })
                  }
                >
                  {branch.branchName}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Which class you prefer to enroll ?
            </label>

            <div className="grid grid-cols-1 lg:grid-cols-3">
              {classes.map((studentClass, index) => (
                <div
                  className={`px-2  py-2 rounded-lg m-2 text-white cursor-pointer ${
                    formData.class === studentClass
                      ? "bg-green-600"
                      : "bg-gray-800"
                  }`}
                  key={index}
                  onClick={(e) =>
                    setFormData({ ...formData, class: studentClass })
                  }
                >
                  {studentClass}
                </div>
              ))}
            </div>
            {formData.class === "mahdiyya-third-year" && !imageUploaded && (
              <>
                <div className="lg:col-span-1">
                  <label
                    className="block  text-sm my-4 font-bold mb-2"
                    htmlFor="username"
                  >
                    Certificate One
                  </label>

                  <div className="">
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border w-full rounded  py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="file"
                      id="formFile"
                      onChange={(e) => setImage2(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <label
                    className="block  text-sm my-4 font-bold mb-2"
                    htmlFor="username"
                  >
                    Certificate Two
                  </label>

                  <div className="">
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border w-full rounded  py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="file"
                      id="formFile"
                      onChange={(e) => setImage3(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <label
                    className="block  text-sm my-4 font-bold mb-2"
                    htmlFor="username"
                  >
                    Certificate Three
                  </label>

                  <div className="">
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border  rounded w-full  py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="file"
                      id="formFile"
                      onChange={(e) => setImage1(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="rounded-lg shadow-xl bg-gray-50">
                  <div className="m-4">
                    <div className="my-4">
                      {loading ? (
                        <button className="bg-violet-800 w-full py-4 text-white font-bold">
                          Processing....
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleUpload(e)}
                          className="bg-blue-800 w-full py-4 text-white font-bold"
                        >
                          Upload Image
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex">
            <button
              onClick={prevPage}
              className="w-1/2 mt-3 lg:mt-7 bg-gray-900 mx-2 hover:bg-gray-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
            >
              GO BACK
            </button>
            {formData.class !== "mahdiyya-third-year" && (
              <button
                onClick={nextPage}
                className="w-1/2 mt-3 lg:mt-7 bg-indigo-900 mx-2 hover:bg-indigo-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
              >
                CONTINUE
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default SelectedBranch;

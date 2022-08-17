import { faBuilding, faEdit, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function AdminProfile() {
  const [openModal, setOpenModel] = useState(false);
  const [profile, setProfile] = useState({});
  const [branch, setBranch] = useState({});
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);
  const { authData } = useContext(UserAuthContext);


  const editCoverImage=async()=>{
    try {
      let res=await Axios.post()
    } catch (error) {
      
    }
  }
  const getMyProfile = async () => {
    try {
      let { data } = await Axios.get("/auth/profile");
      setProfile(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch("/auth/password/" + profile._id, {
        password,
        currentPassword,
      });
      if (res.status === 200) {
        setPassword("");
        setCurrentPassword("");
        setDisabled(true);
        toast.success("Password edited Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(error.response.data?.message, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const getMyBranch = async () => {
    try {
      let { data } = await Axios.get("/branch/" + authData.branch._id);
      console.log(data);
      setBranch(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageCover", image);
    try {
      let res = await Axios.post("/branch/upload-cover", formData);
      if (res.status === 200) {
        toast.success("image uploaded successfully", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getMyProfile();
    getMyBranch();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* End of Navbar */}
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className="bg-white p-3 border-t-4 border-green-400 ">
              <div className="image overflow-hidden relative">
                <button onClick={() => setOpenModel(true)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="absolute right-0 top-0 mr-2 text-2xl mt-2"
                  />
                </button>
                <img
                  className="h-auto w-full mx-auto"
                  src="https://images.unsplash.com/20/cambridge.JPG?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80"
                  alt
                />
              </div>
              {openModal && (
                <EditProfile
                  setOpenModel={setOpenModel}
                  handleUpload={handleUpload}
                  setImage={setImage}
                />
              )}
              <h1 className="text-gray-900 font-bold text-xl uppercase leading-8 my-1">
                {profile.username}
              </h1>
            </div>
            {/* End of profile card */}
            <div className="my-4" />
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64 ">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-white p-3 shadow-sm rounded-sm relative">
              <Link to={`/edit-branch`}>
                {" "}
                <FontAwesomeIcon
                  icon={faEdit}
                  className="absolute right-0 top-0 mr-2 text-2xl mt-2"
                />
              </Link>
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <FontAwesomeIcon icon={faBuilding} />
                <span className="tracking-wide">Study Center Details</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Study Center Name
                    </div>
                    <div className="px-4 py-2">{branch?.branchName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Study Center Code
                    </div>
                    <div className="px-4 py-2">{branch?.branchCode}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No 1</div>
                    <div className="px-4 py-2"> {branch?.phone1}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No 2</div>
                    <div className="px-4 py-2"> {branch?.phone2}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Location</div>
                    <div className="px-4 py-2">{branch?.place}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Post Office</div>
                    <div className="px-4 py-2">{branch?.postOffice}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Pincode</div>
                    <div className="px-4 py-2">{branch?.pinCode}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">District</div>
                    <div className="px-4 py-2">{branch?.district}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">State</div>
                    <div className="px-4 py-2">{branch?.state}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="text-gray-700">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Update Password
                    <button>
                      <FontAwesomeIcon
                        className="ml-4 text-xl"
                        onClick={() => {
                          setDisabled(false);
                          setPassword("");
                        }}
                        icon={faPen}
                      />
                    </button>
                  </label>

                  {!disabled && (
                    <>
                      <label className="block  text-sm font-bold text-green-400 mb-2">
                        Current Password
                      </label>
                      <input
                        className={`focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                          disabled && "cursor-not-allowed"
                        }`}
                        type="password"
                        required
                        value={currentPassword}
                        disabled={disabled}
                        placeholder="current password"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />{" "}
                      <label className="block  text-sm font-bold text-green-400 mb-2">
                        New Password
                      </label>
                      <input
                        className={`focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline ${
                          disabled && "cursor-not-allowed"
                        }`}
                        type="password"
                        required
                        value={password}
                        disabled={disabled}
                        placeholder="new password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="text-red-500 text-sm italic mt-2">
                        Keep your password anywere securely
                      </div>
                      <button
                        onClick={() => {
                          setDisabled(true);
                          setPassword("");
                        }}
                        className="bg-orange-300 py-1 px-5  text-white mt-2 border border-orange-300 hover:bg-white hover:text-orange-300 transition font-bold mr-3"
                      >
                        cancel
                      </button>
                      <button
                        onClick={(e) => updatePassword(e)}
                        className="bg-green-500 py-1 px-5  text-white mt-2 border border-green-500 hover:bg-white hover:text-green-500 transition font-bold"
                      >
                        save
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* End of about section */}
            <div className="my-4" />

            {/* End of profile tab */}
          </div>
        </div>
      </div>
    </div>
  );
}
const EditProfile = ({ setOpenModel, handleUpload, setImage }) => {
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Select Profile Image
                    </h3>
                    <form>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Image
                        </label>
                        <input
                          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                          id="name"
                          type="file"
                          required
                          name="name"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={(e) => handleUpload(e)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModel(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

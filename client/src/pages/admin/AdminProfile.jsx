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
  const [loading, setLoading] = useState(false);

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
      setBranch(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image-cover", image);
    setLoading(true);
    try {
      let res = await Axios.post("/branch/upload-cover", formData);
      if (res.status === 200) {
        toast.success("image uploaded successfully", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
        setOpenModel(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      toast.error("image uploading failed", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    getMyProfile();
    getMyBranch();
  }, []);

  return (
    <main className="profile-page">
      <div>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
      </div>
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg")',
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          />
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x={0}
            y={0}
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words h-screen bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                  {branch?.branchName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400" />
                  {branch?.place} | {branch?.district}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-phone mr-2 text-lg text-blueGray-400" />
                  {branch?.phone}
                </div>
           
              </div>
              
            </div>
          </div>
        </div>
        
      </section>
    </main>
  );
}

export default AdminProfile;

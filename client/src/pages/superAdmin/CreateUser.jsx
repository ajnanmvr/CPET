import React from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import { DISTRICT } from "../../Consts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MultiUsers from "../../components/MultiUsers";

function CreateUser() {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    username: "",
    adminCollegeName: "",
    phone: "",
  };
  const [multiUser, setMultiUser] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);

  const getBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/auth/create-user", formData);
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        toast.success("User Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-users");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };
  useEffect(() => {
    getBranches();
  }, []);
  return (
    <>
      {/* <div className="lg:col-span-1 my-3">
        <div className="px-4 sm:px-0">
          <label className="block  text-sm font-bold mb-2" htmlFor="username">
            FORM TYPE
          </label>
          <select
            onChange={(e) => setMultiUser(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option>select </option>
            <option value="multiForm">Multi Form </option>
            <option value="singlForm">Single Form </option>
          </select>
        </div>
      </div> */}
      {multiUser === "multiForm" ? (
        <MultiUsers />
      ) : (
        <div className="w-3/4 ml-6">
          <section className="bg-white p-6">
            <div className="max-w-screen-xl mx-auto">
              <h3 className="text-4xl font-bold text-violet-600 uppercase my-4">
                Create User
              </h3>

              <form className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      USERNAME
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      id="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => onChange(e)}
                      placeholder="USERNAME"
                      name="username"
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      EMAIL
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      id="username"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => onChange(e)}
                      placeholder="EMAIL"
                      name="email"
                    />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      PASSWORD
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      id="username"
                      type="text"
                      required
                      value={formData.password}
                      onChange={(e) => onChange(e)}
                      placeholder="PASSWORD"
                      name="password"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Phone Number
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      id="username"
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => onChange(e)}
                      placeholder="Phone No:"
                      name="phone"
                    />
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      BRANCH NAME
                    </label>
                    <select
                      name="adminCollegeName"
                      onChange={(e) => onChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option>select admin college</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch._id}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
              <div className="lg:col-span-1 mt-4">
                <div className="px-4 sm:px-0">
                  {!loading ? (
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="w-full lg:w-1/2 bg-violet-500 hover:bg-violet-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                    >
                      Submit
                    </button>
                  ) : (
                    <h1 className="text-white text-center w-full lg:w-1/2 bg-violet-500 hover:bg-violet-500  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                      Processing..
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default CreateUser;

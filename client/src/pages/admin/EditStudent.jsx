import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import { DISTRICT } from "../../Consts";
import { useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const initialState = {
    studentName: "",
    fatherName: "",
    motherName: "",
    houseName: "",
    dob: "",
    place: "",
    postOffice: "",
    guardian: "",
    district: "",
    state: "",
    pinCode: "",
    aadhar: "",
    phone: "",
    branch: "",
  };
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const getStudent = async () => {
    try {
      let { data } = await Axios.get("/student/" + id);
      setFormData(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.patch("/student/" + id, formData);
      if (res.status === 200) {
        setLoading(false);
        toast.success("Student Edited Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setFormData(initialState);
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
    getStudent();
    getAllBranches();
  }, []);

  return (
    <div className="w-3/4 ml-6">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-4xl font-bold text-blue-900 uppercase my-4">
            New Admission
          </h3>

          <form className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Student Name
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  onChange={(e) => onChange(e)}
                  required
                  placeholder="Student Name"
                  name="studentName"
                  value={formData.studentName}
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  House Name
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  onChange={(e) => onChange(e)}
                  placeholder="House Name"
                  name="houseName"
                  value={formData.houseName}
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Father's Name
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  onChange={(e) => onChange(e)}
                  value={formData.fatherName}
                  placeholder="Father's Name"
                  name="fatherName"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Mother's Name
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={formData.motherName}
                  onChange={(e) => onChange(e)}
                  placeholder="Mother's Name"
                  name="motherName"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Aadhar Number
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={formData.aadhar}
                  onChange={(e) => onChange(e)}
                  placeholder="Aadhar No:"
                  name="aadhar"
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
                  Guardian
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  value={formData.guardian}
                  onChange={(e) => onChange(e)}
                  placeholder="Guardian"
                  name="guardian"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Place
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  value={formData.place}
                  onChange={(e) => onChange(e)}
                  placeholder="Place"
                  name="place"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                District
              </label>

              <select
                name="district"
                onChange={(e) => onChange(e)}
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option>SELECT YOUR DISTRICT </option>
                {DISTRICT.map((district, index) => (
                  <>
                    <option key={index} value={formData.district}>
                      {district}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Post Office
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  value={formData.postOffice}
                  onChange={(e) => onChange(e)}
                  placeholder="Post Office"
                  name="postOffice"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Pin Code
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  value={formData.pinCode}
                  required
                  onChange={(e) => onChange(e)}
                  placeholder="Pin Code"
                  name="pinCode"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  State
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  value={formData.state}
                  required
                  onChange={(e) => onChange(e)}
                  placeholder="State"
                  name="state"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  DOB
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  name="dob"
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                Branch
              </label>

              <select
                name="branch"
                onChange={(e) => onChange(e)}
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option>SELECT STUDENT'S BRANCH </option>
                {branches.map((branch, index) => (
                  <>
                    <option key={index} value={branch._id}>
                      {branch.branchName}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </form>
          <div className="lg:col-span-1 mt-4">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-full lg:w-1/2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                >
                  Submit
                </button>
              ) : (
                <h1 className="text-white text-center w-full lg:w-1/2 bg-indigo-900 hover:bg-indigo-800  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                  Processing..
                </h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditStudent;

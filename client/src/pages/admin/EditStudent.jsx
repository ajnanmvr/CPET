import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { DATES, DISTRICT, MONTHS, YEARS } from "../../Consts";

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
    phone: "",
    class: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [classes, setClasses] = useState([]);

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
  const getClasses = async () => {
    try {
      let { data } = await Axios.get("/class/");
      setClasses(data);
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
    getClasses();
  }, []);

  return (
    <div className="w-3/4 ml-6">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
         
          <form className="lg:grid  lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-span-1 ">
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
            <div className="px-4 sm:px-0">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                Date Of Birth
              </label>
              <div className="flex">
                <select
                  name="dobYear"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 py-4 "
                  id=""
                  onChange={(e) => onChange(e)}
                >
                  <option hidden>year </option>
                  {YEARS.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>
                <select
                  name="dobMonth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 py-4 "
                  id=""
                  onChange={(e) => onChange(e)}
                >
                  <option hidden>month </option>
                  {MONTHS.map((month) => (
                    <option value={month}>{month}</option>
                  ))}
                </select>
                <select
                  name="dobDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 py-4 "
                  id=""
                  onChange={(e) => onChange(e)}
                >
                  <option hidden>date </option>
                  {DATES.map((date) => (
                    <option value={date}>{date}</option>
                  ))}
                </select>
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
                <option hidden>Select YOUR DISTRICT </option>
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
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                Class
              </label>

              <select
                name="class"
                onChange={(e) => onChange(e)}
                id=""
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option hidden>Select STUDENT'S CLASS </option>
                {classes.map((classItem, index) => (
                  <>
                    <option key={index} value={classItem._id}>
                      {classItem.className}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </form>
          <div
            className="lg:col-span-1 mt-4"
          >
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

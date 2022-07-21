import React from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function CreateTeacher() {
  const navigate = useNavigate();
  const { authData } = useContext(UserAuthContext);

  const Subjects = [
    "ENGLISH",
    "MALAYALAM",
    "MATHEMATICS",
    "ARABIC",
    "SOCIOLOGY",
    "URDU",
    "POLITICS",
    "SCIENCE",
    "ECONOMICS",
  ];

  const initialState = {
    email: "",
    phone: "",
    teacherName: "",
    branch: "",
    subjects: [],
    gender: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubjects = (item) => {
    let array = formData.subjects;
    if (!formData.subjects.includes(item)) {
      array.push(item);
      setFormData({ ...formData, subjects: array });
    }
  };
  function removeSubject(value) {
    let array = formData.subjects;
    let index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      setFormData({ ...formData, subjects: array });
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormData({ ...formData, branch: authData?.branch?._id });
    try {
      let res = await Axios.post("/teacher", {
        ...formData,
        branch: authData.branch._id,
      });
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        toast.success("Teacher Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-teachers");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  return (
    <div className="w-2/4 mx-auto">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-4xl font-bold text-violet-600 uppercase my-4">
            Create Teacher
          </h3>

          <form className="lg:grid lg:grid-cols-1 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  TEACHER'S USERNAME
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => onChange(e)}
                  placeholder="USERNAME"
                  name="teacherName"
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
                  Gender
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  name="gender"
                  onChange={(e) => onChange(e)}
                  id=""
                >
                  <option>Select Gender </option>
                  <option value={"male"}>Male </option>
                  <option value={"female"}>Female </option>
                </select>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label className="block  text-sm font-bold mb-2">
                  Subjects
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={(e) => handleSubjects(e.target.value)}
                >
                  <option>select subjects </option>
                  {Subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:col-span-1 mt-4">
              <div className="px-4 sm:px-0">
                <label className="block  text-sm font-bold mb-2">
                  Selected Subjects
                </label>
                {formData.subjects.map((item, key) => (
                  <div className="inline-block mx-2 cursor-pointer bg-gray-600 px-2 my-2 rounded-xl text-white py-1">
                    <h1 onClick={() => removeSubject(item)} key={key}>
                      {item}
                    </h1>
                  </div>
                ))}
                <br />
                {formData.subjects.length > 0 && (
                  <span className="text-sm text-red-400 italic">
                    * If you want to remove a subject, click on the subject to
                    remove{" "}
                  </span>
                )}
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
  );
}

export default CreateTeacher;

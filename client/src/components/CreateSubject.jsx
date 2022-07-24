import { faAdd, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";
import ParentSubject from "./ParentSubject";

function CreateSubject({ setOpenSubject }) {
  const [openBox, setOpenBox] = useState(false);
  const [parentSubjects, setParentSubjects] = useState([]);
  const navigate = useNavigate();

  const getParents = async () => {
    try {
      let { data } = await Axios.get("/parent-subject");
      setParentSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialState = {
    subjectName: "",
    parentSubject: "",
    class: "",
    parentSubject: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  console.log(formData);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/subject", formData);
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        toast.success("Subject Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-subjects");
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
    getParents();
  }, []);
  return (
    <>
      {openBox && <ParentSubject setOpenBox={setOpenBox} />}
      {!openBox && (
        <button
          onClick={() => setOpenBox(true)}
          className="bg-green-500  rounded-full hover:bg-green-600 mt-3 text-white py-2 px-3 focus:outline-none focus:shadow-outline uppercase transition absolute right-2"
        >
          create parent
          <FontAwesomeIcon className="px-2" icon={faAdd}></FontAwesomeIcon>
        </button>
      )}
      <div className="w-2/4 mx-auto">
        <section className="bg-white p-6">
          <div className="max-w-screen-xl mx-auto">
            <h3 className="text-4xl font-bold text-violet-700 uppercase my-4">
              Create New Subject
            </h3>

            <form className="lg:grid lg:grid-cols-1 lg:gap-8">
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Subject Name
                  </label>
                  <input
                    className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    id="username"
                    type="text"
                    required
                    value={formData.subjectName}
                    onChange={(e) => onChange(e)}
                    placeholder="Subject Name"
                    name="subjectName"
                  />
                </div>
              </div>
              {/* <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Class
                  </label>
                  <select
                    className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    required
                    value={formData.type}
                    onChange={(e) => onChange(e)}
                    name="class"
                  >
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="admins">Admins</option>
                  </select>
                </div>
              </div> */}
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Parent Subject
                  </label>
                  <select
                    className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    required
                    value={formData.type}
                    onChange={(e) => onChange(e)}
                    name="parentSubject"
                  >
                    <option>Select Parent</option>
                    {parentSubjects.map((parent) => (
                      <option key={parent._id} value={parent._id}>
                        {parent.subjectName}
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
                    className="w-full lg:w-[200px] bg-violet-500 hover:bg-violet-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
                  >
                    Add Subject
                  </button>
                ) : (
                  <h1 className="text-white text-center w-full lg:w-[200px] bg-violet-500 hover:bg-violet-500  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                    Processing..
                  </h1>
                )}
                <button
                  onClick={(e) => setOpenSubject(false)}
                  className="w-full lg:w-[200px] ml-4 bg-orange-500 hover:bg-orange-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CreateSubject;

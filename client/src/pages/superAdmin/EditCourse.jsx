import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import CreateHtml from "../../components/CreateHtml";

function EditCourse() {
  const initialState = {
    courseTitle: "",
    duration: "",
    description: "",
    amount: "",
    courseFor: "",
  };
  const { id } = useParams();

  console.log(id);

  const [courses, setCourses] = useState([]);
  const [inputData, setinputData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [html, setHtml] = useState("");

  const navigate = useNavigate();

  const getCourse = async () => {
    let { data } = await Axios.get("/course/" + id);
    setinputData(data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setinputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("courseTitle", inputData.courseTitle);
    formData.append("amount", inputData.amount);
    formData.append("courseFor", inputData.courseFor);
    formData.append("duration", inputData.duration);
    formData.append("description", inputData.description);
    formData.append("image", image);
    formData.append("details", html);

    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.patch("/course/" + id, formData);
      if (res.status === 200) {
        setLoading(false);
        setinputData(initialState);
        toast.success("Course Edited Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/admin");
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
    getCourse();
  }, []);
  return (
    <>
      <div className="w-full ml-6">
        <section className="bg-white p-6">
          <div>
            <h3 className="text-4xl font-bold text-center text-violet-600 uppercase my-4">
              Edit Course Page
            </h3>

            <form className="space-y-4">
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    course title
                  </label>
                  <input
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="username"
                    type="text"
                    required
                    value={inputData.courseTitle}
                    onChange={(e) => onChange(e)}
                    placeholder="course title"
                    name="courseTitle"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    duration
                  </label>
                  <input
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="username"
                    type="text"
                    required
                    value={inputData.duration}
                    onChange={(e) => onChange(e)}
                    placeholder="duration"
                    name="duration"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    course description
                  </label>
                  <input
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="username"
                    type="text"
                    required
                    value={inputData.description}
                    onChange={(e) => onChange(e)}
                    placeholder="description"
                    name="description"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    amount
                  </label>
                  <input
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="username"
                    type="text"
                    required
                    value={inputData.amount}
                    onChange={(e) => onChange(e)}
                    placeholder="amount"
                    name="amount"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    image
                  </label>
                  <input
                    className="block p-4 pl-10 w-full text-sm  bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="username"
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="image"
                    name="image"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    type of students
                  </label>
                  <select
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="courseFor"
                    id=""
                    onChange={(e) => onChange(e)}
                  >
                    <option hidden>select </option>
                    <option value="boys">boys</option>
                    <option value="girls">girls</option>
                    <option value="both">both</option>
                  </select>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block capitalize text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Course Details
                  </label>

                  <CreateHtml html={html} setHtml={setHtml} />
                </div>
              </div>
              <div className="lg:col-span-1 mt-4">
                <div className="px-4 sm:px-0">
                  {!loading ? (
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="w-full bg-violet-500 hover:bg-violet-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                    >
                      Submit
                    </button>
                  ) : (
                    <button className="w-full bg-violet-500 hover:bg-violet-800 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                      Processing..
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default EditCourse;

import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function EditSubject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({});
  const [parents, setParents] = useState([]);

  const getParentSubjects = async () => {
    try {
      let { data } = await Axios.get("/parent-subject");
      setParents(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const getSubject = async () => {
    try {
      let { data } = await Axios.get(`/subject/${id}`);
      setFormData(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch("/subject/" + id, formData);
      if (res.status === 200) {
        setFormData({ name: "", deadline: "", type: "" });
        toast.success("schedule successfully added", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate(-1);
      }
    } catch (error) {
      console.log(error.response);
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    getParentSubjects();
    getSubject();
  }, [id]);
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon icon={faTools} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Update Subject
                    </h3>
                    <form>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                          id="name"
                          type="text"
                          required
                          value={formData?.subjectName}
                          onChange={(e) => handleChange(e)}
                          placeholder="name"
                          defaultValue={formData?.name}
                          name="subjectName"
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Parent Subject
                        </label>
                        <select
                          value={formData?.parentSubject}
                          name="parentSubject"
                          onChange={(e) => handleChange(e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 "
                        >
                          <option hidden>select </option>
                          {parents.map((parent, key) => (
                            <option value={parent._id}>
                              {parent?.subjectName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  save
                </button>
                <button
                  onClick={() => navigate("/schedule")}
                  type="button"
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
}

export default EditSubject;

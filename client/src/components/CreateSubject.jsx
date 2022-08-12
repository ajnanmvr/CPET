import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";

function CreateSubject({ setOpenSubject, getSubjects, setShowModel }) {
  const initialState = {
    subjectName: "",
    subjectCode: "",
  };
  const [formData, setFormData] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/subject", formData);
      if (res.status === 200) {
        setFormData(initialState);
        toast.success("Subject Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      getSubjects();
      setOpenSubject(false);
    } catch (error) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  return (
    <>
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
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon icon={faBook} />
                  </div>
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
                    <div className="lg:col-span-1">
                      <div className="px-4 sm:px-0">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Subject Code
                        </label>
                        <input
                          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                          id="username"
                          type="text"
                          required
                          value={formData.subjectCode}
                          onChange={(e) => onChange(e)}
                          placeholder="Subject Code"
                          name="subjectCode"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModel(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSubject;

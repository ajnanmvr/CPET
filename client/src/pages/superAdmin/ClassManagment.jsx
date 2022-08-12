import { faBook, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "../../Axios";

function ClassManagment() {
  const [classes, setClasses] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [className, setClassName] = useState("");
  const [paramsId, setParamsId] = useState(null);

  const getAllClasses = async () => {
    try {
      let { data } = await Axios.get("/class");
      setClasses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const createClass = async (e) => {
    e.preventDefault();
    try {
      let { data } = await Axios.post(
        `/${paramsId ? "/class/" + paramsId : "/class"}`,
        {
          className,
        }
      );
      setClassName("");
      setShowModel(false);
      getAllClasses();
    } catch (error) {
      console.log(error.response);
    }
  };
  const editClass = async (e) => {
    e.preventDefault();
    try {
      let { data } = await Axios.patch("/class/" + paramsId, { className });
      setClassName("");
      setShowModel(false);
      getAllClasses();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllClasses();
  }, []);
  return (
    <div>
      {!paramsId && showModel && (
        <CreateClass
          handleFunction={createClass}
          className={className}
          setClassName={setClassName}
          setShowModel={setShowModel}
        />
      )}
      {paramsId && showModel && (
        <CreateClass
          handleFunction={editClass}
          className={className}
          setClassName={setClassName}
          setShowModel={setShowModel}
        />
      )}

      <h1 className="text-center font-bold text-xl capitalize m-4">
        class management
      </h1>
      <button
        onClick={() => setShowModel(true)}
        className="bg-gray-900 px-6 py-3 mr-4 my-3 float-right text-white font-bold rounded-full"
      >
        Add New
      </button>
      <table className="w-1/2 mx-auto leading-normal">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              #
            </th>

            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Class Name
            </th>
            <th
              scope="col"
              className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              EDIT
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr className="border-b">
              <td className="px-5 py-5 bg-white text-sm">{index + 1}</td>
              <td className="px-5 py-5 bg-white text-sm">
                {classItem.className}
              </td>

              <td className="px-5 py-5 bg-white text-sm">
                <FontAwesomeIcon
                
                  onClick={() => {
                    setShowModel(true);
                    setParamsId(classItem._id);
                  }}
                  className="text-blue-500 cursor-pointer"
                  icon={faEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function CreateClass({
  handleFunction,
  className,
  setClassName,
  setShowModel,
}) {
  return (
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
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Create New Class
                  </h3>
                  <div className="mt-2">
                    <label
                      className="block  text-sm capitalize font-bold mb-2"
                      htmlFor="username"
                    >
                      class name
                    </label>
                    <input
                      type="text"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={(e) => handleFunction(e)}
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
  );
}

export default ClassManagment;

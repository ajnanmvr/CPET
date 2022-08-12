import {
  faAdd,
  faEdit,
  faTools,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function Schedule() {
  const { pathname } = useLocation();
  const [schedule, setSchedule] = useState([]);
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({
    name: "",
    deadline: "",
    type: "",
    closed: false,
  });
  const [id, setId] = useState("");

  const getAllSchedule = async () => {
    try {
      let { data } = await Axios.get("/schedule");
      setSchedule(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, item) => {
    e.preventDefault();
    if (window.confirm("Do you want to remove this item")) {
      try {
        let res = await Axios.delete("/schedule/" + item);
        if (res.status === 200) {
          setConfig({ name: "", deadline: "", type: "" });
          getAllSchedule();
          toast.success("schedule deleted added", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        toast.error("something went wrong", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const getConfig = async () => {
    try {
      let { data } = await Axios.get(`/schedule/${id}`);
      setConfig(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSchedule();
  }, [pathname]);

  useEffect(() => {
    getConfig();
  }, [id]);
  return (
    <div>
      {open && (
        <CreateSchedule
          id={id}
          setConfig={setConfig}
          setOpen={setOpen}
          config={config}
          getConfig={getConfig}
        />
      )}
      <h1 className="text-center text-3xl my-4 font-bold text-red-500 uppercase">
        schedule page
      </h1>
      <Link
        to={"/create-schedule"}
        className="bg-sky-800 ml-8  w-[140px] px-8 py-4 text-center text-white font-bold rounded-full cursor-pointer hover:bg-sky-900 transition"
      >
        <FontAwesomeIcon icon={faAdd} /> Create New
      </Link>
      <div className="container mt-5 mx-auto px-4 sm:px-8">
        <div className="py-2">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
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
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((setting, key) => (
                  <tr className="border-b" key={key}>
                    <td className="px-5 py-5 bg-white text-sm">{key + 1}</td>
                    <td className="px-5 py-5 bg-white text-sm">
                      {setting?.name}
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <p className="font-bold">
                        {moment(setting?.deadline).format("DD-MM-yyyy A")}
                      </p>
                      <p>{moment(setting?.deadline).format("hh:mm A")}</p>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <button
                        className={`py-2 px-4  font-bold cursor-not-allowed ${
                          setting?.closed ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {setting?.closed ? "closed" : "open"}
                      </button>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(true);
                          setId(setting?._id);
                        }}
                        className="bg-blue-400 py-2 px-4 text-white font-bold rounded-xl hover:bg-white hover:text-blue-400 border border-blue-400"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm">
                      <button
                        onClick={(e) => handleDelete(e, setting._id)}
                        className="bg-red-400 py-2 px-4 text-white font-bold rounded-xl hover:bg-white hover:text-red-400 border border-red-400"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
function CreateSchedule({ id, setConfig, config, setOpen, getConfig }) {
  const navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setConfig((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch("/schedule/" + id, config);
      if (res.status === 200) {
        setConfig({ name: "", deadline: "", type: "" });
        toast.success("schedule successfully added", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setOpen(false);
        getConfig();
        navigate("/schedule");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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
                      Create New Schedule
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
                          value={config.name}
                          onChange={(e) => handleChange(e)}
                          placeholder="name"
                          defaultValue={config.name}
                          name="name"
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Deadline
                        </label>
                        <input
                          value={config.deadline}
                          onChange={(e) => handleChange(e)}
                          type="date"
                          name="deadline"
                          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Status
                        </label>
                        <select
                          value={config.close}
                          name="closed"
                          onChange={(e) => handleChange(e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 "
                        >
                          <option hidden>select status </option>
                          <option value={true}>closed</option>
                          <option value={false}>open</option>
                        </select>
                      </div>
                      <div className="mt-2">
                        <label
                          className="block  text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Type
                        </label>
                        <select
                          value={config.type}
                          name="type"
                          onChange={(e) => handleChange(e)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-4 "
                        >
                          <option hidden>select type </option>
                          <option value={"exam"}>exam</option>
                          <option value={"admission"}>admission</option>
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
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
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
export default Schedule;

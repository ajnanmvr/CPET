import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function ExamTable({ data, getExams }) {
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [hallTickets, setHallTickets] = useState([]);

console.log(hallTickets);
  const deleteItem = async (itemId) => {
    try {
      if (window.confirm("do you want to delete this item")) {
        let res = await Axios.delete(`/exam/${itemId}`);
        if (res.status === 200) {
          getExams();
          setShowModal(false);
          toast.success("Deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const deleteHallTicket = async (itemId) => {
    try {
      if (window.confirm("do you want to delete this item")) {
        let res = await Axios.delete(`/hall-ticket/${itemId}`);
        if (res.status === 200) {
          getExams();
          setShowModal(false);
          toast.success("Deleted successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          window.location.reload()
        }
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const getHallTickets = async () => {
    try {
      let { data } = await Axios.get("/hall-ticket");
      setHallTickets(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHallTickets();
  }, []);
  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Exam name
            </th>

            <th scope="col" className="py-3 px-6">
              Class
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
            <th scope="col" className="py-3 px-6">
              Subjects
            </th>
          </tr>
        </thead>
        <tbody className="p-4">
          {hallTickets.map((hallTicket) => (
            <tr className="bg-white dark:bg-gray-800 border border-gray-200 my-3">
              <td
                scope="row"
                className="py-4 px-6 font-medium whitespace-nowrap dark:text-white"
              >
                {hallTicket?.exam?.examName}
              </td>
              <td className="py-4 px-6">{hallTicket?.class?.className}</td>
              <td
                className="py-4 px-6 text-red-600 cursor-pointer"
                onClick={() => deleteHallTicket(hallTicket._id)}
              >
                Delete
              </td>
              {hallTicket?.subjects.map((subject, key) => (
                <>
                  <tr className="py-4 px-6 p-4">
                    {subject?.subjectId?.subjectName}
                    {/* {moment(subject?.date).format("MMM-DD-YYYY  | hh")} */}
                  </tr>
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="font-bold mt-5 text-center text-indigo-600">
        Exam Time Tables
      </h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Exam name
            </th>

            <th scope="col" className="py-3 px-6">
              Academic Year
            </th>
            <th scope="col" className="py-3 px-6">
              Edit
            </th>
            <th scope="col" className="py-3 px-6">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.examName}
              </th>
              <td className="py-4 px-6">{item.academicYear}</td>
              <td class="py-4 px-6">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setId(item._id);
                  }}
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
              </td>
              <td class="py-4 px-6">
                <button
                  onClick={(e) => {
                    deleteItem(item._id);
                  }}
                  class="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamTable;

function EditModal({ setShowModal, id, exam, setExam, getExams }) {
  const editItem = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.patch(`/exam/${id}`, {
        academicYear: exam.academicYear,
        examName: exam.examName,
      });
      if (res.status === 200) {
        getExams();
        setShowModal(false);
        toast.success("Edited successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error Occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      console.log(error.response);
    }
  };

  const getItem = async () => {
    try {
      let { data } = await Axios.get(`/exam/${id}`);
      setExam(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getItem();
  }, [id]);
  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div className="relative p-4 w-full ml-auto max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="p-6 space-y-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={exam?.examName}
                onChange={(e) => setExam({ examName: e.target.value })}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Exam Name{" "}
              </label>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={exam?.academicYear}
                onChange={(e) => setExam({ academicYear: e.target.value })}
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Academic Year{" "}
              </label>
            </div>
          </div>
          {/* Modal footer */}
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={(e) => editItem(e)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
            <button
              onClick={() => setShowModal(false)}
              data-modal-toggle="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

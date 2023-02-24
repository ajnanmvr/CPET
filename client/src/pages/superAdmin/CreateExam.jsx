import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import ExamTable from "../../components/ExamTable";

function CreateExam() {
  const [examName, setExamName] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [inputs, setInputs] = useState([
    { subjectId: null, time: null, date: null },
  ]);

  const handleAddRow = () => {
    setInputs([...inputs, { subjectId: "", time: "", date: "" }]);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };
  const getExams = async () => {
    try {
      let { data } = await Axios.get("/exam");
      setExams(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getClasses = async () => {
    try {
      let { data } = await Axios.get("/class");
      setClasses(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSubjects = async () => {
    try {
      let { data } = await Axios.get("/subject");
      setSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/exam", { examName, academicYear });
      if (res.status === 200) {
        getExams();
        setAcademicYear("");
        setExamName("");
        toast.success("Exam Created Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  const submitHallTicket = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/hall-ticket", {
        subjects: inputs,
        exam,
        class: selectedClass,
      });
      if (res.status === 200) {
        toast.success("Hall Ticket Created Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.reload()
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  useEffect(() => {
    getExams();
    getClasses();
    getSubjects();
  }, []);
  return (
    <>
      <ExamTable getExams={getExams} data={exams} />
      <form className="mx-auto mt-4 w-1/2">
        <h1 className="text-3xl font-bold">Create Exam Time Table </h1>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Exam
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-sky-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="gender"
              id=""
              onChange={(e) => setExam(e.target.value)}
            >
              <option hidden>Select Exam </option>
              {exams.map((exam, key) => (
                <option value={exam._id}>{exam.examName} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Class
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-sky-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="class"
              id=""
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option hidden>Select Class </option>
              {classes.map((classItem, key) => (
                <option value={classItem._id}>{classItem.className} </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="px-4 sm:px-0">
            <label className="block  text-sm font-bold mb-2" htmlFor="username">
              Subjects
            </label>
            {inputs.map((inputItem, key) => (
              <div className="flex items-center">
                <select
                  className="bg-gray-50 border border-gray-300 text-sky-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  id="username"
                  type="text"
                  required
                  name="subjectId"
                  onChange={(event) => handleInputChange(key, event)}
                >
                  <option hidden>Select Subjects </option>

                  {subjects.map((subject, key) => (
                    <option key={key} value={subject._id}>
                      {subject.subjectName}
                    </option>
                  ))}
                </select>
                <input
                  className="focus:ring-indigo-500 mx-2 focus:border-indigo-500 shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="time"
                  required
                  placeholder="time"
                  name="time"
                  onChange={(event) => handleInputChange(key, event)}
                />
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="date"
                  required
                  placeholder="date"
                  name="date"
                  onChange={(event) => handleInputChange(key, event)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={(e) => handleAddRow(e)}
            className="text-white mt-3 bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            add subject
          </button>
          <button
            type="submit"
            onClick={(e) => submitHallTicket(e)}
            className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
      <form className="mx-auto my-4 w-1/2">
        <h1 className="text-3xl font-bold">Create Exam </h1>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setAcademicYear(e.target.value)}
            value={academicYear}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Academic Year{" "}
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="repeat_password"
            id="floating_repeat_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setExamName(e.target.value)}
            value={examName}
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Exam Name
          </label>
        </div>

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="text-white bg-teal-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateExam;

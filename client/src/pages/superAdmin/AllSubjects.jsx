import { faAdd, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import CreateSubject from "../../components/CreateSubject";

function AllSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [openSubject, setOpenSubject] = useState(false);

  const getSubjects = async () => {
    try {
      let { data } = await Axios.get("/subject");
      setSubjects(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);
  return (
    <>
      {openSubject && <CreateSubject setShowModel={setOpenSubject} getSubjects={getSubjects}/>}
      {!openSubject && (
        <button
          onClick={() => setOpenSubject(true)}
          className="bg-green-500  rounded-full hover:bg-green-600 mt-3 text-white py-2 px-3 focus:outline-none focus:shadow-outline uppercase transition absolute right-2"
        >
          add subject
          <FontAwesomeIcon className="px-2" icon={faAdd}></FontAwesomeIcon>
        </button>
      )}
      <div className="flex flex-col">
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {subjects.length > 0 ? <SubjectTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function SubjectTable() {
    return (
      <div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h1 className="text-3xl text-center text-teal-800 font-bold">
            All Subjects
          </h1>
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      SUBJECT NAME
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                       SUBJECT CODE
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      EDIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {subject.subjectName}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {subject?.subjectCode}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Link
                          to={"/edit-subject/" + subject._id}
                          className={" cursor-pointer"}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>
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
}

export default AllSubjects;

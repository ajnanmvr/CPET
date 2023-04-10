import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";


function BranchStudents() {
  const { branchId, classId } = useParams();
  const [students, setStudents] = useState([]);

  const getAllStudents = async (req, res) => {
    try {
      let { data } = await Axios.post(`/student/${branchId}/${classId}`);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllStudents();
  }, [branchId]);
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full" id="table-data">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Student Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Place
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Father Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Class
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 &&
                    students.map((student, index) => (
                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.studentName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {student.place}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                         {student.fatherName}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                         {student?.class?.className}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <ReactHTMLTableToExcel
                table="table-data"
                filename={`${students[0]?.branch?.branchName} | ${students[0]?.class?.className}`}
                sheet="sheet1"
                buttonText="Download as Excel"
                fileType="xlsx"
                className="bg-blue-500 float-right mt-2 text-white px-3 py-2 border-blue-600 hover:bg-transparent hover:text-blue-600 hover:cursor-pointer border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchStudents;

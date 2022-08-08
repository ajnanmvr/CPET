import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function BranchBasedTeachers() {
  const { id } = useParams();
  const [teachers, setTeachers] = useState([]);

  const getBranchTeaches = async () => {
    try {
      let { data } = await Axios.get("/teacher?branch=" + id);
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBranchTeaches();
  }, []);

  return (
    <>
      <h1 className="text-center font-bold text-teal-700 my-3 text-2xl">
        {teachers[0]?.branch?.branchName}
      </h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                    USERNAME
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    BRANCH
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                  >
                    PHONE
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {teacher.teacherName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {teacher.branch?.branchName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {teacher.branch?.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default BranchBasedTeachers;

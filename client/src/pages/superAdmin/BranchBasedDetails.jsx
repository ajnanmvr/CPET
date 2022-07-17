import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { BRANCH_STUDENTS } from "../../queries/student";
import { GET_BRANCH } from "../../queries/branch";

function BranchBasedDetails() {
  const { id } = useParams();
  const studentData = useQuery(BRANCH_STUDENTS, {
    variables: { branchId: id },
  });
  const branchData = useQuery(GET_BRANCH, {
    variables: { id: id },
  });

  if (branchData.loading || studentData.loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <h1 className="text-3xl text-center my-4 font-bold text-violet-800">
        {branchData && branchData.data.branch.branchName}
      </h1>
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-1/2 mx-auto">
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
                  STUDENT
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  CLASS
                </th>
                <th
                  scope="col"
                  className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  VERIFIED
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData &&
                studentData.data.branchStudents.map((detail, index) => (
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {detail.studentName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {detail.class}
                    </td>
                    <td>
                      <div
                        className={`${
                          detail.verified
                            ? "bg-green-500"
                            : "bg-gray-900 text-white text-center"
                        }`}
                      >
                        {detail.verified ? "verified" : "not-verified"}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BranchBasedDetails;

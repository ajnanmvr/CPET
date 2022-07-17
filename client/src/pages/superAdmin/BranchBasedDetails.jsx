import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import { GET_BRANCH } from "../../queries/branch";

function BranchBasedDetails() {
  const { id } = useParams();
  const [branchStudentData, setBranchStudentData] = useState([]);
  const getBranchDetails = async () => {
    try {
      let { data } = await Axios.get("/student/details/" + id);
      setBranchStudentData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const branchData = useQuery(GET_BRANCH, {
    variables: { id: id },
  });

  useEffect(() => {
    getBranchDetails();
  }, []);

  if (branchData.loading ) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <h1 className="text-3xl text-center my-4 font-bold text-white bg-teal-800 py-2">
        {branchData && branchData.data.branch.branchName}
      </h1>
      <div className="w-full items-center px-4 py-8 mt-5 grid grid-cols-1 lg:grid-cols-3">
        {branchStudentData.map((item, key) => (
          <div key={key} className="w-full p-2 cursor-pointer">
            <div className="flex flex-col px-6 py-10 overflow-hidden bg-teal-600 rounded-xl  duration-300 shadow-2xl group">
              <h1 className="text-2xl text-center font-bold text-white mb-6 group-hover:text-gray-50 uppercase">
                {item._id}
              </h1>
              <div className="flex justify-between">
                <p className="text-gray-200 font-bold text-sm">
                  verified: {item.verified}
                </p>
                <p className="text-gray-200 font-bold text-sm">
                  students: {item.numStudents}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BranchBasedDetails;

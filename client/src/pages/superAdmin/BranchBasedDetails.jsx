import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../../Axios";
import { GET_BRANCH } from "../../queries/branch";
import "./BranchBasedDetails.css";

function BranchBasedDetails() {
  const { id } = useParams();
  const [branchStudentData, setBranchStudentData] = useState([]);

  const [classes, setClasses] = useState([]);

  const getBranchDetails = async () => {
    try {
      let { data } = await Axios.get("/student/details/" + id);
      setBranchStudentData(data);
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

  const branchData = useQuery(GET_BRANCH, {
    variables: { id: id },
  });

  useEffect(() => {
    getClasses();
    getBranchDetails();
  }, []);

  if (branchData.loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <h1 className="text-3xl text-center my-4 font-bold text-white bg-sky-900 py-2">
        {branchData && branchData.data.branch.branchName}
      </h1>

      <div className="ml-2 items-center px-4 py-8 mt-5 grid grid-cols-1 gap-2 lg:grid-cols-3">
        {branchStudentData.map((item, key) => (
          <Link
            to={"/all-students/" + id + `/${item._id}`}
            key={key}
            className="bg-gray-900 w-full mx-5 py-4 px-4"
          >
            <>
              {classes
                .filter((classItem) => classItem._id === item._id)
                .map((item) => (
                  <h1 className="font-2xl font-bold text-blue-300">
                    {item.className}
                  </h1>
                ))}
              <h1 className="font-2xl font-bold text-white">
                {item.numStudents} Students{" "}
              </h1>
            </>
          </Link>
        ))}
      </div>
    </>
  );
}

export default BranchBasedDetails;

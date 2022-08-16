import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

function AllBranchCard() {
  const [branches, setBranches] = useState([]);
  const [start, setStart] = useState(0);
  const { pathname } = useLocation();
  const [postsPerPage, setPostsPerPage] = useState(9);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBranches = branches.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get("/branch?sort=branchName");
      setBranches(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  const generateAdmissionNumber = async () => {
    try {
      let res = await Axios.post("/student/update-admission", {
        start,
      });
      if (res.status === 200) {
        setStart(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBranches();
  }, [pathname]);
  return (
    <>
      <Pagination
        paginate={paginate}
        postsPerPage={postsPerPage}
        totalPosts={branches.length}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <div className="grid lg:grid-cols-3 gap-2 grid-cols-1">
        {branches.length === 0 ? (
          <Loading />
        ) : (
          currentBranches.map((branch, key) => (
            <>
              <Link to={branch._id} key={key} className="m-2 items-center">
                <div className="bg-gray-900 rounded-xl pb-4  duration-300 shadow-xl group">
                  <img
                    // src={`/img/${branch._id}.jpeg`}
                    alt="image"
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg"
                    className="w-full rounded-t-xl max-h-40"
                  />

                  <h1 className="text-xl text-center font-bold text-white my-4 group-hover:text-gray-50">
                    {branch.branchName}
                  </h1>
                </div>
              </Link>
            </>
          ))
        )}
      </div>

      <div className="lg:w-1/4 ml-auto mr-4 my-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="username">
          ADMISSION NUMBER STARTING:
        </label>
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
          id="username"
          type="number"
          required
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <button
          onClick={generateAdmissionNumber}
          className="bg-blue-800 px-4 w-full py-3 font-bold text-white"
        >
          Generate Admission Numbers{" "}
        </button>
      </div>
    </>
  );
}

export default AllBranchCard;

import {
  faLocation,
  faLocationPinLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "../../Axios";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";

function AllBranches() {
  const [branches, setBranches] = useState([]);
  const { pathname } = useLocation();
  const postsPerPage = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = branches.slice(indexOfFirstPost, indexOfLastPost);

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
      let { data } = await Axios.get(`/branch?sort=branchName`);
      setBranches(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranches();
    window.scrollTo(0, 0);
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
      <div className="flex flex-col h-auto">
        <div className="w-full mx-auto">
          <div className="overflow-x-auto sm:-mx-6 lg:mx-auto">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {branches.length > 0 ? <BranchTable /> : <Loading />}
              <div className="overflow-hidden h-screen"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function BranchTable() {
    return (
      <>
        <div>
          <div className="grid lg:grid-cols-3 gap-2 grid-cols-1">
            {currentPosts.map((branch, index) => (
              <div className="relative" key={index}>
                <Link
                  to={`/branch/${branch._id}`}
                  className="rounded overflow-hidden m-3 shadow-lg group"
                >
                  <div
                    className="w-full "
                    style={{
                      backgroundImage: branch?.imageCover
                        ? "url(" + branch?.imageCover + ")"
                        : "url(" +
                          "https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg" +
                          ")",
                      width: "350px",
                      height: "150px",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />

                  <div className="px-6 py-4">
                    <div className="font-bold text-sky-800  mb-2 group-hover:text-blue-500">
                      {branch.branchName}
                    </div>
                    <div className="flex">
                      {" "}
                      <p className="text-gray-700 text-base mr-3">
                        <FontAwesomeIcon icon={faLocation} /> {branch.place}
                      </p>
                      <p className="text-gray-700 text-base">
                        <FontAwesomeIcon icon={faLocation} />{" "}
                        {branch.branchCode}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <FontAwesomeIcon icon={faLocationPinLock} />{" "}
                      {branch.district}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      <FontAwesomeIcon icon={faPhone} /> {branch.phone1}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default AllBranches;

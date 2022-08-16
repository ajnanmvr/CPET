import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Pagination({
  totalPosts,
  postsPerPage,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) {
  const pageNumbers = [];
  for (
    let index = 1;
    index < Math.ceil(totalPosts / postsPerPage) + 1;
    index++
  ) {
    pageNumbers.push(index);
  }

  return (
    <div>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {currentPage > 1 && (
                <div
                  onClick={() => prevPage()}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="cursor-pointer"
                  />
                </div>
              )}

              {pageNumbers.map((page, key) => (
                <button
                  onClick={() => paginate(page)}
                  key={key}
                  className={`z-10 ${
                    page === currentPage
                      ? "bg-blue-900 text-white font-bold"
                      : "bg-indigo-50 border-indigo-500 text-indigo-600"
                  } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {page}
                </button>
              ))}

              {pageNumbers.length > currentPage && (
                <div
                  onClick={() => nextPage()}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faArrowRight}
                  />
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

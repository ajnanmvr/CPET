import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AllPayments() {
  return (
    <>
      <div className="py-10 h-screen px-2">
        <h1 className="text-3xl font-bold text-[#0284c7] my-3 text-center">
          All Payments{" "}
        </h1>
        <div className="bg-[#0284c7] ml-auto w-[140px] px-4 py-2 text-center text-white font-bold rounded-lg cursor-pointer hover:bg-sky-900 transition">
          <FontAwesomeIcon icon={faAdd}/> Create New
        </div>
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
          <div className="md:flex">
            <div className="w-full p-4">
              <ul>
                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                  <div className="flex ml-2">
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">
                        Jessica Koel
                      </span>{" "}
                      <span className="text-sm text-gray-400 truncate w-32">
                        Hey, Joel, I here to help you out please tell me
                      </span>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300">11:26</span>{" "}
                    <i className="fa fa-star text-green-400" />{" "}
                  </div>
                </li>
                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                  <div className="flex ml-2">
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">
                        Jessica Koel
                      </span>{" "}
                      <span className="text-sm text-gray-400 truncate w-32">
                        Hey, Joel, I here to help you out please tell me
                      </span>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300">11:26</span>{" "}
                    <i className="fa fa-star text-green-400" />{" "}
                  </div>
                </li>
                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                  <div className="flex ml-2">
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">
                        Jessica Koel
                      </span>{" "}
                      <span className="text-sm text-gray-400 truncate w-32">
                        Hey, Joel, I here to help you out please tell me
                      </span>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    {" "}
                    <span className="text-gray-300">11:26</span>{" "}
                    <i className="fa fa-star text-green-400" />{" "}
                  </div>
                </li>
                <li className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                  <div className="flex ml-2">
                    <div className="flex flex-col ml-2">
                      <span className="font-medium text-black">
                        Jessica Koel
                      </span>{" "}
                      <span className="text-sm text-gray-400 truncate w-32">
                        Hey, Joel, I here to help you out please tell me
                      </span>{" "}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-300">11:26</span>{" "}
                    <i className="fa fa-star text-green-400" />{" "}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllPayments;

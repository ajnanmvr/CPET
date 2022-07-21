import { faAdd, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";

function AllPayments() {
  const [payments, setPayments] = useState([]);
  const getAllPayments = async () => {
    try {
      let { data } = await Axios.get("/payment");
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPayments();
  }, []);
  return (
    <>
      <div className="py-10 h-screen px-2">
        <h1 className="text-3xl font-bold text-[#0284c7] my-3 text-center">
          All Payments{" "}
        </h1>
        <Link
          to={"/create-payment"}
          className="bg-[#0284c7] ml-auto w-[140px] px-4 py-2 text-center text-white font-bold rounded-lg cursor-pointer hover:bg-sky-900 transition"
        >
          <FontAwesomeIcon icon={faAdd} /> Create New
        </Link>
        <div className="px-4 py-8 m-auto mt-5  grid grid-cols-1 lg:grid-cols-4">
          {payments.length > 0 ? (
            <>
              {payments.map((payment, key) => (
                <div
                  key={key}
                  className="py-4 h-[200px] m-4  overflow-hidden bg-teal-500 relative rounded-xl  duration-300 shadow-2xl group"
                >
                  <Link to={`/edit-payment/${payment._id}`}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="absolute right-2 text-2xl"
                      color="white"
                    ></FontAwesomeIcon>
                  </Link>
                  <h1 className="text-xl text-center font-bold mb-16 text-white mt-4 group-hover:text-gray-50 uppercase">
                    {payment.paymentName}
                  </h1>
                  <Link to={"/"}>
                    <span className="bg-white px-8 py-2 ml-12  rounded-3xl uppercase font-bold text-gray-500">
                      View Details
                    </span>
                  </Link>
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default AllPayments;

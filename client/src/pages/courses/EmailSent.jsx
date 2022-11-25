import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function EmailSent() {
  const { email } = useParams();
  const [loading, setLoading] = useState(false);
  const resendMessage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await Axios.post("/course/resent-registerNo", {
        email,
      });
      alert("Please check your Gmail inbox");
      setLoading(false);
    } catch (error) {
      alert("something went wrong");
      setLoading(false);
      console.log(error.response);
    }
  };
  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 items-center">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Check your email </span>{" "}
          <span className="block text-indigo-600 xl:inline">
            to verify your account
          </span>
        </h1>

        <p className="mt-3 text-gray-500 text-center sm:mt-5 sm:text-left sm:max-w-xl sm:mx-auto md:mt-5 md:text-left md:max-w-2xl md:mx-0">
          We sent an email to <span className="font-bold">{email}</span>
          <br />
          Please click the link in the email to verify your account.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
          <p className="text-center mr-3">Didn't receive the email?</p>
          {loading ? (
            <button
              className="text-indigo-500  hover:text-indigo-700 focus:outline-none focus:underline"
            >
              processing....
            </button>
          ) : (
            <button
              onClick={(e) => resendMessage(e)}
              className="text-indigo-500  hover:text-indigo-700 focus:outline-none focus:underline"
            >
              Resend
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default EmailSent;

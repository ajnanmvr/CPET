import React from "react";
import { useParams } from "react-router-dom";

function EmailSent() {
  const { email } = useParams();

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 items-center">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Check your email </span>{" "}
          <span className="block text-indigo-600 xl:inline">
            to verify your account
          </span>
        </h1>
      </div>
      <p className="mt-3 text-gray-500 text-center sm:mt-5 sm:text-left sm:max-w-xl sm:mx-auto md:mt-5 md:text-left md:max-w-2xl md:mx-0">
        We sent an email to <span className="font-bold">{email}</span>
        <br />
        Please click the link in the email to verify your account.
      </p>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <p className="text-center sm:text-left">
          Didn't receive the email?
          <br />
          <button className="text-indigo-500 hover:text-indigo-700 focus:outline-none focus:underline">
            Resend
          </button>
        </p>
      </div>
    </main>
  );
}

export default EmailSent;

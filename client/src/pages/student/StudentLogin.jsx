import React from "react";
import { useState } from "react";
import Axios from "../../Axios";

function StudentLogin() {
  const [registrationId, setRegistrationId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/course/login", {
        registrationId,
        password,
      });
      if (res.status === 200) {
        setLoading(false);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false)
      setError(error.response?.data?.message);
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col lg:items-center lg:justify-center lg:px-6 lg:py-8 lg:mx-auto h-screen lg:h-screen mt-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 lg:space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <p className="text-red-500 text-center">{error}</p>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Register Number
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setRegistrationId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Register number here"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <span className="flex justify-between lg:text-md text-sm items-center mt-3">
                  Don't have an account?
                  <a
                    href="/signup"
                    className="lg:ml-2 text-[#1d3e5b] font-semibold"
                  >
                    create an account
                  </a>
                </span>
                {loading ? (
                  <button
                    type="submit"
                    className="w-full text-white font-bold hover:bg-blue-400 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                  processing...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white font-bold hover:bg-green-400 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={(e) => login(e)}
                  >
                    Sign in
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentLogin;

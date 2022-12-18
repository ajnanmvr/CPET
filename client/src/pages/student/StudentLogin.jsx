import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { CourseAccountContext } from "../../context/courseAccount";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setCourseAccount } = useContext(CourseAccountContext);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/course/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setLoading(false);
        setCourseAccount(res.data);
        window.location.href = "/";
      }
    } catch (error) {
      setLoading(false);
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
                    Your Email
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your email here"
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
                  <Link
                    to="/signup"
                    className="lg:ml-2 text-[#1d3e5b] font-semibold"
                  >
                    create an account
                  </Link>
                </span>
                <Link
                  to={"/forgot-password"}
                  className="lg:ml-2 text-[#3241b4] hover:text-green-400"
                >
                  forgot password?
                </Link>
                {loading ? (
                  <div className="w-full text-white font-bold hover:bg-blue-400 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center ">
                    processing...
                  </div>
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

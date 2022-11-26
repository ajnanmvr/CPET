import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function CourseResetPassword() {
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState();
  const { token } = useParams();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(password);

    if (!password) {
      alert("Please enter password");
      setLoading(false);
    } else if (password !== confirm) {
      alert("Please check your confirm password");
      setLoading(false);
    }
    try {
      let res = await Axios.post("/course/resetPassword/" + token, {
        password,
      });
      if (res.status === 200) {
        alert("Password reset successful");
        setPassword("");
        setLoading(false);
        window.location.href = "/student-login";
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
      alert("Something went wrong, please try again");
      if (error.response?.data?.message === "Token is invalid or has expired") {
        window.location.href = "/forgot-password";
      }
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col lg:items-center lg:justify-center lg:px-6 lg:py-8 lg:mx-auto h-screen lg:h-screen mt-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 lg:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 lg:space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <p className="text-red-500 text-center">{error}</p>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*****"
                    required
                    value={password}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setConfirm(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*****"
                    required
                    value={confirm}
                  />
                </div>

                {loading ? (
                  <div className="w-full text-white font-bold hover:bg-blue-400 bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center ">
                    processing...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white font-bold hover:bg-violet-400 bg-violet-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={(e) => login(e)}
                  >
                    Reset Password
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

export default CourseResetPassword;

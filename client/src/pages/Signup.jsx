import React, { useState } from "react";
import Axios from "../Axios";

function Signup() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const CreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirm) {
      setError("confirm password doesn't match");
      return;
    }
    try {
      let res = await Axios.post("/course/signup", {
        password,
        name,
        phone,
        email,
      });
      if (res.status === 200) {
        // setLoading(false);
        window.location.href = `/email-sent/${email}`;
      }
    } catch (error) {
      console.error(error.response);
      // setLoading(false);
    }
  };
  return (
    <div>
      <h1 className="text-center text-blue-500 font-bold uppercase my-4">
        connect us online
      </h1>
      <section className="bg-gray-50 w-full p-[3rem] dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center lg:px-6 py-8 lg:mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 lg:text-sm text-[12px]  font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 lg:text-sm text-[12px]  font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 lg:text-sm text-[12px]  font-medium text-gray-900 dark:text-white">
                    Whatsapp Number{" "}
                    <span className="lg:text-sm text-[10px] text-blue-500">
                      (with country code)
                    </span>
                  </label>

                  <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Whatsapp Number"
                    required
                  />
                </div>
                <p className="text-center text-red-500">{error}</p>

                <div>
                  <label className="block mb-2 lg:text-sm text-[12px]  font-medium text-gray-900 dark:text-white">
                    Password
                  </label>

                  <input
                    type="password"
                    className="bg-gray-50 mr-2 placeholder:text-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*******"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 lg:text-sm text-[12px]  font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    className="bg-gray-50 mr-2 placeholder:text-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="*******"
                    required
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </div>

                <span className="flex justify-between lg:text-sm text-[12px] items-center mt-3">
                  Already have an account?
                  <a
                    href="/student-login"
                    className="lg:ml-2 text-[#1d3e5b] font-semibold"
                  >
                    sign in now
                  </a>
                </span>
                {loading ? (
                  <div className="w-full text-white font-bold hover:bg-green-400 bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center ">
                    Processing...
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white font-bold hover:bg-teal-400 bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300  rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={(e) => CreateAccount(e)}
                  >
                    Create Account
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

export default Signup;

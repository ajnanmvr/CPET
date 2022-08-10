import React, { useContext, useState } from "react";
import Axios from "../Axios";
import { toast } from "react-toastify";
import { UserAuthContext } from "../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData, authData } = useContext(UserAuthContext);
  const [show, setShow] = useState(false);

  if (authData) {
    window.location.href = "/admin";
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/auth/login", { username, password });
      if (res.status === 200) {
        setUsername("");
        setPassword("");
        setAuthData(res.data);
        window.location.href = "/admin";
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              className="object-cover w-full h-full"
              src="/loginImage.jpg"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <form>
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  Login to Your Account
                </h1>
                <div>
                  <label className="block text-sm">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div>
                  <label className="flex items-center mt-4 text-sm">
                    <p className="mr-5">Password</p>
                    {!show && (
                      <FontAwesomeIcon
                        onClick={() => setShow(true)}
                        icon={faEye}
                        className="cursor-pointer"
                      />
                    )}
                    {show && (
                      <FontAwesomeIcon
                        onClick={() => setShow(false)}
                        icon={faEyeSlash}
                        className="cursor-pointer"
                      />
                    )}
                  </label>

                  <input
                    className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder
                    type={show ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  onClick={(e) => handleLogin(e)}
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                  type="submit"
                >
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

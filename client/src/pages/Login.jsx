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
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-[20px]  shadow-xl">
        <div className="flex flex-col md:flex-row ">
          <div className="h-32 md:h-auto md:w-1/2 ">
            <img
              className="object-cover w-full h-full rounded-tl-[20px] rounded-bl-[20px]"
              src="/images/6.jpeg"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
            
              <form>
                <h1 className="mb-4 text-4xl font-bold text-center text-blue-700">
                  ADMIN LOGIN
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

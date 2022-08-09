import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../context/user";

function Navbar() {
  const { authData } = useContext(UserAuthContext);
  return (
    <nav className="flex justify-between items-center px-10 py-4">
      <Link to={"/"} className="flex items-center">
        <img src="/mahdiyya-logo.png" alt="Mahdiyya Logo" width={100} />
        <h1 className="text-green-600 font-bold text-3xl uppercase">
          mahdiyya
        </h1>
      </Link>
      <div className="text-base font-normal px-10 ">
        <ul className="flex space-x-4 font-bold text-gray-800">
          <li className="cursor-pointer hover:text-orange-400 transition">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer hover:text-orange-400 transition">
            <a href="#about">About Us</a>
          </li>

          <li className="cursor-pointer hover:text-orange-400 transition">
            <a href="#contact"> Contact Us</a>
          </li>
          <li className="cursor-pointer hover:text-orange-400 transition">
            Mahdiyya
          </li>
          <li>
            {authData ? (
              <Link
                to={"/admin"}
                className="bg-orange-400 py-2 px-6 text-white border border-orange-400 hover:bg-transparent hover:text-orange-400 rounded-full"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="bg-orange-400 py-2 px-6 text-white border border-orange-400 hover:bg-transparent hover:text-orange-400 rounded-full"
              >
                login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

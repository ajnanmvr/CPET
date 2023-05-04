import { faBars, faClose, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CourseAccountContext } from "../../context/courseAccount";
function Navbar({ navOpened, setNavOpened }) {
  const { courseAccount, checkCourseLogin, logout } =
    useContext(CourseAccountContext);

  useEffect(() => {
    checkCourseLogin();
  }, []);
  return (
    <nav className="bg-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button*/}
          <div className="flex w-full sm:hidden justify-between items-center transition">
            <Link to={"/"}>
              <img
                className="block h-[48px]  lg:hidden cursor-pointer"
                src="/images/logo.png"
                alt="CPET darul huda"
              />
            </Link>
            <FontAwesomeIcon
              onClick={() => setNavOpened(!navOpened)}
              icon={navOpened ? faClose : faBars}
              className="mr-4"
            />
          </div>

          <div className="flex flex-1 items-center lg:justify-between sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/">
                <img
                  className="hidden h-16 w-auto lg:block cursor-pointer"
                  src="/images/logo.png"
                  alt="CPET Darul Huda"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 items-center">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  to="/"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/notifications"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notifications
                </Link>
                <Link
                  to="all-courses"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  Courses
                </Link>
                <Link
                  to="student-downloads"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  Downloads
                </Link>
                {courseAccount && (
                  <Link
                    to="my-courses"
                    className=" px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Courses
                  </Link>
                )}
                <a
                  href="/admin"
                  className=" block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                {courseAccount ? (
                  <>
                    <p className=" block px-3 py-2 text-green-400 rounded-md text-base font-medium">
                      hi, {courseAccount.name}
                    </p>

                    <button
                      onClick={() => logout()}
                      className="  text-red-600 rounded-md text-md font-bold"
                    >
                      <FontAwesomeIcon icon={faPowerOff} />
                    </button>
                  </>
                ) : (
                  <Link
                    to="/student-login"
                    className="bg-green-400 block px-3 py-2 text-white rounded-md text-base font-medium"
                  >
                    login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {navOpened && (
        <div className="sm:hidden h-screen" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <Link
              to="#home"
              className=" block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/notifications"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Notifications
            </Link>
            {courseAccount && (
              <Link
                to="my-courses"
                className=" px-3 py-2 rounded-md text-sm font-medium"
              >
                My Courses
              </Link>
            )}
            <Link
              to="#courses"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </Link>

            <Link
              to="#gallery"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Gallery
            </Link>
            <a
              href="/admin"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            {courseAccount ? (
              <>
                <p className=" block px-3 py-2 text-green-400 rounded-md text-base font-medium">
                  hi, {courseAccount?.name}
                </p>

                <button
                  onClick={() => logout()}
                  className="outline-none text-red-600 rounded-md text-md font-bold"
                >
                  logout <FontAwesomeIcon icon={faPowerOff} />
                </button>
              </>
            ) : (
              <Link
                to="/student-login"
                className="bg-green-400 block px-3 py-2 text-white rounded-md text-base font-medium"
              >
                login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

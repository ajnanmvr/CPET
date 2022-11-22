import React from "react";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Navbar({ navOpened, setNavOpened }) {
  return (
    <nav className="bg-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute  inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <div className="flex justify-between items-center transition">
              <img
                className="block h-8 w-auto mr-[10rem] lg:hidden"
                src="/images/logo.png"
                alt="Your Company"
              />
              <FontAwesomeIcon
                onClick={() => setNavOpened(!navOpened)}
                icon={navOpened ? faClose : faBars}
                className="ml-auto"
              />
            </div>
          </div>
          <div className="flex flex-1 items-center lg:justify-between sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="hidden h-8 w-auto lg:block"
                src="/images/logo.png"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <a
                  href="#home"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </a>
                <a
                  href="#about"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </a>
                <a
                  href="#courses"
                  className=" px-3 py-2 rounded-md text-sm font-medium"
                >
                  Courses
                </a>
                <a
                  href="/admin"
                  className=" block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>
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
            <a
              href="#home"
              className=" block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Home
            </a>
            <a
              href="#about"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </a>

            <a
              href="#courses"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Courses
            </a>

            <a
              href="#gallery"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Gallery
            </a>
            <a
              href="/admin"
              className=" block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

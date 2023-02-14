import React, { useEffect, useState } from "react";
import Axios from "../../Axios";
import "../../style.css";
import About from "./About";
import Counter from "./Counter";
import Courses from "./Courses";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ProgrameGallery from "./ProgrameGallery";

function Homepage() {
  const [notifications, setNotifications] = useState([]);
  const [index, setIndex] = React.useState(0);

  const getAllNotifications = async () => {
    try {
      let { data } = await Axios.get("/notification");
      setNotifications(data.docs);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === notifications.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {};
  }, [index]);
  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div>
      <div id="container" className={"active"}>
        <HeroSection />
        <div className="lg:flex lg:gap-2">
          {notifications.map((notification, key) => (
            <a
              href={notification?.url}
              className="relative lg:w-1/2  w-full group mt-2 mx-2"
              target={"_blank"}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#97d7e9] to-[#96ffd8] rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                  />
                </svg>
                <div className="space-y-2">
                  <p className="text-slate-800">{notification?.title}</p>
                  <a
                    href={notification?.url}
                    className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                    target="_blank"
                  >
                    Go to details
                    {/* <span className="text-white animate-pulse text-sm ml-3 bg-red-500 rounded-full px-2">new</span> */}
                  </a>
                </div>
              </div>
            </a>
          ))}
        </div>
        <Counter />
        <Courses />
        <About />
        <ProgrameGallery />
        {/* <Features /> */}
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;

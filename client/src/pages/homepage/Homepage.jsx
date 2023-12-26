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

        {/*  */}
        {/* component */}
        <a
          href="https://shefest.cpetdhiu.in/"
          target="_blank"
          className="flex justify-center  items-center mx-4 bg-gray-100"
        >
          <div className=" bg-yellow-100 max-w-2xl flex-wrap items-center justify-center  p-3 rounded-xl flex w-full my-5 ">
            <img src="/images/shefest-logo.svg" alt="" className="w-72" />
            <div className=" p-4  rounded-xl">
              <p className="w-full text-2xl font-semibold text-black">
                SheFest 2023-24 Arts Fest
              </p>
              <p className="w-full text-sm pb-4 font-semibold text-gray-500">
               Results Published
              </p>
              <div className="lg:flex justify-between items-center">
                <p className="text-white animate-pulse hover:bg-yellow-600 bg-yellow-500 rounded-full px-3 py-1 font-semibold cursor-pointer transition border border-white  hover:bg-transparent ">
                  Check Now
                </p>
              </div>
            </div>
          </div>
        </a>

        {/*  */}

        <p className="text-xl text-center font-bold uppercase my-4 text-[#3f6495]">
          notifications
        </p>
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          {notifications.map((notification, key) => (
            <a
              href={notification?.url}
              className="relative group mt-4 mx-2 w-full"
              target={"_blank"}
              key={key}
            >
              <div className="relative bg-white hover:bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                <div className="p-6 flex items-center space-x-4">
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
                  <div className="flex flex-col">
                    <p className="text-gray-800  font-semibold ">
                      {notification?.title.length > 70
                        ? notification?.title.substring(0, 70) + "..."
                        : notification?.title}
                    </p>
                    <a
                      href={notification?.url}
                      className="block text-indigo-400 hover:text-indigo-600 transition duration-200"
                      target="_blank"
                    >
                      Go to details
                    </a>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <Counter />

        <a
          href="/admission-started"
          className="flex flex-col  mx-auto my-3 flex-1 items-center  bg-white border border-gray-200 lg:w-3/4 w-full rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="p-3 lg:w-3/4 w-full rounded-t-lg h-64   md:rounded-none md:rounded-l-lg"
            src="/images/admission.jpg"
            alt
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight capitalize text-teal-500 dark:text-white">
              MAHDIYYA COURSE ADMISSION STARTED
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              ദാറുൽഹുദാ ഇസ്‌ലാമിക് യൂനിവേഴ്സിറ്റി പൊതു വിദ്യാഭ്യാസ വിഭാഗം
              CPET(Centre for Public Education and Training) ന് കീഴിൽ 2016 ൽ
              പെൺകുട്ടികൾക്കായി തുടക്കം കുറിച്ച പാഠ്യ പദ്ധതിയാണ് മഹ്ദിയ്യ
              കോഴ്സ്....
            </p>
            <button className="bg-teal-500 text-white font-bold px-3 py-2 rounded-[20px] lg:w-1/4 w-full hover:bg-transparent border border-teal-500 transition hover:text-teal-500 hover:cursor-pointer">
              Read More
            </button>
          </div>
        </a>

        <a
          href="https://sites.google.com/dhiu.in/ccbp-certificatecourseinbehavi/home"
          className="flex flex-col  mx-auto my-3 flex-1 items-center  bg-white border border-gray-200 lg:w-3/4 w-full rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="p-3 lg:w-3/4 w-full rounded-t-lg h-64   md:rounded-none md:rounded-l-lg"
            src="/images/CCBP.jpg"
            alt
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight capitalize text-teal-500 dark:text-white">
              certificate course in behavioural pedagogy (CCBP)
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Certificate Course in Behavioral Pedagogy [CCBP] is introduced in
              the year 2023 with the aim of rejuvenating the pathways of the
              teaching faculties at the Darul Huda educational system in
              perceiving and nurturing constructive and positive engagement with
              its student communities sprawled across seven states and 36
              campuses in India.
            </p>
            <button className="bg-teal-500 text-white font-bold px-3 py-2 rounded-[20px] lg:w-1/4 w-full hover:bg-transparent border border-teal-500 transition hover:text-teal-500 hover:cursor-pointer">
              Apply Now
            </button>
          </div>
        </a>
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

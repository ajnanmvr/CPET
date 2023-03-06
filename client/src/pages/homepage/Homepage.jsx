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

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfb_S31WKWCzDglCQokIOkyfrUSWSmqCjlaPuyMxfE8g_CXOg/viewform"
          className="flex flex-col  mx-auto my-3 flex-1 items-center  bg-white border border-gray-200 lg:w-3/4 w-full rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="p-3 lg:w-3/4 w-full rounded-t-lg h-64   md:rounded-none md:rounded-l-lg"
            src="/images/mahdiyya_registration.jpg"
            alt
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight capitalize text-teal-500 dark:text-white">
              APPLICATION FORM FOR MAHDIYYA STUDY CENTRE
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              ദാറുൽ ഹുദാ ഇസ്‌ലാമിക് യൂണിവേഴ്സിറ്റി പൊതു വിദ്യാഭ്യാസ വിഭാഗം
              സെന്റർ ഫോർ പബ്ലിക് എഡ്യൂക്കേഷൻ ആൻഡ് ട്രൈനിങ്ങിന് കീഴിൽ
              ഹയർസെക്കണ്ടറി, ഡിഗ്രി തലത്തിൽ പഠനം നടത്തുന്ന വിദ്യാർഥിനികൾക്ക്
              ഭൗതിക പഠനത്തോടൊപ്പം മത പഠനം ഉറപ്പ് വരുത്താൻ 2016ൽ ആരംഭിച്ച
              വിദ്യാഭ്യാസ സംരംഭമാണ് Certificate in Moral Studies (CMS).
            </p>
            <button className="bg-teal-500 text-white font-bold px-3 py-2 rounded-[20px] lg:w-1/4 w-full hover:bg-transparent border border-teal-500 transition hover:text-teal-500 hover:cursor-pointer">
              Apply Now
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

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
        <div className="flex  flex-col items-center  my-4">
          <p>{notifications[index]?.title}</p>
          <a
            href={notifications[index]?.url}
            target="_blank"
            className="bg-green-400 text-white rounded-[5px] ml-2 px-2 py-1 text-center"
          >
            click
          </a>
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

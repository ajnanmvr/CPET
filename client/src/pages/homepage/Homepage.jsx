import React from "react";
import Navbar from "../../components/Navbar";
import AboutUs from "./About";
import Contact from "./Contact";
import SlideShow from "./Slideshow";

function Homepage() {
  return (
    <>
      <Navbar />
      <SlideShow />
      <AboutUs />
      <Contact />
      <footer>
        <h1 className="text-center font-bold my-4">Location</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6473.883610965569!2d76.15320865!3d11.119675299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63698834e190d%3A0xe0c3d1006328220!2sPayyanad%2C%20Kerala%20676122!5e1!3m2!1sen!2sin!4v1659874736978!5m2!1sen!2sin"
          width={"100%"}
          height={"300"}
          title="map"
        />
      </footer>
    </>
  );
}

export default Homepage;

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
      <div>
        <section className="status">
          <h2 className="status-header">Counters</h2>
          <div className="statusDivider" />
          <p className="description">
            Cedar High University was founded on the principle that by pursuing
            big ideas and sharing what we learn, we make the world a better
            place. For more than 135 years, we haven’t strayed from that vision.
          </p>
          <div className="statusContainer">
            <div className="sec">
              <div className="secIcon" />
              <p className="secInfo">85+</p>
              <p className="secName">Graduates</p>
            </div>
            <div className="sec">
              <div className="secIcon" />
              <p className="secInfo">85+</p>
              <p className="secName">Graduates</p>
            </div>
            <div className="sec">
              <div className="secIcon" />
              <p className="secInfo">85+</p>
              <p className="secName">Graduates</p>
            </div>
            <div className="sec">
              <div className="secIcon" />
              <p className="secInfo">85+</p>
              <p className="secName">Graduates</p>
            </div>
          </div>
        </section>
        <Contact />

        <section className="mapContainer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6473.883610965569!2d76.15320865!3d11.119675299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63698834e190d%3A0xe0c3d1006328220!2sPayyanad%2C%20Kerala%20676122!5e1!3m2!1sen!2sin!4v1659874736978!5m2!1sen!2sin"
            width="100%"
            height={300}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </>
  );
}

export default Homepage;

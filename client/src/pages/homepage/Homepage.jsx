import React, { useState } from "react";
import "../../base.css";
import Courses from "../../components/Courses";
import "../../style.css";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import Overview from "./Overview";
import ProgrameGallery from "./ProgrameGallery";

function Homepage() {
  const [navOpened, setNavOpened] = useState(false);
  return (
    <div>
      <div id="container" className={`${navOpened ? "active move" : "active"}`}>
        <Navbar navOpened={navOpened} setNavOpened={setNavOpened} />
        <HeroSection />
        <Overview />
        <Courses />
        <section className="countdown-section">
          <div className="container">
            <div className="countdown-box">
              <h1>Mahdiyya Course</h1>
              <p>Admission is open now</p>
            </div>
            <p>
              {" "}
              Mahdiyya course is a five year course on Islamic moral studies
              designed for women and provided through selected centers which are
              giving higher secondary educations. The course is optional as
              following, two years Diplomas course, three years certificate
              course and five years degree course.
            </p>
            <a
              className="button-two"
              href="http://cpet.dhiu.in/add-student"
              target={"_blank"}
            >
              Apply Now
            </a>
          </div>
        </section>
        <ProgrameGallery />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;

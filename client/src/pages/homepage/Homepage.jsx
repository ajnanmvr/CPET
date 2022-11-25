import React, { useState } from "react";
import Features from "./Features";
import "../../style.css";
import About from "./About";
import Courses from "./Courses";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ProgrameGallery from "./ProgrameGallery";
import Counter from './Counter'

function Homepage() {
  return (
    <div>
      <div id="container" className={"active"}>
        <HeroSection />
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

import React, { useState } from "react";
import Courses from "./Features";
import "../../style.css";
import About from "./About";
import Features from "./Courses";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Navbar from "./Navbar";
import ProgrameGallery from "./ProgrameGallery";
import Counter from './Counter'

function Homepage() {
  const [navOpened, setNavOpened] = useState(false);
  return (
    <div>
      <div id="container" className={`${navOpened ? "active move" : "active"}`}>
        <Navbar navOpened={navOpened} setNavOpened={setNavOpened} />
        <HeroSection />
        <Courses />
        <Features />
        <About />
        <ProgrameGallery />
        <Counter />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;

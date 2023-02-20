import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <section id="about" className="lg:flex justify-between ">
      <div className="lg:w-[500px] lg:mt-[4rem]">
        <h2 className="font-bold mb-4 font-sans uppercase text-teal-500">About Us</h2>
        <p>
          Centre for Public Education and Training is an extension of 
          Darul Huda Islamic University devised for providing socio-educational empowerment
          programs for the public. CPET plans, designs and implements awareness
          programs aimed at different age groups of the public.
        </p>
        <Link
          to={"/about-us"}
          className="bg-teal-500  px-3 py-1 rounded-[20px] hover:bg-transparent border mt-5 border-teal-500 hover:cursor-pointer hover:text-teal-500 transition text-white"
        >
          Know More
        </Link>
      </div>
      <div className="video">
        <img
          src="/images/dh.jpg"
          className="w-[500px] rounded-xl mt-4"
          alt=""
        />
      </div>
    </section>
  );
}

export default About;

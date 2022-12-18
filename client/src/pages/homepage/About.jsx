import React from "react";

function About() {
  return (
    <section id="about" className="lg:flex justify-between ">
      <div className="lg:w-[500px] lg:mt-[4rem]">
        <h2 className="font-bold mb-4 font-sans">About Us</h2>
        <p>
          Centre for Public Education and Training is an extension of the
          University devised for providing socio-educational empowerment
          programs for the public. CPET plans, designs and implements awareness
          programs aimed at different age groups of the public.
        </p>
      </div>
      <div className="video">
        <img
          src="/images/dh.jpg"
          className="w-[500px] rounded-xl mt-4"
          alt=""
        />
        <i className="fa-sharp fa-solid fa-circle-play" />
      </div>
    </section>
  );
}

export default About;

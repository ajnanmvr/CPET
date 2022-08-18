import React from "react";

function Slideshow() {
  return (
    <div className="slideShow">
      <div
        className="slide"
        style={{
          background:
            'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg")',
        }}
      >
        <div className="slideContent">
          <h2 className="font-bold">Centre For Public Education And Training</h2>
          <p>
            CPET is an unprecedented attempt by DHIU to plan, design and
            implement various educational and training programs aimed at
            different groups of public.{" "}
          </p>
          <button>
            <a href="https://www.dhiu.in/cpet.html">Learn More</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;

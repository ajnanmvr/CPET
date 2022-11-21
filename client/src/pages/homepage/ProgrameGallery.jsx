import React from "react";

function ProgrameGallery() {
  return (
    <section className="collection-section" id="gallery">
      <div className="container">
        <div className="title-section">
          <div className="left-part">
            <h1 className="font-bold">Collections</h1>
            <h1>Programme Gallery</h1>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-2">
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/1.jpeg"
            alt=""
          />
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/2.jpeg"
            alt=""
          />
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/7.jpeg"
            alt=""
          />
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/9.jpeg"
            alt=""
          />
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/5.jpeg"
            alt=""
          />
          <img
            className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
            src="/images/6.jpeg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default ProgrameGallery;

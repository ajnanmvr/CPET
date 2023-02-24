import React from "react";

function ProgrameGallery() {
  return (
    // <section className="collection-section" id="gallery">
    //   <div className="container">
    //     <div className="title-section">
    //       <div className="left-part">
    //         <h1 className="font-bold">Collections</h1>
    //         <h1>Programme Gallery</h1>
    //       </div>
    //     </div>
    //     <div className="lg:grid lg:grid-cols-3 lg:gap-2">
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/1.jpeg"
    //         alt=""
    //       />
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/2.jpeg"
    //         alt=""
    //       />
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/7.jpeg"
    //         alt=""
    //       />
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/9.jpeg"
    //         alt=""
    //       />
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/5.jpeg"
    //         alt=""
    //       />
    //       <img
    //         className="rounded-[20px] mb-3 lg:m-0 h-[250px] w-full hover:opacity-[.5] transition ease-in-out delay-15 duration-300 hover:cursor-pointer"
    //         src="/images/6.jpeg"
    //         alt=""
    //       />
    //     </div>
    //   </div>
    // </section>
    <section className="overflow-hidden text-neutral-700 mt-5">
      <div class="container px-5 py-2 lg:px-32 lg:pt-12">
        <h1 className="text-center text-teal-500  hover:text-teal-800 transition cursor-pointer py-1 rounded-[30px]">
          Our Gallery
        </h1>
        <div class="-m-1 lg:flex lg:flex-wrap md:-m-2">
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/1.jpeg"
              />
            </div>
          </div>
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/2.jpeg"
              />
            </div>
          </div>
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/3.jpeg"
              />
            </div>
          </div>
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/9.jpeg"
              />
            </div>
          </div>
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/5.jpeg"
              />
            </div>
          </div>
          <div class="lg:flex lg:w-1/3 lg:flex-wrap w-full">
            <div class="w-full p-1 md:p-2">
              <img
                alt="gallery"
                class="block h-full w-full rounded-lg object-cover object-center"
                src="/images/6.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgrameGallery;

import React from "react";
import Navbar from "../../components/Navbar";

function Homepage() {
  return (
    <>
      <Navbar />
      <main className="height: 100vh; background-size: cover !important; color: white; padding: 0 70px; display: flex; flex-direction: column; justify-content: center;">
        <div className="bg-[url('https://ld-wp73.template-help.com/wordpress/prod_29735/v1/wp-content/uploads/2020/09/slide-1-1024x432-1.jpg')] h-screen bg-cover text-white flex flex-col justify-center bg-no-repeat">
          <div className="p-12">
            <h1 className="text-6xl font-bold font-sans ">
              Inspiration, Innovation <br /> and Discovery.
            </h1>
            <p className="self-start font-bold text-left text-xl py-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
              quis nisi porro ipsum nihil voluptatibus labore iste dignissimos
              consectetur quasi, accusamus sunt at fugit? Nobis veniam ratione
              ipsa fuga odit!
            </p>
            <div>
              <button className="bg-orange-400 border-2 border-orange-400 hover:text-orange-400 transition hover:bg-transparent px-8 py-2 uppercase rounded-sm mx-3 font-bold">
                view details
              </button>
            </div>
          </div>
        </div>
      </main>
      <section className="flex h-screen justify-around text-center items-center flex-col p-4">
        <h2 className="text-gray-900 font-bold text-5xl">Counters</h2>
        <div className="h-1 bg-black w-8" />
        <p className="text-gray-600 text-xl w-2/4">
          Cedar High University was founded on the principle that by pursuing
          big ideas and sharing what we learn, we make the world a better place.
          For more than 135 years, we haven’t strayed from that vision.
        </p>
        <div className="flex flex-wrap justify-around w-3/4">
          <div className="h-24 w-24 rounded-full border-2 border-red-600">
            <div className="h-24 w-24" />
            <p className="text-red-700 text-3xl font-bold">85+</p>
            <p className="text-gray-900 text-lg font-bold">Graduates</p>
          </div>
          <div className="h-24 w-24 rounded-full border-2 border-red-600">
            <div className="h-24 w-24" />
            <p className="text-red-700 text-3xl font-bold">85+</p>
            <p className="text-gray-900 text-lg font-bold">Graduates</p>
          </div>
          <div className="h-24 w-24 rounded-full border-2 border-red-600">
            <div className="h-24 w-24" />
            <p className="text-red-700 text-3xl font-bold">85+</p>
            <p className="text-gray-900 text-lg font-bold">Graduates</p>
          </div>
          <div className="h-24 w-24 rounded-full border-2 border-red-600">
            <div className="h-24 w-24" />
            <p className="text-red-700 text-3xl font-bold">85+</p>
            <p className="text-gray-900 text-lg font-bold">Graduates</p>
          </div>
        </div>
      </section>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6473.883610965569!2d76.15320865!3d11.119675299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63698834e190d%3A0xe0c3d1006328220!2sPayyanad%2C%20Kerala%20676122!5e1!3m2!1sen!2sin!4v1659874736978!5m2!1sen!2sin"
          width={"100%"}
          height={"300"}
          style={{ border: "2px" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameborder="0"
          title="map"
        ></iframe>
      </section>
    </>
  );
}

export default Homepage;

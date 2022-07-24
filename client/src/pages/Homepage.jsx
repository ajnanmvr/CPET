import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-3xl uppercase font-extrabold text-white tracking-widest">
          website homepage is under maitanance
        </h1>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          😊
        </h1>

        <Link to={"/login"} className="mt-5">
          <div className="relative inline-block text-sm font-medium text-green-400 group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-400 group-hover:translate-y-0 group-hover:translate-x-0" />
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              GO TO LOGIN
            </span>
          </div>
        </Link>
      </main>
    </div>
  );
}

export default Homepage;

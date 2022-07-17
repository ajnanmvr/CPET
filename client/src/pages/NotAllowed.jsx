import React from "react";
import { Link } from "react-router-dom";

function NotAllowed() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#fff]">
      <h1 className="text-3xl font-extrabold text-red-800 tracking-widest uppercase">
        You don't have permission to access this page !
      </h1>
      <Link to={"/"} className="bg-[#FF6A3D] px-2 text-sm rounded py-2 my-4">
        GO TO HOME
      </Link>
    </main>
  );
}

export default NotAllowed;

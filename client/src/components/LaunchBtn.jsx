import React from "react";

function LaunchBtn() {
  return (
    <div className="rocket-body">
      <div className="rocket">
        <div className="rocket-body">
          <div className="body" />
          <div className="fin fin-left" />
          <div className="fin fin-right" />
          <div className="window" />
        </div>
        <div className="exhaust-flame" />
        <ul className="exhaust-fumes">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <ul className="star">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div className="absolute top-[45%] left-[35%] flex flex-col">
        <h1 className="text-center font-bold text-green-900">CPET.DHIU.IN</h1>
        <h1 className="font-bold capitalize text-gray-600">
          center for public education and training
        </h1>
        <a
          href="http://cpet.dhiu.in"
          target={"_blank"}
          className="btn-5 font-bold text-white text-3xl launch-btn text-center"
        >
          Launch
        </a>
      </div>
    </div>
  );
}

export default LaunchBtn;

import React from "react";

function About() {
  return (
    <section className="about">
      <div className="aboutContent">
        <h2 className="font-bold">About Us</h2>
        <p>
          The academy aims to become a lead virtual resource institute imparting
          Islamic knowledge for people of all ages around the world, thereby
          molding morally conscious and socially committed Ummah who have
          profound scholarship in Islamic disciplines and are well equipped for
          constantly changing socio - cultural contexts. The academy aims to
          become a lead virtual resource institute imparting Islamic knowledge
          for people of all ages around the world, thereby molding morally
          conscious and socially committed Ummah who have profound scholarship
          in Islamic disciplines and are well equipped for constantly changing
          socio - cultural contexts.
        </p>
        <button>Read More</button>
      </div>
      <div
        className="video"
        style={{ backgroundImage: "url(/images/dh.jpg)" }}
      >
        <i className="fa-sharp fa-solid fa-circle-play" />
      </div>
    </section>
  );
}

export default About;

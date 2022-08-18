import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Navbar({ navOpened, setNavOpened }) {
  const dropdownItems = [
    {
      title: "About",
      subItems: [
        {
          text: "Who we are",
          link: "#",
        },
        {
          text: "Director's Message",
          link: "#",
        },
        {
          text: "Vision Mission",
          link: "#",
        },
        {
          text: "Leadership",
          link: "#",
        },
        {
          text: "Office Bearers",
          link: "#",
        },
      ],
    },
    {
      title: "Admissions",
      subItems: [
        {
          text: "Admission Aid",
          link: "#",
        },
        {
          text: "Diplomas/ Courses",
          link: "#",
        },

        {
          text: "Mahdiyya",
          link: "#",
        },
      ],
    },
    {
      title: "Gallery",
      subItems: [
        {
          text: "Mahdiyya",
          link: "#",
        },
        {
          text: "Camps",
          link: "#",
        },

        {
          text: "Volunteering",
          link: "#",
        },
        {
          text: "Others",
          link: "#",
        },
      ],
    },
  ];
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/logo.png" alt />
          </a>
          <a
            href="#"
            onClick={() => setNavOpened(!navOpened)}
            className={`mobile-nav-toggle ${navOpened && " opened"}`}
          >
            <span />
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="drop-link">
                <a className="active" href="#">
                  Home
                </a>
              </li>
              {dropdownItems.map((item, key) => (
                <li key={key} className="drop-link">
                  <a href="#">
                    {item.title} <FontAwesomeIcon icon={faArrowCircleDown} />
                  </a>
                  <ul className="dropdown">
                    {item?.subItems?.map((subItem, key) => (
                      <li key={key}>
                        <a href={subItem.link}>{subItem.text}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="drop-link">
                <a href="#">Academics</a>
                <FontAwesomeIcon icon={faArrowCircleDown} />
                <ul className="dropdown">
                  <li>
                    <a href="#">Diplomas/ Courses</a>
                  </li>
                  <li className="drop-link">
                    <a href="#">Mahdiyya Course</a>
                    <ul className="dropdown level2">
                      <li>
                        <a href="#">About</a>
                      </li>
                      <li>
                        <a href="#">Study Centers</a>
                      </li>
                      <li>
                        <a href="#">Academic Calendar</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${navOpened && " open"}`}>
        <nav className="mobile-nav">
          <img src="/logo-light.png" className="h-12 mb-4" alt="" />
          <ul className="mobile-menu-list">
            <li>
              <a href="/">Home</a>
            </li>
            {dropdownItems.map((item, key) => (
              <li>
                <a href={"#"}>{item.title}</a>
                {item.subItems.map((sub, key) => (
                  <ul className="drop-level" key={key}>
                    <li>
                      <a href={sub.link}>{sub.text}</a>
                    </li>
                  </ul>
                ))}
              </li>
            ))}

            <li className="drop-link">
              <a href="#">Academics</a>
              <ul className="drop-level">
                <li>
                  <a href="#CPET/about.html">Diploma / Courses</a>
                </li>
                <li>
                  <a href="#CPET/about.html">Mahdiyya Course</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

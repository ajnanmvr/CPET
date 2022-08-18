import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Navbar() {
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
          <a href="#" className="mobile-nav-toggle">
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
                <a href="#">Academics</a><FontAwesomeIcon icon={faArrowCircleDown} />
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
      <div className="mobile-menu">
        <div className="search-form-box">
          <form className="search-form">
            <input
              type="search"
              className="search-field"
              placeholder="Enter keyword..."
            />
            <button type="submit" className="search-submit">
              <i className="material-icons open-search">search</i>
            </button>
          </form>
        </div>
        <div className="shopping-cart-box">
          <a className="shop-icon" href="#CPET/cart.html">
            <i className="material-icons">shopping_cart</i>
            Cart
            <span className="CPET-cart-number">0</span>
          </a>
        </div>
        <nav className="mobile-nav">
          <ul className="mobile-menu-list">
            <li>
              <a href="#CPET/index.html">Home</a>
            </li>
            <li className="drop-link">
              <a href="#">Pages</a>
              <ul className="drop-level">
                <li>
                  <a href="#CPET/about.html">About Us</a>
                </li>
                <li>
                  <a href="#CPET/pricing.html">Pricing Packages</a>
                </li>
                <li>
                  <a href="#CPET/portfolio.html">Portfolio</a>
                </li>
                <li>
                  <a href="#CPET/single-project.html">Portfolio Single</a>
                </li>
                <li>
                  <a href="#CPET/teachers.html">Teachers</a>
                </li>
                <li>
                  <a href="#CPET/single-teacher.html">Teacher Single</a>
                </li>
                <li>
                  <a href="#CPET/cart.html">Shopping Cart</a>
                </li>
                <li>
                  <a href="#CPET/checkout.html">Checkout</a>
                </li>
                <li>
                  <a href="#CPET/single-teacher.html">Teacher Single</a>
                </li>
                <li className="drop-link">
                  <a href="#">Submenu Level 1</a>
                  <ul className="drop-level">
                    <li>
                      <a href="#">Submenu Level 2</a>
                    </li>
                    <li className="drop-link">
                      <a href="#">Submenu Level 2</a>
                      <ul className="drop-level">
                        <li>
                          <a href="#">Submenu Level 3</a>
                        </li>
                        <li>
                          <a href="#">Submenu Level 3</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Submenu Level 2</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="drop-link">
              <a href="#CPET/blog.html">Blog</a>
              <ul className="drop-level">
                <li className="drop-link">
                  <a href="#CPET/blog-list.html">Blog List</a>
                  <ul className="drop-level">
                    <li>
                      <a href="#CPET/blog-list-leftsidebar.html">
                        Blog List - Sidebar Left
                      </a>
                    </li>
                    <li>
                      <a href="#CPET/blog-list-rightsidebar.html">
                        Blog List - Sidebar Right
                      </a>
                    </li>
                    <li>
                      <a href="#CPET/blog-list.html">No Sidebar</a>
                    </li>
                  </ul>
                </li>
                <li className="drop-link">
                  <a href="#CPET/blog-grid-3.html">Blog Grid</a>
                  <ul className="drop-level">
                    <li>
                      <a href="#CPET/blog-grid-3.html">3 Column</a>
                    </li>
                    <li>
                      <a href="#CPET/blog-grid-4.html">4 Column</a>
                    </li>
                    <li>
                      <a href="#CPET/blog-grid-leftsidebar.html">
                        Sidebar Left
                      </a>
                    </li>
                    <li>
                      <a href="#CPET/blog-grid-rightsidebar.html">
                        Sidebar Right
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#CPET/blog.html">Blog Classic</a>
                </li>
                <li>
                  <a href="#CPET/single-post.html">Post Single</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#CPET/courses.html">Courses</a>
            </li>
            <li>
              <a href="#CPET/events.html">Events</a>
            </li>
            <li>
              <a href="#CPET/contact.html">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

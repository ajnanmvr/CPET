import React from "react";
import "../../base.css";
import "../../style.css";
import Courses from "./Courses";
import Footer from "./Footer";
import LatestNews from "./LatestNews";
import ProgrameGallery from "./ProgrameGallery";

function Homepage() {
  return (
    <div>
      <div id="container" className="active">
        {/* Header */}
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src="/logo.png" alt />
              </a>
              <a href="#" className="mobile-nav-toggle">
                <span />
              </a>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="drop-link">
                    <a className="active" href="#">
                      Home
                    </a>
                  </li>
                  <li className="drop-link">
                    <a href="#">
                      About <i className="fa fa-angle-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Who We Are</a>
                      </li>
                      <li>
                        <a href="#">Director's Message</a>
                      </li>

                      <li>
                        <a href="#">Vision &amp; Mission</a>
                      </li>
                      <li>
                        <a href="#">Leadership</a>
                      </li>
                      <li>
                        <a href="#">Office Bearers</a>
                      </li>
                    </ul>
                  </li>
                  <li className="drop-link">
                    <a href="#">
                      Academics <i className="fa fa-angle-down" />
                    </a>
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
                  <li className="drop-link">
                    <a href="#">
                      Admissions <i className="fa fa-angle-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Admission Aid</a>
                      </li>
                      <li>
                        <a href="#">Diplomas/ Courses</a>
                      </li>
                      <li>
                        <a href="#">Mahdiyya</a>
                      </li>
                    </ul>
                  </li>
                  <li className="drop-link">
                    <a href="#">
                      Gallery <i className="fa fa-angle-down" />
                    </a>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Mahdiyya</a>
                      </li>
                      <li>
                        <a href="#">Camps</a>
                      </li>
                      <li>
                        <a href="#">Volunteering</a>
                      </li>
                      <li>
                        <a href="#">Others</a>
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
        {/* End Header */}
        {/* slider */}
        <div className="slideShow">
          <div
            className="slide"
            style={{
              background:
                'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Darul_Huda_Islamic_University_Chemmad.jpg")',
            }}
          >
            <div className="slideContent">
              <h2>Centre For Public Education And Training</h2>
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
        {/* End Slider */}
        {/* imporant Links Links */}
        <div className="importantLinks">
          <p />
        </div>
        {/* End imporant Links Links */}
        {/* feature-section*/}
        <section className="director-news">
          {/* feature-section*/}
          <section className="news-section director">
            <div className="container">
              <div className="blog-post list-style">
                <div
                  style={{
                    backgroundImage:
                      "url(https://scontent.fccj5-1.fna.fbcdn.net/v/t39.30808-6/227837216_355447062821067_396891195136929639_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OsyxagtrbYMAX_Z0y3g&_nc_ht=scontent.fccj5-1.fna&oh=00_AT8CfdIzPDyFHvSVN87NWH6SXRgW4OyuQSSazgeFo4dxOg&oe=6301F7A5)",
                    backgroundSize: "cover",
                    width: "300px",
                    height: "400px",
                    margin: "0 10px",
                    borderRadius: "5px",
                  }}
                ></div>
                <div className="post-content">
                  <h1>to Developing a Quality Discussion</h1>
                  <p>
                    CSS. It’s a web designer’s playpen. With so many
                    colors,signer’s playpen. With so many colors,signer’s
                    playpen. signer’s playpen. With so many colors,signer’s
                    playpen. With so many colors,signer’s playpen. With so many
                    colors,signer’s playpen. With so many colors,signer’s many
                    colors,signer’s playpensigner’s playpen. With so many
                    colors,signer’s many colors,signer’s playpensigner’s
                    playpen. With so many colors,signer’s many colors,signer’s
                    playpensigner’s playpen. With so many colors,signer’s many
                    colors,signer’s playpensigner’s playpen. With so many
                    colors,signer’s playpen. With many colors, type settings,
                    layout options, and responsive…
                  </p>
                  <h2>Rasheed Ali Shihab Thangal</h2>
                </div>
              </div>
            </div>
          </section>
          {/* End feature section */}
          {/* news-section 
			================================================== */}
          <section className="news-section news">
            <div className="container">
              <div className="title-section">
                <div className="left-part">
                  <h1>Latest News</h1>
                </div>
                <div className="right-part">
                  <a className="button-one" href="#">
                    View All News
                  </a>
                </div>
              </div>
              <LatestNews />
            </div>
          </section>
          {/* End news section */}
        </section>

        <Courses />

        {/* End popular-courses section */}
        {/* countdown-section 
			================================================== */}
        <section className="countdown-section">
          <div className="container">
            <div className="countdown-box">
              <h1>Mahdiyya Course</h1>
              <p>Admission is open now</p>
            </div>
            <p>
              {" "}
              Mahdiyya course is a five year course on Islamic moral studies
              designed for women and provided through selected centers which are
              giving higher secondary educations. The course is optional as
              following, two years Diplomas course, three years certificate
              course and five years degree course.
            </p>
            <a
              className="button-two"
              href="http://cpet.dhiu.in/add-student"
              target={"_blank"}
            >
              Apply Now
            </a>
          </div>
        </section>
        {/* End countdown section */}
        {/* collection-section  */}
        <ProgrameGallery />
        {/* End collection section */}
        {/* events-section 
			================================================== */}
        <section className="events-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="title-section">
                  <div className="left-part">
                    <span>Events</span>
                    <h1>Upcoming Events</h1>
                  </div>
                </div>
                <div className="events-box">
                  <div className="events-post">
                    <div className="event-inner-content">
                      <div className="top-part">
                        <div className="date-holder">
                          <div className="date">
                            <span className="date-day">22</span>
                            <span className="date-month">Oct</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="event-meta">
                            <span className="event-meta-piece start-time">
                              <i className="material-icons">access_time</i> 6:00
                              am - 12:00 pm
                            </span>
                            <span className="event-meta-piece location">
                              <i className="material-icons">location_on</i> New
                              York , US of America
                            </span>
                          </div>
                          <h2 className="title">
                            <a href="#">
                              Summer High School Journalism Camp Registration
                              Form
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="events-post">
                    <div className="event-inner-content">
                      <div className="top-part">
                        <div className="date-holder">
                          <div className="date">
                            <span className="date-day">14</span>
                            <span className="date-month">Dec</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="event-meta">
                            <span className="event-meta-piece start-time">
                              <i className="material-icons">access_time</i> 2:00
                              am - 5:00 am
                            </span>
                            <span className="event-meta-piece location">
                              <i className="material-icons">location_on</i> New
                              York , US of America
                            </span>
                          </div>
                          <h2 className="title">
                            <a href="#">
                              Board of Regents Campus Live and Community Forum
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="events-post">
                    <div className="event-inner-content">
                      <div className="top-part">
                        <div className="date-holder">
                          <div className="date">
                            <span className="date-day">17</span>
                            <span className="date-month">Dec</span>
                          </div>
                        </div>
                        <div className="content">
                          <div className="event-meta">
                            <span className="event-meta-piece start-time">
                              <i className="material-icons">access_time</i> 2:00
                              am - 8:00 am
                            </span>
                            <span className="event-meta-piece location">
                              <i className="material-icons">location_on</i> New
                              York , US of America
                            </span>
                          </div>
                          <h2 className="title">
                            <a href="#">
                              May Professional Development Diversity and
                              Inclusion Series
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="title-section">
                  <div className="left-part">
                    {/* <span>Watch Video</span> */}
                    <h1>Learn Anywhere</h1>
                  </div>
                </div>
                <div className="video-box">
                  <div className="video-post">
                    <img src="/images/9.jpeg" alt />
                    <div className="hover-post">
                      <h2>Marketing, Media and Advertising</h2>
                      <p>About Studioare</p>
                    </div>
                    <a
                      className="video-link iframe"
                      href="https://vimeo.com/97447862"
                    >
                      <span>
                        <i className="fa fa-play" />
                      </span>
                    </a>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="video-post small-post">
                        <img src="/images/10.jpg" alt />
                        <div className="hover-post">
                          <h2>Limitless learning</h2>
                        </div>
                        <a
                          className="video-link iframe"
                          href="https://vimeo.com/97447862"
                        >
                          <span>
                            <i className="fa fa-play" />
                          </span>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="video-post small-post">
                        <img src="/images/12.jpg" alt />
                        <div className="hover-post">
                          <h2>Learn by Doing</h2>
                        </div>
                        <a
                          className="video-link iframe"
                          href="https://vimeo.com/97447862"
                        >
                          <span>
                            <i className="fa fa-play" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End events section */}
        {/* footer 
			================================================== */}
        <Footer />
        {/* End footer */}
      </div>
    </div>
  );
}

export default Homepage;

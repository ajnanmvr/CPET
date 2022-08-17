import React from "react";
import '../../base.css'
import '../../style.css'

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
                      {/* <li class="drop-link">
										<a href="#"></a>
										<ul class="dropdown level2">
											<li><a href="#">Submenu
													Level 1</a></li>
											<li class="drop-link">
												<a href="#">Submenu
													Level 2</a>
												<ul class="dropdown level2">
													<li><a href="#">Submenu
															Level 2</a></li>
													<li><a href="#">Submenu
															Level 2</a></li>
												</ul>
											</li>
											<li><a href="#">Submenu
													Level 1</a></li>
										</ul>
									</li> */}
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
        <section className="Directors-Message"></section>
        {/* End feature section */}
        {/* news-section 
			================================================== */}
        <section className="news-section">
          <div className="container">
            <div className="title-section">
              <div className="left-part">
                <span>Blog</span>
                <h1>Latest News</h1>
              </div>
              <div className="right-part">
                <a className="button-one" href="#">
                  View All Posts
                </a>
              </div>
            </div>
            <div className="news-box">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="blog-post">
                    <a href="#">
                      <img src="./src/blog-image-1.jpg" alt />
                    </a>
                    <div className="post-content">
                      <a className="category" href="#">
                        Academics
                      </a>
                      <h2>
                        <a href="#">CPET Conference Held</a>
                      </h2>
                      <div className="post-meta date">
                        <i className="material-icons">access_time</i> June 13,
                        2018
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="blog-post">
                    <a href="#">
                      <img src="./src/blog-image-1.jpg" alt />
                    </a>
                    <div className="post-content">
                      <a className="category" href="#">
                        Academics
                      </a>
                      <h2>
                        <a href="#">CPET Conference Held</a>
                      </h2>
                      <div className="post-meta date">
                        <i className="material-icons">access_time</i> June 13,
                        2018
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="blog-post">
                    <a href="#">
                      <img src="./src/blog-image-1.jpg" alt />
                    </a>
                    <div className="post-content">
                      <a className="category" href="#">
                        Academics
                      </a>
                      <h2>
                        <a href="#">CPET Conference Held</a>
                      </h2>
                      <div className="post-meta date">
                        <i className="material-icons">access_time</i> June 13,
                        2018
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="blog-post">
                    <a href="#">
                      <img src="./src/blog-image-1.jpg" alt />
                    </a>
                    <div className="post-content">
                      <a className="category" href="#">
                        Academics
                      </a>
                      <h2>
                        <a href="#">CPET Conference Held</a>
                      </h2>
                      <div className="post-meta date">
                        <i className="material-icons">access_time</i> June 13,
                        2018
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End news section */}
        {/* popular-courses-section 
				================================================== */}
        <section className="popular-courses-section">
          <div className="container">
            <div className="title-section">
              <div className="left-part">
                <span>Academic Programs</span>
                <h1>Diplomas/ Courses</h1>
              </div>
              <div className="right-part">
                <a className="button-one" href="#">
                  View All Courses
                </a>
              </div>
            </div>
            <div className="popular-courses-box">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="course-post">
                    <div className="course-thumbnail-holder">
                      <a href="#">
                        <img src="./src/2.jpg" alt />
                      </a>
                    </div>
                    <div className="course-content-holder">
                      <div className="course-content-main">
                        <h2 className="course-title">
                          <a href="#">CMS Online</a>
                        </h2>
                        <div className="course-rating-teacher">
                          <div
                            className="star-rating has-ratings"
                            title="Apply Now For New Admissions"
                          >
                            <span style={{ width: "100%" }}>
                              <span className="rating">Admission Open</span>
                              <span className="votes-number" />
                            </span>
                          </div>
                          <a href="#" className="course-loop-teacher">
                            Apply Now
                          </a>
                        </div>
                      </div>
                      <div className="course-content-bottom">
                        <div className="course-students">
                          <i className="material-icons">Duration :</i>
                          <span>2 years</span>
                        </div>
                        <div className="course-price">
                          <span> INR 5000.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="course-post">
                    <div className="course-thumbnail-holder">
                      <a href="#">
                        <img src="./src/3.jpg" alt />
                      </a>
                    </div>
                    <div className="course-content-holder">
                      <div className="course-content-main">
                        <h2 className="course-title">
                          <a href="#">
                            Diplomas in Transformational Leadership for Imams
                          </a>
                        </h2>
                        <div className="course-rating-teacher">
                          <div
                            className="star-rating has-ratings"
                            title="Apply Now For New Admissions"
                          >
                            <span style={{ width: "100%" }}>
                              <span className="rating">Admission Open</span>
                              <span className="votes-number" />
                            </span>
                          </div>
                          <a href="#" className="course-loop-teacher">
                            Apply Now
                          </a>
                        </div>
                      </div>
                      <div className="course-content-bottom">
                        <div className="course-students">
                          <i className="material-icons">Duration :</i>
                          <span>1 year</span>
                        </div>
                        <div className="course-price">
                          <span> INR 2500.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="course-post">
                    <div className="course-thumbnail-holder">
                      <a href="#">
                        <img src="./src/1.jpg" alt />
                      </a>
                    </div>
                    <div className="course-content-holder">
                      <div className="course-content-main">
                        <h2 className="course-title">
                          <a href="#">
                            Certificate Course in Islamic Concept and Practice
                            (CCICP)
                          </a>
                        </h2>
                        <div className="course-rating-teacher">
                          <div
                            className="star-rating has-ratings"
                            title="Rated 5.00 out of 5"
                          >
                            <span style={{ width: "100%" }}>
                              <span className="rating">Admission Open</span>
                              <span className="votes-number" />
                            </span>
                          </div>
                          <a href="#" className="course-loop-teacher">
                            Apply Now
                          </a>
                        </div>
                      </div>
                      <div className="course-content-bottom">
                        <div className="course-students">
                          <i className="material-icons">Duration :</i>
                          <span>8 Months</span>
                        </div>
                        <div className="course-price">
                          <span> INR 1500.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="course-post">
                    <div className="course-thumbnail-holder">
                      <a href="#">
                        <img src="./src/1.jpg" alt />
                      </a>
                    </div>
                    <div className="course-content-holder">
                      <div className="course-content-main">
                        <h2 className="course-title">
                          <a href="#">Happy Family</a>
                        </h2>
                        <div className="course-rating-teacher">
                          <div
                            className="star-rating has-ratings"
                            title="Apply Now For New Admissions"
                          >
                            <span style={{ width: "100%" }}>
                              <span className="rating">Admission Open</span>
                              <span className="votes-number" />
                            </span>
                          </div>
                          <a href="#" className="course-loop-teacher">
                            Apply Now
                          </a>
                        </div>
                      </div>
                      <div className="course-content-bottom">
                        <div className="course-students">
                          <i className="material-icons">Duration :</i>
                          <span>10 Hours</span>
                        </div>
                        <div className="course-price">
                          <span> INR 150.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
              href="https://www.dhiu.in/notification_mahdiyya-course.html"
            >
              Apply Now
            </a>
          </div>
        </section>
        {/* End countdown section */}
        {/* collection-section  */}
        <section className="collection-section">
          <div className="container">
            <div className="title-section">
              <div className="left-part">
                <span>Collections</span>
                <h1>Programme Gallery</h1>
              </div>
              <div className="right-part">
                <a className="button-one" href="#">
                  All Images
                </a>
              </div>
            </div>
            <div className="collection-box">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="./src/web-development.jpg" alt />
                      <a href="#" className="hover-post">
                        <span className="title">Recent Programmes</span>
                        <span className="numb-courses">3 Programmes</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="./src/web-design.jpg" alt />
                      <a href="#" className="hover-post">
                        <span className="title">Camps</span>
                        <span className="numb-courses">2 Sessions</span>
                      </a>
                    </div>
                  </div>
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="./src/technology.jpg" alt />
                      <a href="#" className="hover-post">
                        <span className="title">Conferences</span>
                        <span className="numb-courses">3 Courses</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="./src/photography.jpg" alt />
                      <a href="#" className="hover-post">
                        <span className="title">News</span>
                        <span className="numb-courses">3 Courses</span>
                      </a>
                    </div>
                  </div>
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="./src/design.jpg" alt />
                      <a href="#" className="hover-post">
                        <span className="title">Poster Archive</span>
                        <span className="numb-courses">3 Courses</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                    <span>Watch Video</span>
                    <h1>Learn Anywhere</h1>
                  </div>
                </div>
                <div className="video-box">
                  <div className="video-post">
                    <img src="./src/video-poster-1.jpg" alt />
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
                        <img src="./src/video-poster-2.jpg" alt />
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
                        <img src="./src/video-poster-3.jpg" alt />
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
        <footer>
          <div className="container">
            <div className="up-footer">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget text-widget">
                    <a href="#CPET/index.html" className="footer-logo">
                      <img src="/logo-light.png" alt />
                    </a>
                    <p>
                      Centre for Public Education and Training is an extension
                      of the University devised for providing socio-educational
                      empowerment programs for the public. CPET plans, designs
                      and implements awareness programs aimed at different age
                      groups of the public.
                    </p>
                    <ul>
                      <li>
                        <div className="contact-info-icon">
                          <i className="material-icons">location_on</i>
                        </div>
                        <div className="contact-info-value">
                          Darul Huda Islamic University
                        </div>
                      </li>
                      <li>
                        <div className="contact-info-icon">
                          <i className="material-icons">phone_android</i>
                        </div>
                        <div className="contact-info-value">+91 9746229547</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget quick-widget">
                    <h2>Quick Links</h2>
                    <ul className="quick-list">
                      <li>
                        <a href="#">Contact</a>
                      </li>
                      <li>
                        <a href="#">Pricing Packages</a>
                      </li>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Courses</a>
                      </li>
                      <li>
                        <a href="#">News</a>
                      </li>
                      <li>
                        <a href="#">Home</a>
                      </li>
                      <li>
                        <a href="#">Sample Page</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget subscribe-widget">
                    <h2>Subscribe Us</h2>
                    <p>
                      Don't miss anything, Subscribe and keep informed about our
                      updates.
                    </p>
                    <div className="newsletter-form">
                      <input
                        className="form-control"
                        type="email"
                        name="EMAIL"
                        placeholder="Enter Your E-mail"
                        required
                      />
                      <input type="submit" defaultValue="Subscribe" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright copyrights-layout-default">
            <div className="container">
              <div className="copyright-inner">
                <div className="copyright-cell">
                  {" "}
                  © 2022 <span className="highlight">CPET</span> (Center for
                  Public Education and Training)
                </div>
                <div className="copyright-cell">
                  <ul className="CPET-social-links">
                    <li>
                      <a href="#" className="facebook">
                        <i className="fa fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="twitter">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="google">
                        <i className="fa fa-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="linkedin">
                        <i className="fa fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* End footer */}
      </div>
    </div>
  );
}

export default Homepage;

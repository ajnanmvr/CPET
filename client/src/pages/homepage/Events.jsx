import React from 'react'

function Events() {
  return (
    <section className="events-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="title-section">
                  <div className="left-part">
                    <span>Events</span>
                    <h1> Events</h1>
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
  )
}

export default Events
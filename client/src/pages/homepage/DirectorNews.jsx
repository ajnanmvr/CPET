import React from "react";
import LatestNews from "./LatestNews";

function DirectorNews() {
  return (
    <section className="director-news">
      {/* feature-section*/}
      <section className="news-section director">
        <div className="container">
          <div className="blog-post list-style">
            <img
              src="/images/logo.png"
              style={{
                backgroundSize: "cover",
                width: "250px",
                height: "300px",
              }}
            />
            <div className="post-content">
              <h1>CENTRE FOR PUBLIC EDUCATION AND TRAINING (CPET)</h1>
              <p>
                CPET is an unprecedented attempt by DHIU to plan, design and
                implement various educational and training programs aimed at
                different groups of public. Established in January 2012, the
                CPET has started engaging in the process of educating the ummah
                by providing the long and short term diploma and Certificate
                courses.
              </p>
              {/* <h2>Rasheed Ali Shihab Thangal</h2> */}
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
  );
}

export default DirectorNews;

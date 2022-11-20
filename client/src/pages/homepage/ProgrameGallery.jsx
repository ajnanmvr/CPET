import React from 'react'

function ProgrameGallery() {
  return (
    <section className="collection-section">
          <div className="container">
            <div className="title-section">
              <div className="left-part">
                <h1 className='font-bold'>Collections</h1>
                <h1>Programme Gallery</h1>
              </div>
      
            </div>
            <div className="collection-box">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="/images/1.jpeg" alt />
                      {/* <a href="#" className="hover-post">
                        <span className="title">Recent Programmes</span>
                        <span className="numb-courses">3 Programmes</span>
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="/images/6.jpeg" alt />
                      {/* <a href="#" className="hover-post">
                        <span className="title">Camps</span>
                        <span className="numb-courses">2 Sessions</span>
                      </a> */}
                    </div>
                  </div>
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="/images/7.jpeg" alt />
                      {/* <a href="#" className="hover-post">
                        <span className="title">Conferences</span>
                        <span className="numb-courses">3 Courses</span>
                      </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="/images/15.jpeg" alt />
                      {/* <a href="#" className="hover-post">
                        <span className="title">News</span>
                        <span className="numb-courses">3 Courses</span>
                      </a> */}
                    </div>
                  </div>
                  <div className="collection-post">
                    <div className="inner-collection">
                      <img src="/images/13.jpg" alt />
                      {/* <a href="#" className="hover-post">
                        <span className="title">Poster Archive</span>
                        <span className="numb-courses">3 Courses</span>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default ProgrameGallery
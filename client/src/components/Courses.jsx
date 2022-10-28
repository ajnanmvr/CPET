import React from "react";

function Courses() {
  return (
    <div>
      <section class="packages">
        <div class="title">
          <h1>Our Latest Packages</h1>
        </div>
        <div class="package-content">
          {[1, 1, 1, 1].map((course, index) => (
            <div class="box">
              <div class="thumbnail">
                <img src="/images/img-1.jpg" alt="" />
            
                <div class="dest-content">
                  <div class="location">
                    <h4>London</h4>
                    <p>2 years</p>
                  </div>
                  <div class="stars">
                    <a href="#">
                      <i class="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i class="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i class="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i class="bx bxs-star"></i>
                    </a>
                    <a href="#">
                      <i class="bx bxs-star"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Courses;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";

function Courses() {
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
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
            {courses.map((course) => (
              <div key={course._id} className="col-lg-3 col-md-6 ">
                <div className="course-post">
                  <div className="course-thumbnail-holder">
                    <a href="#">
                      <img className="object-cover h-48 w-96" src={course.image} alt={course.courseTitle} />
                    </a>
                  </div>
                  <div className="course-content-holder">
                    <div className="course-content-main">
                      <h2 className="course-title">
                        <a href="#">{course.courseTitle}</a>
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
                        <a
                          href={course.url}
                          target={"_blank"}
                          className="course-loop-teacher"
                        >
                          Apply Now
                        </a>
                      </div>
                    </div>
                    <div className="course-content-bottom">
                      <div className="course-students">
                        <i className="material-icons">Duration :</i>
                        <span>{course.duration}</span>
                      </div>
                      <div className="course-price">
                        <span> INR {course.amount}.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;

import React, { useState } from "react";
import { useEffect } from "react";
import Axios from "../../Axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const getAllCourses = async () => {
    try {
      let { data } = await Axios.get("/course");
      setCourses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <section className="featured">
      <div>
        <h2 className="font-bold">Featured Programmes</h2>
        <p>Explore the world of knowledge from your home.</p>
      </div>
      <div className="featuredContent">
        {courses.map((course, i) => (
          <div className="card">
            <div
              className="img"
              style={{
                backgroundImage: ` url(${course?.image})`,
                opacity: "0.6",
              }}
            />
            <div className="desc">
              <h3>{course.courseTitle}</h3>
              <div className="applyContainer">
                <span>
                  <i className="fa-solid fa-clock" />{course.duration}
                </span>
                <button>Apply</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Courses;

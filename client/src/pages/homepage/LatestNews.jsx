import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";

function LatestNews() {
  const [newses, setNewses] = useState([]);
  const getAllNews = async () => {
    try {
      let { data } = await Axios.get("/news");
      setNewses(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);
  return (
    <div className="container scroll">
      {newses.map((item) => (
        <a className="news-box" href={item.link} target={"_blank"}>
          <div className="blog-post">
            <a>
              <img src={item.image} alt={item.newsName} />
            </a>
            <div className="post-content">
              {/* <a className="category">{item.category.categoryName}</a> */}
              <h2>
                <a>{item.newsName}</a>
              </h2>

              <div className="grid gap-8 items-start justify-center">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                  <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                    <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                      Apply Now
                    </span>
                  </button>
                </div>
              </div>

              {/* <div className="post-meta date">
                <FontAwesomeIcon icon={faClock}/> {moment(item.newsDate).format('DD-MM-YYYY')}
              </div> */}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default LatestNews;

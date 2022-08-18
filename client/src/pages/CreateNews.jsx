import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";
import EditNews from "./superAdmin/EditNews";

function CreateNews() {
  const [newsName, setNewsName] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newses, setNewses] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const deleteNews = async (id) => {
    try {
      if (window.confirm("do you want to delete this news")) {
        let res = await Axios.delete(`/news/${id}`);
        getAllNews();
      }
    } catch (error) {
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("newsDate", newsDate);
    formData.append("category", category);
    formData.append("newsName", newsName);
    formData.append("image", image);
    formData.append("link", link);
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/news", formData);
      if (res.status === 200) {
        toast.success("news added successfully", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  const getAllNews = async () => {
    try {
      let { data } = await Axios.get("/news");
      setNewses(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getCategories = async () => {
    try {
      let { data } = await Axios.get("/news/news-category");
      setCategories(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCategories();
    getAllNews();
  }, []);

  return (
    <div>
      {showModel && <EditNews />}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              create news
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-sm font-bold">
                  News Title
                </label>
                <input
                  type="text"
                  onChange={(e) => setNewsName(e.target.value)}
                  required
                  className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="News Title"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-sm font-bold">
                  News Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="News Title"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-sm font-bold">
                  News Date
                </label>
                <input
                  type="date"
                  onChange={(e) => setNewsDate(e.target.value)}
                  required
                  className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="News Title"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-sm font-bold">
                  News Link
                </label>
                <input
                  type="text"
                  onChange={(e) => setLink(e.target.value)}
                  required
                  className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="News Link"
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="text-sm font-bold">
                  News Category
                </label>
                <select
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="appearance-none my-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="News Title"
                >
                  <option hidden>select category</option>
                  {categories.map((item, key) => (
                    <option value={item._id} key={key}>
                      {item.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              {loading ? (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => handleUpload(e)}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                News Category
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                News Title
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Edit
              </th>
              <th
                scope="col"
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {newses?.map((news, index) => (
              <tr className="border-b">
                <td className="px-5 py-3 bg-white text-sm">{index + 1}</td>
                <td className="px-5 py-3 bg-white text-sm">
                  <img src={news.image} alt={news.newsName} width={120} />
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  {news.category?.categoryName}
                </td>
                <td className="px-5 py-3 bg-white text-sm">{news.newsName}</td>
                <td className="px-5 py-3 bg-white text-sm">{news.newsDate}</td>
                <td className="px-5 py-3 bg-white text-sm">
                  <Link to={`/edit-news/${news._id}`}>
                    <FontAwesomeIcon icon={faEdit} className="cursor-pointer" />
                  </Link>
                </td>
                <td className="px-5 py-3 bg-white text-sm">
                  <FontAwesomeIcon
                    onClick={(e) => deleteNews(news._id)}
                    icon={faTrash}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateNews;

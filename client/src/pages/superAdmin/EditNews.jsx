import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

export default function EditNews() {
  const { id } = useParams();
  const [newsName, setNewsName] = useState("");
  const [newsDate, setNewsDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  

  const getCategories = async () => {
    try {
      let { data } = await Axios.get("/news/news-category");
      setCategories(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsDate", newsDate);
    formData.append("category", category);
    formData.append("newsName", newsName);
    formData.append("image", image);
    try {
      let res = await Axios.patch(`/news/${id}`, formData);
      if (res.status === 200) {
        toast.success("news updated successfully", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error("something went wrong", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Select Image
                  </h3>
                  <form>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label
                          htmlFor="email-address"
                          className="text-sm font-bold"
                        >
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
                        <label
                          htmlFor="email-address"
                          className="text-sm font-bold"
                        >
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
                        <label
                          htmlFor="email-address"
                          className="text-sm font-bold"
                        >
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

                    <div className="mt-2">
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
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={(e) => handleEdit(e)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import AllNotifications from "./AllNotifications";

function CreateNotification() {
  const navigate = useNavigate();

  const initialState = {
    title: "",
    url: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/notification", formData);
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        toast.success("Notification Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-notifications");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  return (
    <div className="">
      <section className="bg-white p-6 lg:w-2/4 mx-auto">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-4xl font-bold text-teal-700 uppercase my-4">
            Create Notification
          </h3>

          <form>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Notification Title
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  value={formData.title}
                  onChange={(e) => onChange(e)}
                  placeholder=" Notification Title"
                  name="title"
                  required
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Notification Link
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  value={formData.url}
                  onChange={(e) => onChange(e)}
                  placeholder="Notification Link "
                  name="url"
                  required
                />
              </div>
            </div>
          </form>
          <div className="lg:col-span-1 mt-4">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-full lg:w-1/2 bg-teal-500 hover:bg-teal-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
                >
                  Create Notification
                </button>
              ) : (
                <h1 className="text-white text-center w-full lg:w-1/2 bg-violet-500 hover:bg-violet-500  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                  Processing..
                </h1>
              )}
            </div>
          </div>
        </div>
      </section>
      <AllNotifications />
    </div>
  );
}

export default CreateNotification;

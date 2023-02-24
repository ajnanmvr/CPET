import {
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { authData } = useContext(UserAuthContext);

  const getAllNotifications = async () => {
    try {
      let { data } = await Axios.get("/notification");
      setNotifications(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteNotification = async (id) => {
    if (window.confirm("Do you want to delete this item")) {
      try {
        await Axios.post("/notification/" + id);
        getAllNotifications();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <div className="mx-auto ">
      <h1 className="text-teal-600 font-bold text-center text-3xl my-4">
        All Notifications
      </h1>

      <div className="px-4 py-8 m-auto mt-5  grid grid-cols-1 lg:grid-cols-2">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification, key) => (
              <div className="relative  w-full group mt-2 mx-2">
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <button onClick={() => deleteNotification(notification._id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    color="#e74848"
                    className="absolute top-4 right-2"
                  />
                </button>
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                    />
                  </svg>
                  <div className="space-y-2">
                    <p className="text-slate-800">{notification?.title}</p>
                    <a
                      href={notification?.url}
                      className="block text-indigo-400 group-hover:text-slate-800 transition duration-200"
                      target="_blank"
                    >
                      Go to details
                      {/* <span className="text-white animate-pulse text-sm ml-3 bg-red-500 rounded-full px-2">new</span> */}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AllNotifications;

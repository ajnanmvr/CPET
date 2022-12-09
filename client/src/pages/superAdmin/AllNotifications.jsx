import {
  faAdd,
  faDeleteLeft,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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

      <div className="px-4 py-8 m-auto mt-5  grid grid-cols-1 lg:grid-cols-4">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification, key) => (
              <div>
                <div
                  key={key}
                  className="py-2 m-4  overflow-hidden bg-gray-200 relative duration-300 shadow-2xl group"
                >
                  <h1 className="text-xl text-center font-bold mb-4 text-teal-500 mt-4 group-hover:text-gray-50 uppercase">
                    {notification.title}
                  </h1>
                  <button onClick={() => deleteNotification(notification._id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="#e74848"
                      className="absolute top-2 right-2"
                    />
                  </button>
                  <a href={`${notification?.url}`} target="_blank">
                    <FontAwesomeIcon
                      icon={faEye}
                      color="#22a589"
                      className="absolute bottom-2 right-2"
                    />
                  </a>
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

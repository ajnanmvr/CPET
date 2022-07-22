import { faAdd } from "@fortawesome/free-solid-svg-icons";
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
      setNotifications(data);
    } catch (error) {
      console.log(error);
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
      {authData?.role === "superAdmin" && (
        <Link
          to={"/create-notification"}
          className="bg-[#10191d] ml-auto w-[140px] px-4 py-2 text-center text-white font-bold rounded-lg cursor-pointer hover:bg-sky-900 transition"
        >
          <FontAwesomeIcon icon={faAdd} /> Create New
        </Link>
      )}
      <div className="px-4 py-8 m-auto mt-5  grid grid-cols-1 lg:grid-cols-2">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification, key) => (
              <div
                key={key}
                className="py-4 h-[100px] m-4  overflow-hidden bg-teal-500 relative rounded-xl  duration-300 shadow-2xl group"
              >
                <h1 className="text-xl text-center font-bold mb-4 text-white mt-4 group-hover:text-gray-50 uppercase">
                  {notification.title}
                </h1>
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

import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../Axios";

function NotificationView() {
  const { id } = useParams();
  const [notification, setNotification] = useState({});
  const getNotification = async () => {
    try {
      let { data } = await Axios.get(`/notification/${id}`);
      setNotification(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotification();
  }, [id]);
  return (
    <div>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {notification.title}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {notification.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationView;

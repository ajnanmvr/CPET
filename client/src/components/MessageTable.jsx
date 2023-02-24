import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function MessageTable({ messages, getMessages }) {
  const [showMore, setShowMore] = useState(null);
  const handleExpandRow = (rowIndex) => {
    setShowMore(showMore === rowIndex ? null : rowIndex);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("are you sure")) {
        let res = await Axios.post(`/messages/delete?id=${id}`);
        toast.success("deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        getMessages();
      }
    } catch (error) {
      console.log(error.response);
      toast.error("error occured", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <table class="table-auto w-full text-center bg-white shadow-md rounded-lg">
      <thead class="bg-gray-300">
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">title</th>
          <th class="px-4 py-2">recipients</th>
          <th class="px-4 py-2">link</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, key) => (
          <tr key={message._id} className="border border-t-1 border-gray-600">
            <td class="px-4 py-2 ">{key + 1}</td>
            <td class="px-4 py-2">{message.title}</td>
            {showMore === key ? (
              <>
                <div class="grid grid-cols-3">
                  {message?.recipients?.map((item) => (
                    <div className="bg-gray-200 m-1">{item.user.username}</div>
                  ))}
                </div>
                <button
                  className="text-center"
                  onClick={() => handleExpandRow(key)}
                >
                  show less
                </button>
              </>
            ) : (
              <button
                className="text-center"
                onClick={() => handleExpandRow(key)}
              >
                show details
              </button>
            )}
            <td class="px-4 py-2">
              <a
                href={message.link}
                target={"_blank"}
                className="text-blue-500"
              >
                view
              </a>
            </td>
            <td class="px-4 py-2">
              <button
                onClick={(e) => handleDelete(e, message._id)}
                class=" text-red-400 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MessageTable;

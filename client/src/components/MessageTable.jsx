import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "../Axios";

function MessageTable({ messages, getMessages }) {
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
          <th class="px-4 py-2">link</th>
          <th class="px-4 py-2">recipient</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages
          .sort((a, b) =>
            a.recipient.username > b.recipient.username ? 1 : -1
          )
          .map((message,key) => (
            <tr key={message._id}>
              <td class="px-4 py-2">{key+1}</td>
              <td class="px-4 py-2">{message.title}</td>
              <td class="px-4 py-2">
                <a
                  href={message.link}
                  target={"_blank"}
                  className="text-blue-500"
                >
                  view
                </a>
              </td>
              <td class="px-4 py-2">{message.recipient.username}</td>
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

import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Axios from "../../Axios";
import {UserAuthContext} from '../../context/user'

function MyMessages() {
  const [messages, setMessages] = useState([]);
  const {authData}=useContext(UserAuthContext)
  const getMessages = async () => {
    Axios.patch("/messages/")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <table class="table-auto w-full lg:w-1/2 mx-auto mt-4 text-center bg-white shadow-md rounded-lg">
      <thead class="bg-gray-300">
        <tr>
          <th class="px-4 py-2">title</th>
          <th class="px-4 py-2">link</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <tr key={message._id}>
            <td class="px-4 py-2 uppercase">{message.title}</td>
            <td class="px-4 py-2">
              <a
                href={message.link}
                target={"_blank"}
                className="text-blue-500"
              >
                view
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyMessages;

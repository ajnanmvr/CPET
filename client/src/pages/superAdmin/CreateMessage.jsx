import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import MessageTable from "../../components/MessageTable";

function CreateMessage() {
  const [recipient, setRecipient] = useState("");
  const [link, setLink] = useState("");
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post("/messages", {
      link,
      recipient,
      title,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("message created", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.error(err.response.data);
        setLoading(false);
        toast.error("something went wrong", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const getUsers = () => {
    Axios.get("/auth/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border border-indigo-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Message Title"
            defaultValue={""}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select a recipient
            </label>
            <select
              id="countries"
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option selected>Choose one</option>
              {users.map((user, key) => (
                <option key={key} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Link
          </label>
          <input
            className="shadow appearance-none border border-indigo-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Link here"
            defaultValue={""}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          {loading ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              processing...
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Send
            </button>
          )}
        </div>
      </form>
      <MessageTable />
    </div>
  );
}

export default CreateMessage;

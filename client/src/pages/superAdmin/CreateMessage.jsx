import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import MessageTable from "../../components/MessageTable";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateMessage() {
  const [recipients, setRecipients] = useState([]);
  const [link, setLink] = useState("");
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [forAll, setForAll] = useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (!recipients.includes(value)) {
      setRecipients([...recipients, value]);
    }
  };

  const removeSelected = (value) => {
    if (recipients.includes(value)) {
      // Remove the selected value
      const updatedValues = recipients.filter((item) => item !== value);
      setRecipients(updatedValues);
    }
  };
  const handleSetAll = () => {
    setForAll(!forAll);
    if (!forAll) {
      setRecipients(users.map((user) => user._id));
    } else {
      setRecipients([]);
    }
  };
  const filteredUsers = users.filter((user) => recipients.includes(user._id));

  const getMessages = async () => {
    Axios.get("/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post("/messages/add", {
      link,
      recipients,
      title,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("message created", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLink("");
          setRecipients(null);
          setTitle("");
          window.location.reload();
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
    getMessages();
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
            value={title}
            required
          />
        </div>
        <div className="mb-4">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Messages To All Study Centres
            </label>
            <input type={"checkbox"} onClick={() => handleSetAll()} />
          </div>
        </div>
        {!forAll && (
          <>
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
                  onChange={(e) => handleSelectChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option hidden>Choose one</option>
                  {users
                    .sort((a, b) => (a.username > b.username ? 1 : -1))
                    .map((user, key) => (
                      <option key={key} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </>
        )}

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
            value={link}
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
        <div className="mb-4">
          <div>
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Selected Recipients
            </label>
            <div className="grid lg:grid-cols-10">
              {filteredUsers.map((item) => (
                <div className="bg-gray-200  m-1 px-2 py-1 shadow-md">
                  {item.username}
                  <span
                    className="pl-2 text-red-500 cursor-pointer"
                    onClick={() => removeSelected(item._id)}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
      <MessageTable messages={messages} getMessages={getMessages} />
    </div>
  );
}

export default CreateMessage;

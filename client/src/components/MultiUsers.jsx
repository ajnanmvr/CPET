import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

function MultiUsers() {
  const [inputFields, setInputFields] = useState([
    {
      username: "",
      email: "",
      password: "",
      phone: "",
      adminCollegeName: "",
      branch: "",
    },
  ]);

  const [branches, setBranches] = useState([]);

  const getBranches = async () => {
    try {
      let { data } = await Axios.get("/branch");
      setBranches(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (index, event) => {
    const newInputFields = inputFields.map((key, i) => {
      if (index === i) {
        key[event.target.name] = event.target.value;
      }
      return key;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        username: "",
        email: "",
        password: "",
        phone: "",
        adminCollegeName: "",
      },
    ]);
  };
  const [addrtype, setAddrtype] = useState(["Work", "Home", "school"]);
  const Add = addrtype.map((Add) => Add);
  const handleAddrTypeChange = (e, index) => {
    console.log(addrtype[index]);
    // index[e.target.name] = e.target.value;
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/auth/multi-user", inputFields);
      alert("users added");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getBranches();
  }, []);
  return (
    <div>
      {inputFields.map((item, index) => (
        <div key={index} className="lg:grid lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                type="text"
                required
                value={item.username}
                onChange={(e) => handleChangeInput(index, e)}
                placeholder="USERNAME"
                name="username"
              />
            </div>
          </div>
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                type="email"
                required
                value={item.email}
                onChange={(e) => handleChangeInput(index, e)}
                placeholder="EMAIL"
                name="email"
              />
            </div>
          </div>
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                type="text"
                required
                value={item.password}
                onChange={(e) => handleChangeInput(index, e)}
                placeholder="PASSWORD"
                name="password"
              />
            </div>
          </div>
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                type="text"
                required
                value={item.phone}
                onChange={(e) => handleChangeInput(index, e)}
                placeholder="PHONE"
                name="phone"
              />
            </div>
          </div>
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <input
                className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                type="text"
                required
                value={item.phone}
                onChange={(e) => handleChangeInput(index, e)}
                placeholder="PHONE"
                name="phone"
              />
              <select
                name="adminCollegeName"
                onChange={(e) => handleAddrTypeChange(e, index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-4"
              >
                {Add.map((address, key) => (
                  <option value={key}>{address}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="lg:col-span-1 my-2">
            <div className="px-4 sm:px-0">
              <button
                onClick={handleAddFields}
                className="border border-gray-300 bg-violet-700 text-white uppercase font-bold text-sm rounded-lg hover:bg-violet-900 block w-full p-2.5 py-4"
              >
                <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="w-1/4 mx-auto">
        <div className="px-4 sm:px-0">
          <button
            onClick={(e) => handleSubmit(e)}
            className="border border-gray-300 bg-green-500 text-white uppercase font-bold text-sm rounded-lg hover:bg-green-400 block w-full p-2.5 py-4"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiUsers;

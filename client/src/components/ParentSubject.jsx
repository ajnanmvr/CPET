import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../Axios";

function ParentSubject({ setOpenBox }) {
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/parent-subject", { subjectName });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Parent Subject Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-subjects");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  return (
    <div className="absolute top-0  w-full h-screen bg-gray-800">
      <div className="lg:w-1/3 w-full mx-auto">
        <section className="bg-white p-6 mt-4">
          <div className="max-w-screen-xl mx-auto">
            <h3 className="text-2xl font-bold text-violet-700 uppercase my-4">
              Create Parent Subject
            </h3>

            <form className="lg:grid lg:grid-cols-1 lg:gap-8">
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Subject Name
                  </label>
                  <input
                    className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    id="username"
                    type="text"
                    required
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    placeholder="Subject Name "
                    name="parentSubject"
                  />
                </div>
              </div>
            </form>
            <div className="lg:col-span-1 mt-4">
              <div className="px-4 sm:px-0">
                {!loading ? (
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="w-full lg:w-[200px] mx-2 bg-green-500 hover:bg-green-800 text-white font-bold py-4 px-2 rounded focus:outline-none focus:shadow-outline uppercase transition"
                  >
                    Add Subject
                  </button>
                ) : (
                  <h1 className="text-white text-center w-full lg:w-[200px] mx-2 bg-violet-500 hover:bg-violet-500  font-bold py-4 px-2 rounded focus:outline-none focus:shadow-outline uppercase">
                    Processing..
                  </h1>
                )}
                <button
                  onClick={() => setOpenBox(false)}
                  className="w-full lg:w-[200px] mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-2 rounded focus:outline-none focus:shadow-outline uppercase transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ParentSubject;

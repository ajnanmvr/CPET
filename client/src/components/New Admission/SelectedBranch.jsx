import { useState } from "react";
import { useEffect } from "react";
import Axios from "../../Axios";
import { DISTRICT } from "../../Consts";

function SelectedBranch({
  onChange,
  formData,
  nextPage,
  prevPage,
  setFormData,
}) {
  const classes = [
    "plus-one",
    "plus-two",
    "mahdiyya-first-year",
    "mahdiyya-second-year",
    "mahdiyya-third-year",
  ];
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const getAllBranches = async () => {
    try {
      let { data } = await Axios.get(`/branch?district=${selectedBranch}`);
      setBranches(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllBranches();
  }, [selectedBranch]);

  return (
    <section className="bg-white p-6">
      <div className="max-w-screen-sm mx-auto">
        <h3 className="text-4xl font-bold text-blue-900 uppercase my-4">
          Admission SECTION
        </h3>

        <form className="lg:grid grid-cols-1">
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Which class you prefer to enroll ?
            </label>

            {/* <select
              name="class"
              onChange={(e) => onChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option>select </option>
              {classes.map((studentClass, index) => (
                <option key={index} value={studentClass}>{studentClass}</option>
              ))}
            </select> */}
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {classes.map((studentClass, index) => (
                <div
                  className={`px-2  py-2 rounded-lg m-2 text-white cursor-pointer ${
                    formData.class === studentClass
                      ? "bg-green-600"
                      : "bg-gray-800"
                  }`}
                  key={index}
                  onClick={(e) =>
                    setFormData({ ...formData, class: studentClass })
                  }
                >
                  {studentClass}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Which district you prefer for your campus ?
            </label>

            <select
              name="branch"
              onChange={(e) => setSelectedBranch(e.target.value)}
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option>select </option>
              {DISTRICT.map((district, index) => (
                <>
                  {" "}
                  <option key={index} value={district}>
                    {district}
                  </option>
                </>
              ))}
            </select>
          </div>
          <div className="lg:col-span-1">
            <label
              className="block  text-sm my-4 font-bold mb-2"
              htmlFor="username"
            >
              Number of Branches {branches.length}{" "}
            </label>

            <div className="">
              {branches.map((branch, index) => (
                <div
                  className={`px-2  py-2 rounded-lg m-2 text-white cursor-pointer ${
                    formData.branch === branch._id ? "bg-green-600" : "bg-violet-800"
                  }`}
                  key={index}
                  onClick={(e) =>
                    setFormData({ ...formData, branch: branch._id })
                  }
                >
                  {branch.branchName}
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <button
              onClick={prevPage}
              className="w-1/2 mt-3 lg:mt-7 bg-gray-900 mx-2 hover:bg-gray-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
            >
              GO BACK
            </button>
            <button
              onClick={nextPage}
              className="w-1/2 mt-3 lg:mt-7 bg-indigo-900 mx-2 hover:bg-indigo-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
            >
              CONTINUE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SelectedBranch;

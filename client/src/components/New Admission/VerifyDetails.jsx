import { useEffect, useState } from "react";
import Axios from "../../Axios";

function VerifyDetails({ formData, handleSubmit, prevPage }) {
  const [branch, setBranch] = useState("");
  const forms = [
    { lableName: "Student Name", value: formData.studentName },
    { lableName: "Father Name", value: formData.fatherName },
    { lableName: "Mother Name", value: formData.motherName },
    { lableName: "House Name", value: formData.houseName },
    { lableName: "Place", value: formData.place },
    { lableName: "Guardian", value: formData.guardian },
    { lableName: "Aadhar", value: formData.aadhar },
    { lableName: "Phone Number", value: formData.phone },
    { lableName: "DOB", value: formData.dob },
    { lableName: "Post Office", value: formData.postOffice },
    { lableName: "Pin Code", value: formData.pinCode },
    { lableName: "District", value: formData.district },
    { lableName: "State", value: formData.state },
    { lableName: "Selected Class", value: formData.class },
  ];
  const getBranch = async () => {
    let { data } = await Axios.get("/branch/" + formData.branch);
    setBranch(data.branchName);
  };
  useEffect(() => {
    getBranch();
  }, []);
  return (
    <>
      <div className="lg:w-2/4 w-full lg:mx-auto">
        <section className="bg-white p-6">
          <div className="mx-auto">
            <h3 className="text-4xl font-bold text-blue-900 uppercase my-4">
              verify details
            </h3>
            <form className="lg:grid lg:grid-cols-2 lg:gap-8">
              {forms.map((form, key) => (
                <div key={key} className="lg:col-span-1">
                  <div className="px-4 sm:px-0">
                    <label
                      className="block  text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      {form.lableName}
                    </label>
                    <input
                      className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                      type="text"
                      disabled
                      value={form.value}
                    />
                  </div>
                </div>
              ))}
              <div className="lg:col-span-1">
                <div className="px-4 sm:px-0">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Selected Branch
                  </label>
                  <input
                    className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                    type="text"
                    disabled
                    value={branch}
                  />
                </div>
              </div>
            </form>
            <div className="flex">
              <button
                onClick={prevPage}
                className="w-full mt-3 lg:mt-7 bg-gray-900 mx-2 hover:bg-gray-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
              >
                GO BACK
              </button>
              <button
                onClick={handleSubmit}
                className="w-full mt-3 lg:mt-7 bg-sky-900 mx-2 hover:bg-sky-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
              >
                submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default VerifyDetails;

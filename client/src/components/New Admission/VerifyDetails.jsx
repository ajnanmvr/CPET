import { useEffect, useState } from "react";
import Axios from "../../Axios";

function VerifyDetails({
  formData,
  handleSubmit,
  prevPage,
  errors,
  selectedClass,
}) {
  const [branch, setBranch] = useState("");

  const forms = [
    {
      lableName: "Student Name",
      value: formData.studentName,
      error: errors.studentName,
    },
    {
      lableName: "Father Name",
      value: formData.fatherName,
      error: errors.fatherName,
    },
    {
      lableName: "House Name",
      value: formData.houseName,
      error: errors.houseName,
    },
    { lableName: "Place", value: formData.place, error: errors.place },
    { lableName: "Phone Number", value: formData.phone, error: errors.phone },
    {
      lableName: "Post Office",
      value: formData.postOffice,
      error: errors.postOffice,
    },
    { lableName: "Pin Code", value: formData.pinCode, error: errors.pinCode },
    { lableName: "District", value: formData.district, error: errors.district },
    { lableName: "State", value: formData.state, error: errors.state },
    { lableName: "DOB Date", value: formData.dobDate, error: errors.dobDate },
    {
      lableName: "DOB Month",
      value: formData.dobMonth,
      error: errors.dobMonth,
    },
    { lableName: "DOB Year", value: formData.dobYear, error: errors.dobYear },
    {
      lableName: "Selected Class",
      value: selectedClass,
      error: errors.class,
    },
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
                      {form.error && (
                        <div className="text-red-500 text-sm text-center">
                          {form.error}
                        </div>
                      )}
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
                    {errors.branch && (
                      <div className="text-red-500 text-sm text-center">
                        {"Please select a branch"}
                      </div>
                    )}
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

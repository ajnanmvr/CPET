import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { GET_BRANCHES } from "../../queries/branch";
import { BRANCH_STUDENTS } from "../../queries/student";

function AddBranchPayment({ setOpenForm, id, getPayment, amount }) {
  const initialState = {
    amount: null,
    branch: null,
    remarks: null,
    studentCount: null,
  };
  const [branch, setBranch] = useState(null);
  const [formData, setFormData] = useState(initialState);
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const { data, error } = useQuery(GET_BRANCHES);
  const branchStudents = useQuery(BRANCH_STUDENTS, {
    variables: { branchId: branch },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.patch("/payment/" + id, {
        ...formData,
        studentCount: branchStudents?.data?.branchStudents?.length,
      });
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        getPayment();
        setOpenForm(false);
        toast.success("Payment Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.error, {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };
  if (error) return <h1>Something Went Wrong</h1>;

  return (
    <div className="w-2/4 mx-auto">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <form className="lg:grid lg:grid-cols-1 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Payment Amount
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => onChange(e)}
                  placeholder="Payment Amount"
                  name="amount"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Amount To Pay
                </label>
                <span className="text-green-500">
                  {branchStudents?.data?.branchStudents?.length}* {amount}
                </span>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  value={branchStudents?.data?.branchStudents?.length * amount}
                  disabled
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Branch
                </label>
                <select
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  required
                  value={formData.branch}
                  onChange={(e) => {
                    onChange(e);
                    setBranch(e.target.value);
                  }}
                  name="branch"
                >
                  <option>select branch</option>
                  {data?.branches.map((branchItem) => (
                    <option value={branchItem.id} key={branchItem._id}>
                      {branchItem?.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Remarks
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={formData.remarks}
                  onChange={(e) => onChange(e)}
                  placeholder="Remarks"
                  name="remarks"
                />
              </div>
            </div>
          </form>
          <div className="lg:col-span-1 mt-4">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <>
                  {formData.amount && formData.branch &&  (
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="w-full lg:w-[200px] mx-3 bg-teal-500 hover:bg-teal-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
                    >
                      Add Payment
                    </button>
                  )}
                </>
              ) : (
                <h1 className="text-white text-center w-full lg:w-[200px] mx-3 bg-violet-500 hover:bg-violet-500  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                  Processing..
                </h1>
              )}
              <button
                onClick={(e) => setOpenForm(false)}
                className="w-full lg:w-[200px] mx-3 bg-red-500 hover:bg-red-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddBranchPayment;

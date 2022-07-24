import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BRANCH } from "../../queries/branch";
import { useParams } from "react-router-dom";

function ViewBranch() {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_BRANCH, {
    variables: { id },
  });
  console.log(data);
  if (error)
    return (
      <h1 className="text-red-600 font-bold text-3xl text-center">
        Something Went Wrong
      </h1>
    );
  if (loading)
    return (
      <h1 className="text-blue-600 font-bold text-3xl text-center">
        Loading ...
      </h1>
    );
  return (
    <div>
      {/* component */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={data.branch.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl font-bold title-font  mb-1">
                {data.branch.branchName}
              </h1>
              <h2 className="text-sm title-font text-gray-800 font-bold tracking-widest">
                {data.branch.place}
              </h2>
              <h2 className="text-sm title-font text-gray-800 tracking-widest">
                {data.branch.postOffice} (PO)
              </h2>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data.branch.district}
              </h2>
              <p className="leading-relaxed">{data.branch.phone}</p>
              <p className="leading-relaxed">{data.branch.pinCode} (pincode)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewBranch;

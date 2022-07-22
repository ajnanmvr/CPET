import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function PaymentDetails() {
  const { id } = useParams();
  const [paidDetails, setPaidDetails] = useState([]);

  const getDetails = async () => {
    try {
      let { data } = await Axios.get("/payment/paid-details/" + id);
      console.log(data);
      setPaidDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, [id]);
  return (
    <div>
      <h1 className="text-center text-[#0F3D3E] font-bold text-3xl">
        Payment Details Page
      </h1>
      <div className="bg-gray-700 w-2/4 text-center mx-auto text-white my-4 py-4">
        Payment Name
      </div>
      <div className="bg-gray-700 w-2/4 text-center mx-auto text-white my-4 py-4">
        ₹ 1000
      </div>

      <div className="w-3/4 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Branch Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Amount Paid
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Payment ID
                      </th>
                   
                    </tr>
                  </thead>
                  <tbody className="bg-bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {paidDetails.map((paid, index) => (
                      <tr key={index} className=" ">
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {paid.branch?.branchName}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap">
                          ₹ {paid.amount}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {paid.status}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {paid.razorpayOrderId}
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap">
                          {paid.razorpayPaymentId}
                        </td>
              
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;

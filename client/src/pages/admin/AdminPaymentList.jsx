import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { Link } from "react-router-dom";

function AdminPaymentList() {
  const [payments, setPayments] = useState([]);
  const getAllPayments = async () => {
    try {
      let { data } = await Axios.get("/payment");
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPayments();
  }, []);
  return (
    <>
      <h1 className="text-center text-gray-900 font-bold text-3xl my-4">
        Payment Page
      </h1>
      <section className="bg-white py-20 lg:py-[120px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                      >
                        PAYMENT NAME
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                      >
                        AMOUNT
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                      >
                        DEADLINE
                      </th>
                      <th
                        scope="col"
                        className="text-lg font-bold text-gray-900 px-6 py-4 text-left"
                      >
                        DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr className="border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 uppercase">
                          {payment.paymentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                          ₹{payment.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                          {moment(payment.deadLine).format("MMM Do YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                          <Link
                            to={`/admin-payment-details/${payment._id}`}
                            className="bg-gray-900 text-white px-5 py-2 rounded-lg"
                          >
                            view
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AdminPaymentList;

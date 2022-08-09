import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";

function MyPayments() {
  const { id } = useParams();

  const [payment, setPayment] = useState([]);

  const getPayment = async () => {
    try {
      let { data } = await Axios.post("/payment/my-payments");
      setPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayment();
  }, [id]);
  return (
    <div>
      <h1 className="text-center text-gray-800 font-bold my-6 text-3xl">
        My Payments
      </h1>

      <div className="w-full mx-4">
        <div className="flex flex-col">
          <div className="overflow-x-auto shadow-md">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Payment Name
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Amount To Pay
                      </th>{" "}
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Amount Paid
                      </th>{" "}
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Pending Amount
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Remarks
                      </th>
                      <th
                        scope="col"
                        className="py-3 px-6 text-xs  tracking-wider text-left text-white font-bold uppercase"
                      >
                        Paid At
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="bg-bg-gray-800 divide-y divide-gray-200 dark:divide-[#66BFBF]">
                    {payment?.map((paid, index) => (
                      <tr key={index} className=" ">
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="py-4 px-6 uppercase text-sm  text-gray-900 whitespace-nowrap">
                          {paid.paymentName}
                        </td>
                        <td className="py-4 px-6 font-semibold text-center  text-gray-500 whitespace-nowrap">
                          {paid?.amount}*{paid?.paidBranches[0]?.studentCount} ={" "}
                          {"  "}
                          <span className="text-gray-800">
                            ₹
                            {paid?.amount * paid?.paidBranches[0]?.studentCount}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-center  text-green-500 whitespace-nowrap">
                          {paid?.amount}
                        </td>
                        <td className="py-4 px-6 font-semibold text-center  text-red-500 whitespace-nowrap">
                          {paid.amount * paid?.paidBranches[0]?.studentCount -
                            paid.amount}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          {paid?.paidBranches[0]?.remarks}
                        </td>
                        <td className="py-4 px-6 text-sm  text-gray-900 whitespace-nowrap">
                          <p className="font-bold">
                            {moment(paid.time).format("DD/ MM/ YYYY")}
                          </p>
                          <p>{moment(paid.time).format("hh:mm a")}</p>
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

export default MyPayments;

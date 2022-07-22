import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import { useContext } from "react";
import { UserAuthContext } from "../../context/user";

function AdminPayDetails() {
  const params = useParams();
  const [payment, setPayment] = useState({});
  const { authData } = useContext(UserAuthContext);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await Axios.post("/payment/create-orderId", {
      amount: payment.amount,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    const { amount, id, currency } = result.data;

    const options = {
      key: "rzp_test_bHrsVB132Fbm8O", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "CPET Mahdiyya Course",
      description: "Test Transaction",
      image: "",
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          paymentId: params.id,
          branch: authData.branch,
        };

        await Axios.post("/payment/success", data);

        alert("Payment Success");
      },
      prefill: {
        name: "CPET Mahdiyya Course",
        email: "cpet@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "CPET Mahdiyya Course",
      },
      theme: {
        color: "#0F3D3E",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const getPayment = async () => {
    try {
      let { data } = await Axios.get(`/payment/${params.id}`);
      setPayment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayment();
  }, [params.id]);
  return (
    <div className="w-full">
      <button
        onClick={() => displayRazorpay()}
        className="bg-teal-600 py-3 px-5  text-white ml-auto flex justify-end m-4 rounded-xl hover:border-teal-600 border-2 font-bold border-teal-600 hover:bg-white hover:text-teal-600 transition"
      >
        Pay Now
      </button>
      <h1 className="text-center font-bold text-blue-800 uppercase my-4 text-4xl">
        {payment.paymentName}
      </h1>
      <h1 className="text-center font-bold text-red-800 uppercase my-4 text-4xl">
        ₹{payment.amount}
      </h1>
    </div>
  );
}

export default AdminPayDetails;

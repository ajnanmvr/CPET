const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

const options = {
  amount: 50000, // amount in the smallest currency unit
  currency: "INR",
  receipt: "order_rcptid_11",
};
instance.orders.create(options, function (err, order) {
  console.log(order);
});

instance.payments
  .all({ from: "2022-07-14", to: "2022-07-15" })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

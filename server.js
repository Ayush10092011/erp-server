const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_SECRET"
});

/* CREATE ORDER */
app.post("/create-order", async (req, res) => {

  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "rcpt_" + Date.now()
  });

  res.json(order);
});

/* VERIFY */
app.post("/verify", (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", "YOUR_SECRET")
    .update(body)
    .digest("hex");

  if(expected === razorpay_signature){
    res.json({status:"success"});
  } else {
    res.json({status:"failed"});
  }
});

app.listen(5000, () => console.log("Server running on 5000"));
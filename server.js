const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔐 Razorpay Setup (IMPORTANT: ENV use karo best)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_SnDCqpEQ5IGIey",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "uRJWyG0wbISLOC1RlcpiOhVF"
});


app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});

// 💰 Create Order
app.post("/create-order", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount) {
      return res.status(400).json({ error: "Amount missing" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    console.log("ORDER:", order);

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

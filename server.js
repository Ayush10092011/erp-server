

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= RAZORPAY ================= */

const razorpay = new Razorpay({

  key_id: "rzp_test_SmTfPj9yIFpPbe",

  key_secret:"7ArJ40UMBzobsgcTewE8lORn"

});

/* ================= PORT ================= */

const PORT = process.env.PORT || 5000;

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {

  res.send("🎓 ERP Backend Running Successfully");

});

/* ================= CREATE ORDER ================= */

app.post("/create-order", async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: Number(amount) * 100,

      currency: "INR",

      receipt: "school_fee_receipt"

    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {

    console.log("Create Order Error:", err);

    res.status(500).json({

      error: "Order creation failed"

    });

  }

});

/* ================= VERIFY PAYMENT ================= */

app.post("/verify", async (req, res) => {

  try {

    const {

      razorpay_payment_id,

      razorpay_order_id,

      razorpay_signature

    } = req.body;

    if (

      razorpay_payment_id &&

      razorpay_order_id &&

      razorpay_signature

    ) {

      res.json({

        status: "success",

        paymentId: razorpay_payment_id

      });

    } else {

      res.status(400).json({

        status: "failed"

      });

    }

  } catch (err) {

    console.log("Verify Error:", err);

    res.status(500).json({

      status: "failed"

    });

  }

});

/* ================= PAYMENT SUCCESS ================= */

app.post("/payment-success", (req, res) => {

  console.log("Payment Success:", req.body);

  res.json({

    success: true,

    message: "🎉 Fee Paid Successfully"

  });

});

/* ================= START SERVER ================= */

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});

 const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* RAZORPAY */

const razorpay = new Razorpay({

  key_id: "rzp_test_SmsJ4PXCHswizw",

  key_secret: "YAHAN_APNA_SECRET_DALO"

});

/* TEST */

app.get("/", (req,res)=>{

  res.send("Backend Running Successfully 🚀");

});

/* CREATE ORDER */

app.post("/create-order", async (req,res)=>{

  try{

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt: "receipt_order"

    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  }catch(err){

    console.log(err);

    res.status(500).json({

      error: err.message

    });

  }

});

/* START SERVER */

app.listen(PORT, ()=>{

  console.log("Server Started");

});

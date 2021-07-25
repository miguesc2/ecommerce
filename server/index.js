require('dotenv').config()

const express = require("express");
const Stripe = require("stripe")
const cors = require("cors")

const stripe = new Stripe(process.env.REACT_APP_PRIVATE_KEY)
const app = express()

app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

app.post("/api/checkout", async (request, response) => {
  console.log(request.body)
  const { id, amount } = request.body

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",   
      description: "Basket of products",
      payment_method: id,
      confirm: true,
      setup_future_usage: 'off_session',
    })
    console.log(payment)
    return response.status(200).json({ message: "Pago Exitoso" })
  }
  catch(error) {
    return response.json({ message: error.raw.message })
  }
})

app.listen(3001, () => {
  console.log("Server listening port", 3001)
})
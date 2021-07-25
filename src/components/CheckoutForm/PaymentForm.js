import { Button, Divider, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import Review from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import accounting from 'accounting'
import axios from 'axios'
import { useStateValue } from '../../contextApi/StateProvider'
import { actionTypes, getBasketTotal } from '../../contextApi/reducer'
import { CircularProgress } from '@material-ui/core'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY)

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      iconColor: "rgb(240, 57, 122)",
      color: "#333",
      fontSize: "18px",
      "::placeholder": {
        color: "#ccc"
      },
    },
    invalid: {
      color: "e5424d",
      ":focus" : {
        color: "#303238",
      },
    },
  },
};

const CheckoutForm = ({backStep, nextStep}) => {
  const [loading, setLoading] = useState(false)
  const [{ basket }, dispatch] = useStateValue()
  const stripe = useStripe()
  const elements = useElements()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) 
    })

    setLoading(true)
    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout", 
          { 
            id,
            amount: getBasketTotal(basket) * 100,
          }
        )

        dispatch({
          type: actionTypes.SET_PAYMENT_MESSAGE,
          paymentMessage: data.message,
        })
        if (data.message === "Pago Exitoso") {
          dispatch({
            type: actionTypes.EMPTY_BASKET,
            basket: [],
          })
        }

        nextStep()
      } 
      catch(error) { 
        console.log(error) 

        nextStep()
      }
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
        <Button variant="outlined" onClick={backStep}>Back</Button>
        <Button disabled={!stripe} type="submit" variant="contained" color="primary">
          {loading ? (<CircularProgress />) : (`Pay ${accounting.formatMoney(getBasketTotal(basket), "€")}`)}
        </Button>
      </div>
    </form>
  )
}

const PaymentForm = ({backStep, nextStep}) => {
  return (
    <Fragment>
      <Review />
      <Divider />
      <Typography variant='h6' gutterBottom style={{margin: "20px 0"}}>Payment Method</Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep} />
      </Elements>
    </Fragment>
  )
}

export default PaymentForm

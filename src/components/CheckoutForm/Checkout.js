import { Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useStateValue } from '../../contextApi/StateProvider'
import AddressForm from './AddressForm'
import Confirmation from './Confirmation'
import PaymentForm from './PaymentForm'
import useStyles from './styles'

const Checkout = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const steps = ["Shipping address", "Payment details"]
  const [{ paymentMessage }] = useStateValue()

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const Form = () => activeStep === 0 ? <AddressForm nextStep={nextStep} /> : <PaymentForm backStep={backStep} nextStep={nextStep} />

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(step => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {
          activeStep === steps.length ? (<Confirmation message={paymentMessage} />) : (<Form />)
        }
      </Paper>
    </main>
  )
}

export default Checkout
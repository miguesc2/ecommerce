import React, { Fragment } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Button, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AddressInput from './AddressInput'
import { useStateValue } from '../../contextApi/StateProvider'
import { actionTypes } from '../../contextApi/reducer'

const AddressForm = ({nextStep}) => {
  const methods = useForm()
  const [, dispatch] = useStateValue()

  return (
    <Fragment>
      <Typography varian='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => {
          dispatch({
            type: actionTypes.SET_SHIPPINGDATA,
            shippingData: data,
          })
          nextStep()
        })}>
          <Grid container spacing={3}>
            <AddressInput required name="firstname" label="FirstName" type="text" />
            <AddressInput required name="lastName" label="last name" type="text"/>
            <AddressInput required name="address1" label="Address" type="text" />
            <AddressInput required name="email" label="Email address" type="email" />
            <AddressInput required name="city" label="City" type="text" />
            <AddressInput required name="postCode" label="Post Code" type="number" />
          </Grid>
          <div style={{display: "flex", justifyContent: "space-between", marginTop: "1rem"}}>
            <Button component={Link} to="/checkout-page">Back to the Checkout Page</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default AddressForm

import { Button, Divider, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Confirmation = ({ message }) => {
  return (
    <Fragment>
      <Typography variant='h6'>{ message }</Typography>
      <Divider />
      <Typography variant='subtitle2' gutterBottom>
        {message === "Pago Exitoso" ? "Your booking reference is: " : "" }
      </Typography>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home Page
      </Button>
    </Fragment>
  )
}

export default Confirmation

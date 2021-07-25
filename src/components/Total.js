import React from 'react'
import accounting from 'accounting';
import { Button, makeStyles } from '@material-ui/core';
import { getBasketTotal } from '../contextApi/reducer';
import { useStateValue } from '../contextApi/StateProvider';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "20vh",
  },
  link1: {
    textDecoration: 'none',
  },
  button: {
    marginTop: "2rem",
  }
}))

const Total = () => {
  const classes = useStyles()
  const [{ basket }] = useStateValue();

  return (
    <div className={classes.root}>
      <h5>Total items: { basket.length }</h5>
      <h5>{accounting.formatMoney(getBasketTotal(basket), "€")}</h5>
      <Link to="checkout" className={classes.link1}>
        <Button className={classes.button} variant="contained" color="secondary">Check out</Button>
      </Link>
    </div>
  )
}

export default Total;
import { List, ListItemText, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useStateValue } from '../../contextApi/StateProvider'
import { getBasketTotal } from '../../contextApi/reducer'
import accounting from 'accounting'
import { ListItem } from '@material-ui/core'

const Review = () => {
  const [{ basket }] = useStateValue()
  return (
    <Fragment>
      <Typography varian='h6' gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {
          basket.map(product => (
            <ListItem key={product.name}>
              <ListItemText primary={product.name} secondary={`Cantidad: ${1}`} />
              <Typography varian='body2'>
                {accounting.formatMoney(product.price, "€")}
              </Typography>
            </ListItem>
          ))
        }
        <ListItemText primary="Total" />
        <Typography variant="subtitle1">
          {accounting.formatMoney(getBasketTotal(basket), "€")}
        </Typography>
      </List>
    </Fragment>
  )
}

export default Review

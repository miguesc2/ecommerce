import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../contextApi/StateProvider';
import { auth } from '../firebase';
import { actionTypes } from '../contextApi/reducer';
import '../assets/Navbar.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appbar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1,
    textAlign: "right",
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  image: {
    marginRight: "10px",
    height: "1rem",
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(user)
  const history = useHistory()
  const handleAuth = () => {
    if (user) {
      auth.signOut()
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [],
      })
      history.push("/")
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
      history.push("/")
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <img src="https://i.ibb.co/4t9FdDW/cuttevents.png" alt="imgNavbar" height="25px" className={ classes.image } />
            </IconButton>
          </Link>

          <div className={ classes.grow } />
          
          <Typography className="d__None" variant="h6" color="textPrimary" component="p">
            Hello {user ? user.email : "Guest"}
          </Typography>
          <div className={ classes.button }>
            <Link to="signin">
              <Button variant="outlined" onClick={handleAuth}>
                <strong>{user ? "Sign Out" : "Sign In"}</strong>
              </Button>
            </Link>
            <Link to="/checkout-page">
              <IconButton aria-label="show cart items" color="inherit">
                <Badge badgeContent={basket.length} color="secondary">
                  <ShoppingCart fontSize="large" color="primary" />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
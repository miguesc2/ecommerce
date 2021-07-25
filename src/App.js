import React, { useEffect } from 'react'
import Navbar from './components/Navbar';
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { auth } from './firebase';
import { actionTypes } from './contextApi/reducer';
import { useStateValue } from './contextApi/StateProvider';
import Checkout from './components/CheckoutForm/Checkout';

function App() {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    })
  },[])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ Products } />
          <Route exact path="/checkout-page" component={ CheckoutPage } />
          <Route exact path="/signin" component={ SignIn } />
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route exact path="/signup" component={ SignUp } />
          <Route exact path="/signup" component={ SignUp } />
          
          <Route exact path="/ecommerce" component={ Products } />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

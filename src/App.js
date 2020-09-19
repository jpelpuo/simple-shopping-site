import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/Main/Home';
import ViewProductPage from './pages/Main/ViewProduct';
import AuthContext from './context/auth-context';
import ProductContext from './context/product-context';

function App() {
  const existingToken = localStorage.getItem('authToken') || null;
  const existingEmail = localStorage.getItem('authEmail') || null;
  const [token, setToken] = useState(existingToken);
  const [userEmail, setUserEmail] = useState(existingEmail);
  const [cartItems, setCartItems] = useState([]);

  const login = (token, userEmail) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authEmail', userEmail);
    setUserEmail(userEmail);
    setToken(token);
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authEmail');

    const userInfo = JSON.parse(localStorage.getItem(userEmail));
    userInfo.cartItems = [];
    localStorage.setItem(userEmail, JSON.stringify(userInfo));

    setToken(null);
    setUserEmail(null);
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(userEmail));
    if (userInfo) {
      setCartItems([...userInfo.cartItems])
    }
    
    if (!token) {
      const cartInfo = JSON.parse(sessionStorage.getItem("cartItems"));

      setCartItems([...cartInfo.cartItems]);
    }
  }, [token]);

  const addToCart = productId => {
    setCartItems([productId, ...cartItems]);
  }

  useEffect(() => {
    if (!token) {
      const dataToSave = JSON.stringify({
        cartItems: [...cartItems]
      });

      sessionStorage.setItem("cartItems", dataToSave);
      return;
    }

    const userInfo = JSON.parse(localStorage.getItem(userEmail));
    userInfo.cartItems = [...cartItems];
    localStorage.setItem(userEmail, JSON.stringify(userInfo));
  }, [cartItems]);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token: token,
            logout: logout,
            login: login
          }}>
          <ProductContext.Provider
            value={{
              addToCart: addToCart,
              cartItems: cartItems
            }}>
            <Switch>
              {
                token && <Redirect to="/home" />
              }
              <Redirect path="/" to="/home" exact />
              <Route exact path="/auth" component={AuthPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/home" render={props => (
                <MainLayout>
                  <HomePage {...props} />
                </MainLayout>
              )} />
              <Route exact path="/product/:productId" render={props => (
                <MainLayout>
                  <ViewProductPage {...props} />
                </MainLayout>
              )} />
            </Switch>
          </ProductContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

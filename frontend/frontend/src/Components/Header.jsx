import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Make sure to create a CSS file for styling
import { Button } from 'bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);
  const [cartDetails, setCartDetails] = useState([]);

   useEffect(() => {
        const carts = JSON.parse(localStorage.getItem("carts")) || [];
        setCartCount(carts.length); // Update the cart count based on the number of carts
    }, []);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!isLoggedIn) return; // Only fetch if logged in
      try {
        const response = await axios.get("http://localhost:3002/api/cart", { 
          withCredentials: true 
        });
        setCartDetails(response.data);
        setCartCount(response.data.length);
      } catch (error) {
        console.error("Error fetching cart details", error);
      }
    };

    fetchCartDetails();
  }, [isLoggedIn]);

  

   /* useEffect(() => {
        const verifyCookie = async () => {
          if (!cookies.token) {
            setUsername('');
            return;
          }
          try {
            const { data } = await axios.post(
              'http://localhost:3002/verify-cookie',
              {},
              { withCredentials: true }
            );
            const { status, user } = data;
            if (status) {
              setUsername(user);
            } else {
              removeCookie('token');
              setUsername('');
            }
          } catch (error) {
            console.error('Network Error', error);
            removeCookie('token');
            setUsername('');
          }
        };
        verifyCookie();
      }, [cookies, removeCookie]);*/

      const handleLogout = () => {
       // removeCookie('token');
        //setUsername('');
        logout();
        navigate('/login');
      };

      
    return (
        <header className="header fixed-header">
            <div className="header__left">
                <h1>CanTeenz</h1>
            </div>

            <nav className="header__nav">
               {/* <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/orders">Orders</Link>*/}
                <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active-link' : ''}
    >
        Home
    </NavLink>
    <NavLink 
        to="/about" 
        className={({ isActive }) => isActive ? 'active-link' : ''}
    >
        About
    </NavLink>
    <NavLink 
        to="/orders" 
        className={({ isActive }) => isActive ? 'active-link' : ''}
    >
        Orders
    </NavLink>
              {/*  <Link to="/contact">Contact</Link> */}
            </nav>
            
            <div className="header__right">
            {isLoggedIn && (
            <div className="cart-icon-header">
                    <i className="fas fa-cart-plus cart-icon-header "></i>
                    <span className="cart-count">({cartCount})</span>
                        <div className="cart-dropdown">
                            {cartDetails.length > 0 ? (
                                cartDetails.map((cart, index) => (
                                    <div key={cart.orderId} className="cart-item">
                                        <h4>Cart {index + 1}</h4>
                                        <p>Order ID: {cart.orderId}</p>
                                        <p>Canteen: {cart.canteenName}</p>
                                        <p>Items: {cart.items.length}</p>
                                        <p>Subtotal: Rs.{cart.subtotal}.00</p>
                                        <Link to="/cart" className="view-cart-btn">View Cart</Link>
                                        <button className="checkout-btn">Proceed to Checkout</button>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-cart">Your cart is empty.</p>
                            )}
                        </div>
                </div>
                )}
                {isLoggedIn ? (
                    <div className="user-menu">
                        <i className="fas fa-user user-icon fa-2x" ></i>
                        <span className="user-name">Hi, {user || "Guest"}</span>
                        <div className="user-menu__dropdown">
                         <span>Welcome {user || "Guest"}!</span>  
                         <hr></hr>
                            <Link to="/profile">Profile</Link> 
                         <Link to="/myfavorites">My Favorites</Link> 
                          <Link to="/myorder">My Orders</Link> 
                          <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btnNav">Login</Link>
                        <Link to="/signup" className="btnNav">Signup</Link>
                    </>
                )}
            </div>
        </header>
        
    );
};

export default Header;
/*import React from "react";

const CartPage = () => {
  return (
    <div>
      <h1>Hi Cart</h1>
    </div>
  );
};

export default CartPage;
*/

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./viewCart.css";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import cake from "../Assets/cake.jpeg"; // Default image
import { useNavigate } from "react-router-dom";


const ViewCart = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [expandedCart, setExpandedCart] = useState(null);
  const [showPayOnline, setShowPayOnline] = useState(false);

  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);

   // Load PayHere script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //Payhere payment handler
  const handleOnlinePayment = async (cart, cartIndex) => {
    // Prepare data for hash
  const paymentData = {
    merchant_id: "1230192", // Use your merchant_id
    order_id: cart.order_id|| cart.order_id || Math.random().toString(36).substr(2, 9),
    amount: cart.subtotal.toFixed(2),
    currency: "LKR",
  };

  // Get hash from backend
  let hash = "";
  try {
    const response = await axios.post("http://localhost:3002/api/payhere/hash", paymentData);
    hash = response.data.hash;
  } catch (err) {
    alert("Failed to get payment hash");
    return;
  }

    const payment = {
      ...paymentData,
      sandbox: true,
      merchant_id: "1230192",
      return_url: "http://localhost:3000/return",
      cancel_url: "http://localhost:3000/cancel",
      notify_url: "http://localhost:5000/api/payments/notify",
      items: cart.canteenName || `Cart ${cartIndex + 1}`,
      first_name: user?.firstName || "User",
      last_name: user?.lastName || "",
      email: user?.email || "user@example.com",
      phone: user?.phone || "0771234567",
      address: user?.address || "123, Main Street",
      city: user?.city || "Colombo",
      country: user?.country || "Sri Lanka",
      image_url: cart.items[0]?.image
        ? `https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${cart.items[0].image}`
        : undefined, // Use first item's image or undefined
        hash,
    };

    window.payhere.startPayment(payment);

    window.payhere.onCompleted = (orderId) => {
      alert("Payment completed. Order ID: " + orderId);
    };
    window.payhere.onDismissed = () => {
      alert("Payment dismissed");
    };
    window.payhere.onError = (error) => {
      alert("Payment error: " + error);
    };
  };

  useEffect(() => {
    // Fetch cart details from localStorage or API
    const fetchCartDetails = async () => {
      if (!isLoggedIn) return;

      // First try to get from localStorage (set in Header component)
      const storedCartDetails = JSON.parse(localStorage.getItem("cartDetails"));

      if (storedCartDetails && storedCartDetails.length > 0) {
        setCartDetails(storedCartDetails);
      } else {
        // If not in localStorage, fetch from API
        try {
          const response = await axios.get("http://localhost:3002/api/cart", {
            withCredentials: true,
          });
          setCartDetails(response.data);
        } catch (error) {
          console.error("Error fetching cart details", error);
        }
      }
    };

    fetchCartDetails();
  }, [isLoggedIn]);

  // Function to toggle expanded cart
  const toggleExpandCart = (index) => {
    if (expandedCart === index) {
      setExpandedCart(null);
    } else {
      setExpandedCart(index);
    }
  };

  // Function to update quantity
  const updateQuantity = async (cartIndex, itemIndex, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Create a deep copy of cartDetails
      const updatedCartDetails = JSON.parse(JSON.stringify(cartDetails));
      updatedCartDetails[cartIndex].items[itemIndex].quantity = newQuantity;

      // Update subtotal for this cart
      updatedCartDetails[cartIndex].subtotal = updatedCartDetails[
        cartIndex
      ].items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      setCartDetails(updatedCartDetails);

      // Update localStorage
      localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));

      // You might want to also update on the server
      // await axios.put(...);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Function to delete item
  const deleteItem = async (cartIndex, itemIndex) => {
    try {
      // Create a deep copy of cartDetails
      const updatedCartDetails = JSON.parse(JSON.stringify(cartDetails));

      // Remove the item
      updatedCartDetails[cartIndex].items.splice(itemIndex, 1);

      // Update subtotal for this cart
      updatedCartDetails[cartIndex].subtotal = updatedCartDetails[
        cartIndex
      ].items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // If no items left in this cart, remove the entire cart
      if (updatedCartDetails[cartIndex].items.length === 0) {
        updatedCartDetails.splice(cartIndex, 1);
      }

      setCartDetails(updatedCartDetails);

      // Update localStorage
      localStorage.setItem("cartDetails", JSON.stringify(updatedCartDetails));

      // You might want to also update on the server
      // await axios.delete(...);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Calculate total across all carts
  const totalAmount = cartDetails.reduce(
    (total, cart) => total + cart.subtotal,
    0
  );


  const handleCashPayment = () => {
    if (cartDetails.length > 0) {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const currentDate = new Date().toISOString(); // ISO for later formatting

      const newOrders = cartDetails.map((cart) => ({
        orderId: cart.orderId || Math.random().toString(36).substr(2, 9),
        canteenName: cart.canteenName || "Unknown Canteen",
        orderedDate: currentDate,
        price: cart.subtotal,
        status: "processing",
      }));

      localStorage.setItem(
        "orders",
        JSON.stringify([...storedOrders, ...newOrders])
      );

      navigate("/myorder");
    }
  };

  return (
    <div className="cart-container-viewCart">
      {/* Left side - Cart Table */}
      <div className="cart-items">
        <h2>Your Shopping Cart</h2>

        {cartDetails.length > 0 ? (
          <>
            {cartDetails.map((cart, cartIndex) => (
              <React.Fragment key={cart.orderId || cartIndex} className="cart-section">
                <div
                  className="cart-header"
                  onClick={() => toggleExpandCart(cartIndex)}
                >
                  <h4>
                    Cart {cartIndex + 1} :{" "}
                    {cart.canteenName || "Unknown Canteen"}
                  </h4>

                  {/*  <h4>Cart from {cart.canteenName || "Unknown Canteen"}</h4> */}
                  <div className="cart-summary-mini">
                    <span>Order ID: {cart.orderId}</span> /
                    <span>Items: {cart.items.length}</span> /
                    <span>Total: Rs.{cart.subtotal}.00</span>
                  </div>
                </div>

                {expandedCart === cartIndex && (
                  <table>
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Food Item</th>
                        {/* <th>Image</th> */}
                        <th>Quantity</th>
                        <th>Unit Price (Rs.)</th>
                        <th>Total Price (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items &&
                        cart.items.map((item, itemIndex) => (
                          <tr key={item._id || itemIndex}>
                            <td>
                              <FaTrash
                                className="delete-icon"
                                onClick={() => deleteItem(cartIndex, itemIndex)}
                              />
                            </td>
                            <td>{item.name}</td>
                            {/*   <td> <img
                              src={
                                item.image
                                  ? `https://ucfpbbcfacgrehcoscar.supabase.co/storage/v1/object/public/canteenz/${item.image}`
                                  : cake
                              }
                              alt={item.name || "Food item"}
                              className="cart-image"
                            /> </td> */}
                            {/* <td>
                            {item.image && (
                              <img src={item.image} alt={item.name} className="cart-image" />
                            )}
                          </td>*/}
                            <td>
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  updateQuantity(
                                    cartIndex,
                                    itemIndex,
                                    (item.quantity || 1) - 1
                                  )
                                }
                              >
                                <FaMinus />
                              </button>
                              <span className="quantity">
                                {item.quantity || 1}
                              </span>
                              <button
                                className="quantity-btn"
                                onClick={() =>
                                  updateQuantity(
                                    cartIndex,
                                    itemIndex,
                                    (item.quantity || 1) + 1
                                  )
                                }
                              >
                                <FaPlus />
                              </button>
                            </td>
                            <td>Rs. {(item.price || 0).toLocaleString()}</td>
                            <td>
                              Rs.{" "}
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </React.Fragment>
            ))}
          </>
        ) : (
          <p className="empty-cart">Your cart is empty.</p>
        )}
      </div>

      {/* Right side - Cart Total */}
      <div className="cart-summary">
        <h3>Cart Total</h3>
        {cartDetails.map((cart, cartIndex) => (
          <>
            <div key={cartIndex} className="subtotal">
              <span className="cart-no">
                {" "}
                <b>Cart {cartIndex + 1}:</b>
              </span>
              <span className="cart-total">Total: Rs.{cart.subtotal}.00</span>
              {/*  <span>Subtotal:</span>
          <span>Rs. {totalAmount.toLocaleString()}</span>  */}
            </div>
            {/* <button
          className="checkout-btn-viewCart"
          disabled={cartDetails.length === 0}
        >
          Proceed to Checkout
        </button> */}

            <div className="checkout-options">
              <button
                className="checkout-btn-viewCart online"
                disabled={cartDetails.length === 0}
                onClick={() => handleOnlinePayment(cart, cartIndex)}
              >
                Pay Online
              </button>
              
              <button
                className="checkout-btn-viewCart cash"
                disabled={cartDetails.length === 0}
                onClick={handleCashPayment}
              >
                Pay by Cash
              </button>
            </div>

            <hr></hr>
          </>
        ))}
      </div>
    </div>
  );
};

export default ViewCart;

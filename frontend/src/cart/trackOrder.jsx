import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./trackOrder.css"; // Create this for styling

const TrackOrder = () => {
  const { user } = useContext(AuthContext); // Assumes user info is available here
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Filter orders relevant to this user
    const userOrders = storedOrders.filter((order) => order.userId === user?.id); // Optional if using userId
    setOrders(userOrders.length > 0 ? userOrders : storedOrders); // fallback if no userId filter
  }, [user]);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getStatusDot = (status) => {
    const colors = {
      processing: "#FFA500",
      completed: "#4CAF50",
      collected: "#2196F3",
    };
    return (
      <span className="status-indicator">
        <span className="dot" style={{ backgroundColor: colors[status] || "gray" }}></span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="track-order-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Canteen Name</th>
              <th>Ordered Date</th>
             {/* <th>Total price(Rs.)</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.orderId}</td>
                <td>{order.canteenName}</td>
                <td>{formatDate(order.orderedDate)}</td>
               {/* <td>{order.price}</td> */}
                <td>{getStatusDot(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrackOrder;

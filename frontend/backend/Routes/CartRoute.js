const express = require("express");
const router = express.Router();
const Cart = require("../Models/CartModel");
const jwt = require("jsonwebtoken");

// Middleware to verify token and get user ID
const getUserIdFromToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Add items to cart
router.post("/api/cart", getUserIdFromToken, async (req, res) => {
  const { orderId, canteenName, items } = req.body;
  const userId = req.userId;

  try {
    let cart = await Cart.findOne({ orderId, userId });

    if (cart) {
      // Update existing cart
      cart.items = [...cart.items, ...items];
      cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    } else {
      // Create a new cart
      cart = new Cart({
        userId,
        orderId,
        canteenName,
        items,
        subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to save cart" });
  }
});

// Get all carts
router.get("/api/cart", getUserIdFromToken, async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.userId });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch carts" });
  }
});



module.exports = router;
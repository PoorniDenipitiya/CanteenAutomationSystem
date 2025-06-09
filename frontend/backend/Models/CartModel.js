const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  orderId: { type: String, required: true },
  canteenName: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: { type: Number, required: true },
});

module.exports = mongoose.model("Cart", cartSchema);
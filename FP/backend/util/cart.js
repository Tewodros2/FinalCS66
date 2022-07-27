const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    total: { type: Number },
    products: { type: Array, default: [] },
    status: { type: String, default: 'CART' } // CART | CHECKOUT | PAID
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;

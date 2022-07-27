const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' }
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model("Checkout", CheckoutSchema);
module.exports = Checkout;

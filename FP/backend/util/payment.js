const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    userId: { type: String, required: true },
    cartId: { type: String, required: true }, // cart/checkout id
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, default: 'UNPAID' } // UNPAID, PAID, PENDING, CANCELLED
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;

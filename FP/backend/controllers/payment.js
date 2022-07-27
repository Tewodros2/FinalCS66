const { ObjectID } = require("bson");
const { Client, Environment, ApiError } = require("square");

const PaymentSchema = require("../util/payment");

async function makePayment(amount, userId) {
  const client = new Client({
    accessToken:
      "EAAAEFPt-Z_iU417cSyEUbrUkW5hLX-t4ZDKmcUs-j1Np7-n1cLQGyOkkjxoSEbz", // process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
  });

  try {
    const response = await client.paymentsApi.createPayment({
      sourceId: "cnon:card-nonce-ok",
      idempotencyKey: "8a8d1ac6-0c04-47f6-b0ee-0f13917e9d8f",
      amountMoney: {
        amount: amount,
        currency: "USD",
      },
    });

    console.log(response.result);
    return response.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

exports.getAllPayments = async (req, res, next) => {
  try {
    const result = await PaymentSchema.find({});
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    next({ statusCode: 500, message: err });
  }
};

exports.getPaymentBuyerId = async (req, res, next) => {
  console.log(req.params.buyerId);
  try {
    const buyerId = new ObjectID(req.params.buyerId);
    const result = await PaymentSchema.find({ buyerId });
    if (!result) return next({ statusCode: 400, message: "Payment not found" });
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const payment = {
      userId: req.user.id,
      amount: req.body.amount,
      cartId: req.body.cartId,
      paymentMethod: req.body.paymentMethod,
      status: "PAID",
    };

    const response = await makePayment(req.body.amount, req.user.id);

    // Update Square status
    payment.status = response.payment.status;
    console.log(payment);
    const newPayment = new PaymentSchema(payment);
    const result = await newPayment.save(payment);

    //

    return res.status(201).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    console.log(req.body);
    const { paymentId, buyerId } = req.body;
    const found = await PaymentSchema.findById(new ObjectID(paymentId));
    if (found) {
      await PaymentSchema.findByIdAndUpdate(new ObjectID(paymentId), {
        adopted: true,
      });
      await req.db.updateOne(
        { _id: new ObjectID(buyerId) },
        {
          $set: {
            adopted: true,
          },
        }
      );
      return res.status(201).json({ success: true, payload: {} });
    }
    return res
      .status(404)
      .json({ success: false, message: "Payment not found" });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

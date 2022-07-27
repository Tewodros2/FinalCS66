const express = require("express");
const router = express.Router();
const paymentControllers = require("../controllers/payment");
const userControllers = require("../controllers/user");

router.use(userControllers.authorize);

router.get("/", paymentControllers.getAllPayments);
router.post("/", paymentControllers.createPayment);
router.patch("/", paymentControllers.updatePayment);

module.exports = router;

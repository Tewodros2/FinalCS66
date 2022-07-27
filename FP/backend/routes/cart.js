const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart");
const userControllers = require("../controllers/user");

router.use(userControllers.authorize);

router.get("/", cartControllers.getCarts);
router.put("/:cartId", cartControllers.addProductToCart);
router.post("/", cartControllers.addToCart);
router.post("/:cartId/checkout", cartControllers.checkout);

module.exports = router;

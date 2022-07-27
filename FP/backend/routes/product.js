const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product");
const userControllers = require("../controllers/user");

router.use(userControllers.authorize);

router.get("/", productControllers.getAllProducts);
router.get("/:productId", productControllers.getProductById);
router.post("/", productControllers.createProduct);
router.delete("/:productId",userControllers.authorizeAdmin, productControllers.deleteProduct);
router.patch("/:productId", userControllers.authorizeAdmin, productControllers.updateProduct);

module.exports = router;

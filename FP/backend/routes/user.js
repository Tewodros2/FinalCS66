const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.get("/", userControllers.getAllUser);
router.get("/:id", userControllers.getUser);
router.post("/signin", userControllers.login);
router.post("/signup", userControllers.signup);

module.exports = router;

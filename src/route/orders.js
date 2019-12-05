const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.get("/", orderController.getAllOrder);

router.post("/", orderController.createOrder);

router.get("/:orderId", orderController.getOrderById);

router.delete("/:orderId", orderController.deleteOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");
const checkAuth = require("../middleware/check-auth");

router.get("/", productController.getData);

router.post(
  "/",
  checkAuth,
  productController.upload.single("productImage"),
  productController.insertData
);

router.get("/:id", productController.getDataById);

router.patch("/:id", productController.updateData);

router.delete("/:id", productController.deleteData);

module.exports = router;

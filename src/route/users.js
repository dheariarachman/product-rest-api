const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.delete("/:userId", userController.deleteUser);

module.exports = router;

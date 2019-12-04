import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(result => {
      res.status(200).json({
        products: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product was created",
        product: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Updated Product"
  });
});

router.delete("/:id", (req, res, next) => {
  res.status(200).json({
    message: "Deleted Product"
  });
});

module.exports = router;

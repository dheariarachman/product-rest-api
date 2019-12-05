const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

const createOrder = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product Not Found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });

      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "Order berhasil dilakukan",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
};

const getAllOrder = (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name price")
    .exec()
    .then(orders => {
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders.map(order => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            request: {
              type: "GET",
              url: "http://localhost:8081/orders/" + order._id
            }
          };
        })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const getOrderById = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("_id product quantity")
    .populate("product", "name price")
    .exec()
    .then(order => {
      res.status(200).json({
        success: true,
        message: {
          order: order,
          request: {
            type: "GET",
            url: "http://localhost:8081/orders/" + order._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const deleteOrder = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({ success: true, message: "Order was Deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
    });
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  deleteOrder
};

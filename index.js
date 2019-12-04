import express from "express";
import { urlencoded, json } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";

import products from "./route/products";
import orders from "./route/orders";

const app = express();

app.use(morgan("dev"));

app.use(urlencoded({ extended: false }));
app.use(json());

// Connect to mongodb
mongoose.connect(
  "mongodb+srv://dhearia:" +
    process.env.MONGO_PW +
    "@tourwithme-c4ags.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);

// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", products);
app.use("/orders", orders);

// Handling Error Route 404
app.use((req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

// Handling Error 500
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;

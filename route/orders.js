import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET Request to /products"
  });
});

router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.qty
  };

  res.status(201).json({
    message: "Order was created",
    order: order
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the Special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You Passed an ID"
    });
  }
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

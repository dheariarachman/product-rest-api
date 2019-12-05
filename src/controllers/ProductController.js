const mongoose = require("mongoose");
const Product = require("../models/product");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: imageFilter
});

const getData = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(products => {
      const response = {
        count: products.length,
        products: products.map(product => {
          return {
            _id: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            request: {
              type: "GET",
              url: "http://localhost:8081/products/" + product._id
            }
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
};

const getDataById = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .exec()
    .then(product => {
      console.log(product);
      res.status(200).json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const insertData = (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product
    .save()
    .then(result => {
      const product = {
        id: result._id,
        name: result.name,
        price: result.price
      };
      res.status(201).json({
        message: "Product was created successfully",
        product: product
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
      console.log(err);
    });
};

const updateData = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.updateOne({ _id: id }, { $set: updateOps })
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const deleteData = (req, res, next) => {
  let id = req.params.id;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });

      console.log(err);
    });
};

module.exports = {
  insertData,
  getData,
  getDataById,
  updateData,
  deleteData,
  upload
};

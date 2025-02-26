const express = require('express')
const {
  findProduct,
  createProduct,
  findAllProduct,
  updateProduct,
  deleteProduct,
  productReview,
} = require("../controller/productController");
const {isAuthenticated} = require('../Middleware/authenticate')

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name:'dtezcdi5l',
//   api_key:'192625361465352',
//   api_secret:''
// })


const router = express.Router();
router.route("/product/:id").get(findProduct)
router.route("/products/create").post(createProduct)
router.route("/products").get(findAllProduct)
router.route("/products/update/:_id").put(updateProduct)
router.route("/products/delete/:_id").delete(deleteProduct)
router.route("/review").put(isAuthenticated, productReview )

module.exports = router;
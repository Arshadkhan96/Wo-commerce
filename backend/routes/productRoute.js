const express = require('express')
const { findProduct,createProduct,findAllProduct,updateProduct,deleteProduct } = require('../controller/productController')
const {isAuthenticated,authorizeRoles} = require('../Middleware/authenticate')

const router = express.Router();

router.route("/products/:id").get(findProduct)
router.route("/products/create").post(createProduct)
router.route("/products").get(isAuthenticated,authorizeRoles("admin"),findAllProduct)
router.route("/products/update/:_id").put(updateProduct)
router.route("/products/delete/:_id").delete(deleteProduct)


module.exports = router;
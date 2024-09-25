const express = require('express')
const { getAllProducts,createProduct,findProduct,updateProduct,deleteProduct } = require('../controller/productController')

const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/products/create").post(createProduct)
router.route("/products/find").get(findProduct)
router.route("/products/update/:_id").put(updateProduct)
router.route("/products/delete/:_id").delete(deleteProduct)


module.exports = router;
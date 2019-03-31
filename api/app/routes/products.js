const express = require("express")
const router = express.Router()
const ProductsController = require("./../controllers/ProductsController")

let productsController = new ProductsController()

router
  .route("/")
  .get(productsController.get)

module.exports = router
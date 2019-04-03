import express from "express"
import ProductPurchasesController from "./../controllers/ProductPurchasesController"

const router = express.Router()
const controller = new ProductPurchasesController()

router
  .route("/")
  .post( (req, res, next) => controller.create(req, res, next))

module.exports = router
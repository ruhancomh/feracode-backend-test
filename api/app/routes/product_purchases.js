import express from "express"
import ProductPurchasesController from "../controllers/product_purchases"

const router = express.Router()
const controller = new ProductPurchasesController()

router
  .route("/")
  .post((req, res, next) => controller.create(req, res, next))

router
  .route("/:id")
  .delete((req, res, next) => controller.delete(req, res, next))

module.exports = router
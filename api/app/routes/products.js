import express from "express"
import ProductsController from "../controllers/products"

const router = express.Router()
const controller = new ProductsController()

router
  .route("/:id")
  .get( (req, res, next) =>  controller.get(req, res, next))

router
  .route("/")
  .get((req, res, next) =>  controller.list(req, res, next))

router
  .route("/")
  .post((req, res, next) => controller.create(req, res, next))

router
  .route("/:id")
  .put((req, res, next) => controller.update(req, res, next))

router
  .route("/:id")
  .delete((req, res, next) => controller.delete(req, res, next))

module.exports = router
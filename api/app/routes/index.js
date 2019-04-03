import express from "express"
import products from "./products"
import productPurchases from "./product_purchases"

const router = express.Router()

router.use("/products", products)
router.use("/products/purchases", productPurchases)

module.exports = router;
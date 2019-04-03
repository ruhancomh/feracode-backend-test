import mongoose from "mongoose"
import ProductsModel from "./products"

const productPurchasesSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  product_size_id: {
    type: String,
    required: true
  },

  product: {
    type: ProductsModel.productsSchema(),
    required: false
  }
})

class ProductPurchasesModel {
  constructor () {
    this.model = mongoose.model("product_purchases",productPurchasesSchema)
  }

  findLastPurhcases (sizeId, limit = 2) {
    return this.model.find({product_size_id: {$eq: sizeId}})
      .sort({
        created_at: -1
      })
      .limit(limit)
  }

  create (data) {
    return this.model.create(data)
  }

}

module.exports = ProductPurchasesModel
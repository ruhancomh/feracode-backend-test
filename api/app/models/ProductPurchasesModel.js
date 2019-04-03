import mongoose from "mongoose"
import ProductsModel from "./ProductsModel"

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
  constructor() {
    
    this.model = mongoose.model("product_purchases",productPurchasesSchema)
  }

  list (data) {
    return this.model.find({},"-deleted")
      .where({
        deleted: {$ne:true}
      })
  }

  create (data) {
    return this.model.create(data)
  }

}

module.exports = ProductPurchasesModel
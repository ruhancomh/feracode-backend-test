import mongoose from "mongoose"

const productsSchema = mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

class ProductsModel {
  constructor() {
    this.model = mongoose.model("products",productsSchema)
  }

  list (data) {
    return this.model.find()
  }

  save (data) {
    return this.model.create(data)
  }

  update (data) {
    data.updated_at = Date.now()
    return this.model.updateOne({_id:data._id}, data)
  }
}

module.exports = ProductsModel
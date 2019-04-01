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

  get (id) {
    return this.model.findById({_id:id})
      .where({
        deleted: {$ne:true}
      })
  }

  list (data) {
    return this.model.find()
      .where({
        deleted: {$ne:true}
      })
  }

  create (data) {
    return this.model.create(data)
  }

  update (data) {
    return this.model.updateOne({_id:data._id}, data)
  }

}

module.exports = ProductsModel
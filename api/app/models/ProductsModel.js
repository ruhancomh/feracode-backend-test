import mongoose from "mongoose"

const sizesSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  }
})

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
  },

  sizes:[sizesSchema]
})

class ProductsModel {
  constructor() {
    this.model = mongoose.model("products",productsSchema)
  }

  get (id) {
    return this.model.findById({_id:id},"-deleted")
      .where({
        deleted: {$ne:true}
      })
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

  async update (data) {    
    await this.model.updateOne({_id:data._id}, {
      $pull: {
        sizes: {
          _id: {
            $nin: data.sizes ? data.sizes.map(item => item._id) : []
          }
        }
      }
    })

    return this.model.updateOne({_id:data._id}, data)
  }

}

module.exports = ProductsModel
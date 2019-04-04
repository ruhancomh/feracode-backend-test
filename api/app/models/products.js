import mongoose from "mongoose"

const sizesSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  zeroedOutIn: {
    type: String
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
  constructor () {
    this.model = mongoose.model("products",productsSchema)
  }

  static productsSchema () {
    return productsSchema
  }

  get (id) {
    return this.model.findById({_id:id},"-deleted")
      .where({
        deleted: {$ne:true}
      })
  }

  getBySize (id) {
    return this.model.findOne({"sizes._id":id},"-deleted")
      .where({
        deleted: {$ne:true}
      })
  }

  list (data) {

    let filter = {}
    let sort = {}
    
    sort[data.sort_by] = data.sort_direction

    if (data.filter) {
      data.filter.forEach(element => {
        switch (element[0]) {
          case 'model':
            filter[element[0]] = {$regex: '.*' + element[1] + '.*'}
          break;
        }
      });
    }

    return this.model.find(filter, "-deleted")
      .where({
        deleted: {$ne:true}
      })
      .skip(data.offset)
      .limit(data.limit)
      .sort(sort)
  }

  count (data) {
    let filter = {}
    
    if (data.filter) {
      data.filter.forEach(element => {
        switch (element[0]) {
          case 'model':
            filter[element[0]] = {$regex: '.*' + element[1] + '.*'}
          break;
        }
      });
    }

    return this.model.countDocuments(filter)
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

  delete (id) {
    return this.model.deleteOne({_id:id})
  }

}

module.exports = ProductsModel
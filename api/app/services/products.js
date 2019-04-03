'use strict'

import ProductsModel from "../models/products"
import ProductPurchasesModel from "../models/product_purchases"
import ConvertTime from "../utils/convert_time"

class ProductsService {
  constructor () {
    this.productsModel = new ProductsModel()
  }

  async get(id) {
    try {
      let result = await this.productsModel.get(id)

      if (result){
        result = this.proccessData(result)
      }

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async getBySize (id) {
    try{
      let result = await this.productsModel.getBySize(id)
      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async list (data) {
    try {
      let self = this
      let result = await this.productsModel.list(data)

      if (result)
        result = result.map(item => {
          return self.proccessData(item)
        })

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async create (params) {
    try {
      let data = {
        model : params.model,
        description: params.description,
        sizes: params.sizes
      }

      let result = await this.productsModel.create(data)
      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async update (params, id) {
    try {
      let data = {
        _id: id,
        model: params.model,
        description: params.description,
        sizes: params.sizes,
        updated_at: Date.now()
      }

      let result = await this.productsModel.update(data)
      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async delete (id) {
    try {
      let product = await this.productsModel.get(id)
      
      product.deleted = true

      let result = await this.productsModel.update(product)

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async decreaseStock (quantity, productSizeId, product) {
    let size = product.sizes.find(item => item._id == productSizeId)
    size.stock -= quantity
    size.zeroedOutIn = await this.calculateZeroedOut(size)

    return this.update(product, product._id)
  }

  async calculateZeroedOut (size, byQuantityBought = false) {
    let productPurchasesModel = new ProductPurchasesModel()
    
    let lastPurchases = await productPurchasesModel.findLastPurhcases(size._id, 2)

    if (lastPurchases.length == 2) {
      let newerPurchase = lastPurchases[0]
      let olderPurchase = lastPurchases[1]

      let dateOlder = olderPurchase.created_at.getTime()
      let dateNewer = newerPurchase.created_at.getTime()

      let purchaseTimeDifference = dateNewer - dateOlder

      let stock = size.stock

      if (byQuantityBought) {
        stock = (stock / newerPurchase.quantity)
      }

      purchaseTimeDifference = purchaseTimeDifference * stock

      return ConvertTime.msToHMS(purchaseTimeDifference)
    } else {
      return ""
    }
  }

  getProductStock (product) {
    if (product.sizes.length > 1) {
      return product.sizes.reduce((v1, v2) => ({sum: v1.stock + v2.stock})).sum
    } else if (product.sizes.length == 1) {
      return product.sizes[0].stock
    } else {
      return 0
    }
  }

  proccessData (item) {
    return {
      ...item._doc,
      stock: this.getProductStock(item)
    }
  }
}
module.exports = ProductsService
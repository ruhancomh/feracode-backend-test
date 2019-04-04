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

      let alowedFilters = ['model']

      let filter = data.filter ?
        data.filter.split(',').map(item => {
          item = item.split(':')
          if(item.length>1 && item[1] !== '')
            return item
          else
            return false
        }).filter(item => item !== false && alowedFilters.includes(item[0]))
        : []
      
      let limit = parseInt(data.limit) ? parseInt(data.limit) : 10
      
      let offset = limit * ( data.page ? data.page - 1 : 0)

      let params = {
        limit: limit,
        offset: offset,
        sort_by: data.sort_by ? data.sort_by : 'id',
        sort_direction: data.sort_direction == 'asc' ? 1 : -1,
        filter: filter
      }
      let total = await this.productsModel.count(params)
      let result = await this.productsModel.list(params)

      if (result)
        result = result.map(item => {
          return self.proccessData(item)
        })

      return {
        data: result,
        total: total
      }
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
      return product.sizes.map(item => item.stock).reduce((v1,v2) => v1+v2)
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
'use strict'

import ProductsModel from "./../models/ProductsModel"

class ProductsService {
  constructor() {
    this.productsModel = new ProductsModel()
  }

  get(id) {
    try{
      return {}
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async list(data) {
    try {
      let items = await this.productsModel.list(data)
      return items
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async save(data) {
    try {
      let result = await this.productsModel.save(data)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async update(data) {
    try {
      let result = await this.productsModel.update(data)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }
}
module.exports = ProductsService
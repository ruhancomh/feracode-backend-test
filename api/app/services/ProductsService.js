'use strict'

import ProductsModel from "./../models/ProductsModel"

class ProductsService {
  constructor() {
    this.productsModel = new ProductsModel()
  }

  async get(id) {
    try{
      let result = await this.productsModel.get(id)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async list(data) {
    try {
      let result = await this.productsModel.list(data)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async create(params) {
    try {
      let data = {
        model : params.model,
        description: params.description
      }

      let result = await this.productsModel.create(data)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async update(params, id) {
    try {
      let data = {
        _id: id,
        model: params.model,
        description: params.description,
        updated_at: Date.now()
      }
      let result = await this.productsModel.update(data)
      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async delete(id) {
    try{
      let product = await this.productsModel.get(id)
      
      product.deleted = true

      let result = await this.productsModel.update(product)

      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }
}
module.exports = ProductsService
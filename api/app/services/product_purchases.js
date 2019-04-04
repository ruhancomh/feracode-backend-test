'use strict'

import ProductPurchasesModel from "../models/product_purchases"
import ProductsService from "./products"

class ProductPurchasesService {
  constructor () {
    this.productPurchasesModel = new ProductPurchasesModel()
  }

  async create(params) {
    try {
      let productsService = new ProductsService()
      let product = await productsService.getBySize(params.product_size)

      let quantity = params.quantity
      let productSizeId = params.product_size

      if (!product) {
        throw new Error(`No products find with size id:${params.product_size}`);
      }

      let data = {
        quantity: quantity,
        product_size_id: productSizeId,
        product: product
      }

      let result = await this.productPurchasesModel.create(data)
      
      await productsService.decreaseStock(quantity, productSizeId, product)

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async delete (id) {
    try {

      let result = await this.productPurchasesModel.delete(id)

      if (result.n <= 0)
        throw Error(`No record found to id:${id}`)

      return result
    } catch (err) {
      throw new Error(err.message)
    }
  }

}
module.exports = ProductPurchasesService
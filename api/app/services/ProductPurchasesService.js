'use strict'

import ProductPurchasesModel from "./../models/ProductPurchasesModel"
import ProductService from "./ProductsService"
import { throws } from "assert";

class ProductPurchasesService {
  constructor() {
    this.productPurchasesModel = new ProductPurchasesModel()
  }

  async create(params) {
    try {
      let productService = new ProductService()
      let product = await productService.getBySize(params.product_size)

      if(!product) {
        throw new Error(`No products find with size id:${params.product_size}`);
      }

      let data = {
        quantity: params.quantity,
        product_size_id: params.product_size,
        product: product
      }

      let result = await this.productPurchasesModel.create(data)

      product.sizes.find(item => item._id == params.product_size).stock -= params.quantity

      await productService.update(product, product._id)

      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

}
module.exports = ProductPurchasesService
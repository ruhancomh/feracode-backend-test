'use strict'

import ProductPurchasesModel from "./../models/ProductPurchasesModel"
import ProductsService from "./ProductsService"

class ProductPurchasesService {
  constructor() {
    this.productPurchasesModel = new ProductPurchasesModel()
  }

  async create(params) {
    try {
      let productsService = new ProductsService()
      let product = await productsService.getBySize(params.product_size)

      let quantity = params.quantity
      let productSizeId = params.product_size

      if(!product) {
        throw new Error(`No products find with size id:${params.product_size}`);
      }

      let data = {
        quantity: quantity,
        product_size_id: productSizeId,
        product: product
      }

      let result = await this.productPurchasesModel.create(data)

      // let purchasedSize = product.sizes.find(item => item._id == params.product_size)
      // purchasedSize.stock -= params.quantity
      // purchasedSize.zeroedOutIn = await this.calculateZeroedOut(purchasedSize)
      
      await productsService.decreaseStock(quantity, productSizeId, product)

      return result
    } catch(err) {
      throw new Error(err.message)
    }
  }

}
module.exports = ProductPurchasesService
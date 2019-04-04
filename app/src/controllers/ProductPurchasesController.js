'use strict'
import { BaseController } from './BaseController';

export class ProductPurchasesController extends BaseController {
  _baseApiUrl = 'products/purchases'

  async create(params) {
    try {
      let data = {
        product_size: params.product_size,
        quantity: params.quantity
      }

      let result = await this._request.post(this._baseApiUrl, data)
      
      return this.response(`You bought ${data.quantity} items`, result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

}
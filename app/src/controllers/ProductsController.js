'use strict'
import { Products } from '../models/Products';
import { ProductSizes } from '../models/ProductSizes';
import { BaseController } from './BaseController';

export class ProductsController extends BaseController {
  _baseApiUrl = 'products'

  static getModel() {
    return new Products()
  }

  static getSizeModel() {
    return new ProductSizes()
  }

  async create(params) {
    try {
      let product = new Products(
        params.model,
        params.description,
        params.sizes
      )

      let result = await this._request.post(this._baseApiUrl, product)
      
      return this.response('Product successfully added.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async update(params) {
    try {
      let product = new Products(
        params.model,
        params.description,
        params.sizes,
        params._id
      )

      let result = await this._request.put(`${this._baseApiUrl}/${product._id}`, product)
      return this.response('Product successfully updated.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async get(id) {
    try {
      let result = await this._request.get(`${this._baseApiUrl}/${id}`)
      let product = result.data
      return this.response('Product successfully loaded.', product)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async list(filter, page, limit, sortBy, descending) {
    try {
      let queryParams = this.buildQueryParams(filter, page, limit, sortBy, descending)
      let result = await this._request.get(`${this._baseApiUrl}${queryParams}`)
      return this.response(false, result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async delete(id) {
    try {
      let result = await this._request.delete(`${this._baseApiUrl}/${id}`)
      return this.response('Product successfully deleted.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

}
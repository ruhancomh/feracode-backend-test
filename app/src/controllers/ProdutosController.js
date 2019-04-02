'use strict'
import { Produtos } from '../models/Produtos';
import { ProductSizes } from '../models/ProductSizes';
import { BaseController } from './BaseController';

export class ProdutosController extends BaseController {
  _baseApiUrl = 'products'

  static getModel() {
    return new Produtos()
  }

  static getSizeModel() {
    return new ProductSizes()
  }

  async create(params) {
    try {
      let produto = new Produtos(
        params.model,
        params.description,
        params.sizes
      )

      let result = await this._request.post(this._baseApiUrl, produto)
      
      return this.response('Produto adicionado com sucesso.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async update(params) {
    try {
      let produto = new Produtos(
        params.model,
        params.description,
        params.sizes,
        params._id
      )

      let result = await this._request.put(`${this._baseApiUrl}/${produto._id}`, produto)
      return this.response('Produto editado com sucesso.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

  async get(id) {
    try {
      let result = await this._request.get(`${this._baseApiUrl}/${id}`)
      let produto = result.data
      return this.response('Produto carregado com sucesso.', produto)
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
      return this.response('Produto removido com sucesso.', result.data)
    } catch (error) {
      return this.response(false, false, error)
    }
  }

}
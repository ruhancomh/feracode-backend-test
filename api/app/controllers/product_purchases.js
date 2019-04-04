"use strict"

import ProductPurchasesService from "../services/product_purchases"

class ProductsController {
  constructor () {
    this.service = new ProductPurchasesService()
  }

  async create (req, res, next) {
    try{ 
      let result = await this.service.create(req.body)
      return res.status(201).send({
        success: true,
        data: result
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message
      })
    }
  }

  async delete (req, res, next) {
    try {
      let result = await this.service.delete(req.params.id)
      return res.status(204).send()
    } catch (err) {
      return res.status(400).send({        
        message: err.message
      })
    }
  }

}
module.exports = ProductsController
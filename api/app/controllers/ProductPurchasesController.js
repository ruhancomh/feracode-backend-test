"use strict"

import ProductPurchasesService from "../services/ProductPurchasesService"

class ProductsController {
  constructor() {
    this.service = new ProductPurchasesService()
  }

  async create (req, res, next){
    try{
      let result = await this.service.create(req.body)
      return res.status(200).send({
        success: true,
        data: result
      })
    } catch(err) {
      return res.status(400).send({
        success: false,
        message: err.message
      })
    }
  }

}
module.exports = ProductsController
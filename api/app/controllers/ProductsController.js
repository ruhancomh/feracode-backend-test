'use strict'

class ProductsController {
  get(req, res, next){
    return res.status(200).send({
      success: true,
      data: "List of products"
    })
  }
}

module.exports = ProductsController
"use strict"

import ProductsService from "../services/products"

class ProductsController {
  constructor () {
    this.service = new ProductsService()
  }

  async get (req, res, next) {
    try {
      let result = await this.service.get(req.params.id)
      return res.status(200).send({        
        data: result
      })
    } catch (err) {
      return res.status(400).send({        
        message: err.message
      })
    }
  }

  async list (req, res, next) {
    try {
      let result = await this.service.list(req.query)

      return res.status(200).send({        
        data: result
      })
    } catch (err) {
      return res.status(400).send({        
        message: err.message
      })
    }
  }


  async create (req, res, next){
    try {
      let result = await this.service.create(req.body)
      return res.status(201).send({        
        data: result
      })
    } catch (err) {
      return res.status(400).send({        
        message: err.message
      })
    }
  }

  async update (req, res, next) {
    try {
      let result = await this.service.update(req.body, req.params.id)
      return res.status(200).send({        
        data: result
      })
    } catch (err) {
      return res.status(400).send({        
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
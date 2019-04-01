"use strict"

import ProductsService from "../services/ProductsService"

class ProductsController {
  constructor() {
    this.service = new ProductsService()
  }

  async get (req, res, next){
    try{
      let result = await this.service.get(req.params.id)
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

  async list (req, res, next) {
    try {
      let params = {}
      let result = await this.service.list(params)

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

  async update (req, res, next) {
    try {
      let result = await this.service.update(req.body, req.params.id)
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

  async delete (req, res, next) {
    try {
      let result = await this.service.delete(req.params.id)
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
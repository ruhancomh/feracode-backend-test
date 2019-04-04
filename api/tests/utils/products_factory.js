import ProductsService from "./../../app/services/products"

class ProductsFactory {
  constructor () {
    this.productBase = {
      model: "It's a test model",
      description: "It's a test decription",
      sizes: [
        {
          description: "Large",
          stock: 100
        },
        {
          description: "Small",
          stock: 50
        }
      ]
    }

    this.service = new ProductsService()
  }

  getProductBase () {
    return this.productBase
  }
  
  async create (params = false, parseObject = true) {
    let product = this.productBase
    let result =  await this.service.create(product)
    if(parseObject){
      result = JSON.parse(JSON.stringify(result))
    }
    return result
  }

  async delete (items = []) {
    items.forEach( async item => {
      await this.service.delete(item._id)
    })
  }
}

module.exports = ProductsFactory
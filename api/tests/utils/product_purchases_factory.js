import ProductPurchasesService from "./../../app/services/product_purchases"

class ProductPurchasesFactory {
  constructor () {
    this.service = new ProductPurchasesService()
  }

  async delete (items = []) {
    items.forEach( async item => {
      await this.service.delete(item._id)
    })
  }
}

module.exports = ProductPurchasesFactory
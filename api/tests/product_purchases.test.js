import chai from "chai"
import chaiHttp from "chai-http"
import app from "./../app"
import ProductsFactory from "./utils/products_factory"
import ProductPurchasesFactory from "./utils/product_purchases_factory"

chai.use(chaiHttp)
chai.should()

const baseUrl = "/products/purchases"

describe("Product Purchases", () => {
  describe("POST /", () => {
    let product
    let purchase

    before( async () => {
      let productsFactory = new ProductsFactory()
      product = await productsFactory.create()
    })

    after( async () => {
      let productsFactory = new ProductsFactory()
      let purchasesFactory = new ProductPurchasesFactory()
      
      await productsFactory.delete([product])
      await purchasesFactory.delete([purchase])
    })

    it("should register a purchase for a product", (done) => {

      let purchaseNew = {
        product_size: product.sizes[0]._id,
        quantity: 10
      }

      chai.request(app)
        .post(`${baseUrl}`)
        .send(purchaseNew)
        .end((err, res) => {
          if(err){
            done(err)
          } else {

            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            
            res.body.data.product_size_id.should.be.equal(purchaseNew.product_size)
            res.body.data.quantity.should.be.equal(purchaseNew.quantity)

            purchase = res.body.data

            done()
          }
        })
    })
  })
})
import chai from "chai"
import chaiHttp from "chai-http"
import app from "./../app"
import ProductsFactory from "./utils/products_factory"

chai.use(chaiHttp)
chai.should()

const baseUrl = "/products"

describe("Products", () => {
  describe("POST /", () => {
    let product

    after( async () => {
      let factory = new ProductsFactory()
      await factory.delete([product])
    })

    it("should add new product", (done) => {
      let factory = new ProductsFactory()

      chai.request(app)
        .post(`${baseUrl}`)
        .send(factory.getProductBase())
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(201)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')

            product = res.body.data
            
            done()
          }
        })
    })
  })

  describe("PUT /{id}", () => {
    let product

    before( async () => {
      let factory = new ProductsFactory()
      product = await factory.create()
    })

    after( async () => {
      let factory = new ProductsFactory()
      await factory.delete([product])
    })

    it("should update a product", (done) => {

      product.model = 'Updated model'
      product.description = 'Updated description'

      chai.request(app)
        .put(`${baseUrl}/${product._id}`)
        .send(product)
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.model.should.be.equal(product.model)
            done()
          }
        })
    })

    it("should update a product removing a size", (done) => {
      product.sizes = product.sizes.splice(0,1)

      chai.request(app)
        .put(`${baseUrl}/${product._id}`)
        .send(product)
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.be.a('object')
            res.body.data.sizes.length.should.be.equal(1)
            done()
          }
        })
    })
  })

  describe("GET /{id}", () => {
    let product

    before( async () => {
      let factory = new ProductsFactory()
      product = await factory.create()
    })

    after( async () => {
      let factory = new ProductsFactory()
      await factory.delete([product])
    })

    it("should get a product", (done) => {
      chai.request(app)
        .get(`${baseUrl}/${product._id}`)
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.have.property('_id')
            res.body.data._id.should.be.equal(product._id)
            done()
          }
        })
    })
  })

  describe("GET /", () => {
    let product

    before( async () => {
      let factory = new ProductsFactory()
      product = await factory.create()
    })

    after( async () => {
      let factory = new ProductsFactory()
      await factory.delete([product])
    })

    it("should get all products", (done) => {
      chai.request(app)
        .get(`${baseUrl}`)
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.have.property('data')
            res.body.data.should.have.property('total')
            done()
          }
        })
    })

    it("should get all products with: filter, pagination, order", (done) => {
      chai.request(app)
        .get(`${baseUrl}`)
        .query({
          page: 1,
          limit: 1,
          order_by: 'model'
        })
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('data')
            res.body.data.should.have.property('data')
            res.body.data.should.have.property('total')
            res.body.data.data.should.be.a('array')
            res.body.data.data.length.should.be.equal(1)
            done()
          }
        })
    })
  })

  describe("DELETE /{id}", () => {
    let product

    before( async () => {
      let factory = new ProductsFactory()
      product = await factory.create()
    })
    
    it("should delete a product", (done) => {
      chai.request(app)
        .delete(`${baseUrl}/${product._id}`)
        .end((err, res) => {
          if(err){
            done(err)
          } else {
            res.should.have.status(204)
            res.body.should.be.a('object')
            res.body.should.be.empty
            done()
          }
        })
    })
  })
})
import chai from "chai"
import chaiHttp from "chai-http"
import app from "./../app"

chai.use(chaiHttp)
chai.should()

let product = {
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

describe("Products", () => {
  describe("POST /", () => {
    it("should add new product", (done) => {
      chai.request(app)
        .post("/products")
        .send(product)
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
    it("should update a product", (done) => {

      product.model = 'Updated model'
      product.description = 'Updated description'

      chai.request(app)
        .put(`/products/${product._id}`)
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
        .put(`/products/${product._id}`)
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
    it("should get a product", (done) => {
      chai.request(app)
        .get(`/products/${product._id}`)
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
    it("should get all products", (done) => {
      chai.request(app)
        .get("/products")
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
        .get("/products")
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
    it("should delete a product", (done) => {
      chai.request(app)
        .delete(`/products/${product._id}`)
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
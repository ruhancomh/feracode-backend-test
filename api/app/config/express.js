const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./../routes")

module.exports = function () {
  let app = express()

  app.use(routes)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app
}
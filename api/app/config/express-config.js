import express from "express"
import bodyParser from "body-parser"
import mongoose from "./mongoose-config"
import routes from "../routes"

module.exports = function () {
  let db = mongoose()
 
  let app = express()

  app.use(routes)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app
}
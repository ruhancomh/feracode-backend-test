import express from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import mongoose from "./mongoose-config"
import routes from "../routes"

module.exports = function () {
  let db = mongoose()
 
  let app = express()

  app.use(helmet())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(routes)

  return app
}
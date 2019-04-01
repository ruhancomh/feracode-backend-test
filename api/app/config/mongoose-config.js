import mongoose from "mongoose"

module.exports = function () {
  let databaseUrl = process.env.DATABASE_URL
  let databasePort = process.env.DATABASE_PORT
  let databaseName = process.env.DATABASE_NAME

  mongoose.connect(`mongodb://${databaseUrl}:${databasePort}/${databaseName}`,{ useNewUrlParser: true });

  return mongoose.connection
}
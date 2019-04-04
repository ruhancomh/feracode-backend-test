import mongoose from "mongoose"

module.exports = function () {
  let databaseUrl = process.env.DATABASE_URL
  let databasePort = process.env.DATABASE_PORT
  let databaseName = process.env.DATABASE_NAME
  let databaseUser = process.env.DATABASE_USER
  let databasePassword = process.env.DATABASE_PASSWORD

  mongoose.connect(`mongodb://${databaseUser}:${databasePassword}@${databaseUrl}:${databasePort}/${databaseName}`,{ useNewUrlParser: true });

  return mongoose.connection
}
import dotenv from "dotenv"
dotenv.config()

const app = require("./app/config/express")()

app.listen(process.env.SERVER_PORT, function(){
  console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`)
})

module.exports = app
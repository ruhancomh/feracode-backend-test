import express from "express"
import ProductsController from "./../controllers/ProductsController"

const router = express.Router()
const controller = new ProductsController()

router
  .route("/calczero")
  .get( (req, res, next) =>  {
    let oneMinut = 1000*60

    let date1 = new Date(2019, 1, 1, 10, 10,0)
    let date2 = new Date(2019, 1, 1, 10, 11,0)

    let date1Ms = date1.getTime()
    let date2Ms = date2.getTime()

    let difference = date2Ms - date1Ms


    let stock = parseInt(98 / 5)


    difference = difference * stock

    let ms = difference

    var seconds = ms / 1000;
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;

    console.log(hours+":"+minutes+":"+seconds)

    res.send('')
  })

router
  .route("/:id")
  .get( (req, res, next) =>  controller.get(req, res, next))

router
  .route("/")
  .get( (req, res, next) =>  controller.list(req, res, next))

router
  .route("/")
  .post( (req, res, next) => controller.create(req, res, next))

router
  .route("/:id")
  .put( (req, res, next) => controller.update(req, res, next))

router
  .route("/:id")
  .delete( (req, res, next) => controller.delete(req, res, next))

module.exports = router
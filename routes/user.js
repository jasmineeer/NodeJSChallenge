const express = require(`express`)
const app = express()

app.use(express.json())

// memanggil controller user
let userController = require("../controllers/userController")

// memanggil middlewares untuk authorization 
let authorization = require("../middlewares/authorization")
let userValidator = require("../middlewares/userValidator")

// end-point untuk get data user
app.get("/", authorization.authorization, userController.getDataUser)

// end-point untuk add data user
app.post("/", userValidator.validate, authorization.authorization, userController.addDataUser)

// end-point untuk mengedit data user
app.put("/:id_user", authorization.authorization, userController.updateDataUser)

// end-point untuk delete data user
app.delete("/:id_user", authorization.authorization, userController.deleteDataUser)

app.post("/auth", userController.authentication)
module.exports = app 
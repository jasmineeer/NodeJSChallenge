const express = require(`express`)
const app = express()
const { body } = require(`express-validator`)

app.use(express.json())

// memanggil controller member
let memberController = require("../controllers/memberController")

// memanggil middlewares untuk authorizarion 
let authorization = require("../middlewares/authorization")

// end-point untuk get data member
app.get("/", authorization.authorization, memberController.getDataMember)

// end-point untuk add data member
app.post("/", authorization.authorization, memberController.addDataMember)

// end-point untuk mengedit data member
app.put("/:id_member", authorization.authorization, memberController.updateDataMember)

// end-point untuk delete data member
app.delete("/:id_member", authorization.authorization, memberController.deleteDataMember)

module.exports = app
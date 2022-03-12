const express = require(`express`)
const app = express()

app.use(express.json())

// memanggil controller paket
let paketController = require("../controllers/paketController")

// memanggil middlewares untuk authorizarion 
let authorization = require("../middlewares/authorization")

// end-point untuk get data paket
app.get("/", authorization.authorization, paketController.getDataPaket)

// end-point untuk add data paket
app.post("/", authorization.authorization, paketController.addDataPaket)

// end-point untuk mengedit data paket
app.put("/:id_paket", authorization.authorization, paketController.updateDataPaket)

// end-point untuk delete data paket
app.delete("/:id_paket", authorization.authorization, paketController.deleteDataPaket)

module.exports = app
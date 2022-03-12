const express = require(`express`)
const app = express()
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// memanggil controller transaksi
let transaksiController = require("../controllers/transaksiController")

// memanggil middlewares untuk authorizarion 
let authorization = require("../middlewares/authorization")
const { body } = require("express-validator")

// end-point untuk get data transaksi
app.get("/", authorization.authorization, transaksiController.getData)

// end-point untuk add data transaksi
app.post("/", authorization.authorization, transaksiController.addData)

// end-point untuk mengedit data transaksi
app.put("/:id_transaksi", authorization.authorization, transaksiController.updateData)

// end-point untuk delete data transaksi
app.delete("/:id_transaksi", authorization.authorization, transaksiController.deleteData)

// end-point untuk mengubah status transaksi
app.post("/status/:id_transaksi", authorization.authorization, transaksiController.updateStatusTransaksi)

// end-point untuk mengubah status pembayaran
app.get("/bayar/:id_transaksi", authorization.authorization, transaksiController.updateBayarTransaksi)

module.exports = app 
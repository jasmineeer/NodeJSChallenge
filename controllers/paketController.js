const {request, response} = require("express")
const req = require("express/lib/request")

// memanggil file model untuk paket
let modelPaket = require("../models/index").paket 

exports.getDataPaket = (request, response) => {
    modelPaket.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addDataPaket = (request, response) => {
    // menampung data paket
    let newPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga
    }

    modelPaket.create(newPaket)
    .then(result => {
        return response.json({
            message: `Data Paket inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateDataPaket = (request, response) => {
    let id = request.params.id_paket

    let dataPaket = {
        jenis_paket: request.body.jenis_paket,
        harga: request.body.harga 
    }

    modelPaket.update(dataPaket, { where: { id_paket: id } })
    .then(result => {
        return response.json({
            message: `Data Paket updated` 
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataPaket = (request, response) => {
    let id = request.params.id_paket

    modelPaket.destroy({ where: { id_paket: id } })
    .then(result => {
        return response.json({
            message: `Data Paket deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}
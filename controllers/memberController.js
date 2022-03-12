const {request, response} = require("express")
const req = require("express/lib/request")

// memanggil file model untuk member
let modelMember = require("../models/index").member 

exports.getDataMember = (request, response) => {
    modelMember.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addDataMember = (request, response) => {
    // menampung data member
    let newMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        kontak: request.body.kontak 
    }

    modelMember.create(newMember)
    .then(result => {
        return response.json({
            message: `Data Member inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateDataMember = (request, response) => {
    let id = request.params.id_member

    let dataMember = {
        nama: request.body.nama,
        alamat: request.body.alamat,
        kontak: request.body.kontak 
    }

    modelMember.update(dataMember, { where: { id_member: id } })
    .then(result => {
        return response.json({
            message: `Data Member updated` 
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataMember = (request, response) => {
    let id = request.params.id_member

    modelMember.destroy({ where: { id_member: id } })
    .then(result => {
        return response.json({
            message: `Data Member deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}
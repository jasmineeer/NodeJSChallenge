const {request, response} = require("express")
const req = require("express/lib/request")
const md5 = require("md5")
const { validationResult } = require("express-validator")

// memanggil file model untuk paket
let modelUser = require("../models/index").user 

let jwt = require('jsonwebtoken')


exports.getDataUser = (request, response) => {
    modelUser.findAll()
    .then(result => {
        return response.json(result)
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.addDataUser = (request, response) => {
    let error = validationResult(request)
    if(!error.isEmpty()) {
        return response.json (error.array())
    }
    // menampung data user
    let newUser = {
        nama_user: request.body.nama_user,
        kontak_user: request.body.kontak_user,
        username: request.body.username,
        password: md5(request.body.password)
    }

    modelUser.create(newUser)
    .then(result => {
        return response.json({
            message: `Data User inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateDataUser = (request, response) => {
    let id = request.params.id_user

    let dataUser = {
        nama_user: request.body.nama_user,
        kontak_user: request.body.kontak_user,
        username: request.body.username
    }
    if (request.body.password) {
        dataUser.password = md5(request.body.password)
    }

    modelUser.update(dataUser, { where: { id_user: id } })
    .then(result => {
        return response.json({
            message: `Data User updated` 
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.deleteDataUser = (request, response) => {
    let id = request.params.id_user

    modelUser.destroy({ where: { id_user: id } })
    .then(result => {
        return response.json({
            message: `Data User deleted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.authentication = async(request, response) => {
    let data = {
        username: request.body.username,
        password: md5(request.body.password)
    }

    // validasi (cek data di tabel user)
    let result = await modelUser.findOne({where: data})

    if(result) {
        // data ditemukan

        //payload adalah data/informasi yang akan dienkripsi
        let payload = JSON.stringify(result) // konversi dari bentuk objek ke
        let secretKey = `Yuk ke Simple Laundry`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token 
        })
    } else{
        // data tidak ditemukan
        return response.json({
            logged: false,
            message: `Invalid username or password `
        })
    }
}
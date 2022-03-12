let modelTransaksi = require("../models/index").transaksi
let detailTransaksiModel = require("../models/index").detail_transaksi


exports.getData = async (request, response) => {
    let data = await modelTransaksi.findAll({
        include: ["member", "user", {
            model: detailTransaksiModel,
            as: "detail_transaksi",
            include: ["paket"]
        }]
    })
    return response.json(data)
}

exports.addData = (request, response) => {
    let newData = {
        id_member: request.body.id_member,
        tgl: request.body.tgl,
        tgl_bayar: null,
        status: 1,
        dibayar: request.body.dibayar,
        id_user: request.body.id_user 
    }

    // insert ke tabel transaksi
    modelTransaksi.create(newData)
        .then(result => {
            let detail_transaksi = request.body.detail_transaksi
            // asumsinya detail_transaksi itu bertipe array
            let id = result.id_transaksi 
            for (let i = 0; i < detail_transaksi.length; i++) {
                detail_transaksi[i].id_transaksi = id
            }

            // insert ke tabel detail_transaksi
            detailTransaksiModel.bulkCreate(detail_transaksi)
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil ditambahkan`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

exports.updateData = async (request, response) => {
    let id = request.params.id_transaksi 

    // define data yg diubah di tabel transaksi
    let newData = {
        id_member: request.body.id_member,
        tgl: request.data.tgl,
        tgl_bayar: request.data.tgl_bayar,
        status: request.data.status,
        dibayar: request.data.dibayar,
        id_user: request.data.id_user 
    }

    // eksekusi update tabel transaksi
    modelTransaksi.update(
        newData, { where: { id_transaksi: id } }
    )
        .then(async (result) => {
            await detailTransaksiModel.destroy(
                {
                    where: {
                        id_transaksi: request.params.id_transaksi
                    }
                }
            )
            // -------------------------------------------

            let detail_transaksi = request.body.detail_transaksi
            let id = request.params.id_transaksi
            for (let i = 0; i < detail_transaksi.length; i++) {
                detail_transaksi[i].id_transaksi = id
            }

            detailTransaksiModel.bulkCreate(detail_transaksi)
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil diubah`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))
}

exports.deleteData = (request, response) => {
    let id = request.params.id_transaksi

    detailTransaksiModel.destroy({
        where: {
            id_transaksi: id
        }
    })
        .then(result => {
            let id = request.params.id_transaksi

            modelTransaksi.destroy({
                where: {
                    id_transaksi: id
                }
            })
                .then(result => {
                    return response.json({
                        message: `Data pelanggaran siswa berhasil dihapus`
                    })
                })
                .catch(error => {
                    return response.json({
                        message: error.message
                    })
                })
        })
        .catch(error => console.log(error))
}
exports.updateStatusTransaksi = (request, response) => {
    let id = request.params.id_transaksi 

    let data = {
        status: request.body.status 
    }

    modelTransaksi.update(data, { where: { id_transaksi: id } })
    .then(result => {
        return response.json({
            message: `Transaksi Status updated`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message 
        })
    })
}

exports.updateBayarTransaksi = (request, response) => {
    let id = request.params.id_transaksi 

    let data = {
        tgl_bayar: new Date().toISOString().split("T")[0],
        dibayar: true  
    }

    modelTransaksi.update(data, { where: { id_transaksi: id } })
    .then(result => {
        return response.json({
            message: `Payment successfull`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}
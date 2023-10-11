const {
    response
} = require('express')
const Reservasi = require('../models/reservasi')
const controllers = {}
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        next();
    } catch (error) {
        return res.redirect('/login');
    }
};

const profileView = async (req, res) => {
    try {
        const findUser = await User.findOne({
            id_user: req.session.id_user
        })

        if (!findUser) {
            return res.redirect('/login')
        }
        res.render('admin/profile/profile')
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.profileView = [verifyToken, profileView]


const manageReservationHistory = async (req, res) => {
    // try {
    //     const findUser = await User.findOne({
    //         id_user: req.session.id_user
    //     })

    //     if (!findUser) {
    //         return res.redirect('/login')
    //     }
    //     res.render('admin/manage/history')
    // } catch (error) {
    //     return res.redirect('/login')
    // }
    // return res.redirect('/login')
    return res.render('admin/history/history')
}
controllers.manageReservationHistory = [manageReservationHistory]

const allReservationData = async (req, res) => {
    const allReservation = await Reservasi.findAll()

    if (allReservation.length > 0) {
        const data = allReservation.map((dataReservation) => ({
            id_meja: dataReservation.id_meja,
            id_user: dataReservation.id_user,
            tanggal_reservasi: dataReservation.tanggal_reservasi,
            jam_mulai: dataReservation.jam_mulai,
            jam_selesai: dataReservation.jam_selesai,
            jumlah_orang: dataReservation.jumlah_orang,
            status: dataReservation.status,
            keterangan: dataReservation.keterangan,
            created_at: dataReservation.created_at,
            updated_at: dataReservation.updated_at
        }))

        res.status(200).json({
            success: true,
            data: data
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Reservation data is not available'
        })
    }
}

controllers.allReservationData = allReservationData

module.exports = controllers
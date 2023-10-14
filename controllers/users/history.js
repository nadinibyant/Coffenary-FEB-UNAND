const {
    response
} = require('express')
const User = require('../../models/user')
const Meja = require('../../models/meja')
const Reservasi = require('../../models/reservasi')
const controllers = {}
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone');

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

const historyView = async (req, res) => {
    res.render('users/history/history')
}
controllers.historyView = [verifyToken, historyView]

const allDataHistory = async (req, res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const findHistory = await Reservasi.findAll({
            where: {
                id_user: id_user
            }
        })
        if (findHistory.length > 0) {
            const dataHistory = findHistory.map((history) => ({
                tanngal_reservasi: history.tanggal_reservasi,
                jam_mulai: history.jam_mulai,
                jam_selesai: history.jam_selesai,
                id_meja: history.id_meja,
                jumlah_orang: history.jumlah_orang,
                status: history.status,
                id_reservasi: history.id_reservasi
            }))

            const id_meja = dataHistory.map((meja) => meja.id_meja)
            const nomor_meja = []
            for (let index = 0; index < id_meja.length; index++) {
                const findNomor = await Meja.findOne({
                    where: {
                        id_meja: id_meja[index]
                    }
                })
                if (findNomor) {
                    nomor_meja.push(findNomor.nomor_meja)
                }

            }
            console.log(id_meja)
            if (dataHistory) {
                res.status(200).json({
                    success: true,
                    dataHistory: dataHistory,
                    nomor_meja: nomor_meja
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'There are no reservations yet'
                })
            }
        }
    } else {
        return res.redirect('/login')
    }
}
controllers.allDataHistory = allDataHistory

const cancelReservation = async (req, res) => {
    const id_reservasi = req.params.id_reservasi

    const id_user = 3
    const findUser = await User.findByPk(id_user)
    if (findUser) {

        const findReservasi = await Reservasi.findByPk(id_reservasi)
        if (findReservasi) {
            const reservationTime = findReservasi.jam_mulai
            const [hour, minute, second] = reservationTime.split(':');
            const formattedReservationTime = `${hour}:${minute}`;

            const now = moment().tz('Asia/Jakarta');
            const jamNow = now.format('HH:mm');

            const timeAfterSubtraction = moment(formattedReservationTime, 'HH:mm').subtract(30, 'minutes').format('HH:mm');

            const isTime1GreaterThanTime2 = moment(jamNow, 'HH:mm').isAfter(moment(timeAfterSubtraction, 'HH:mm'));

            if (isTime1GreaterThanTime2) {
                res.status(400).json({
                    success: false,
                    message: 'Reservation fails to be cancelled, cancellation must be 30 minutes before reservation time'
                })
            } else {
                const updateReservation = await Reservasi.update({
                    status: 'Canceled',
                    jam_mulai: '',
                    jam_selesai: ''
                }, {
                    where: {
                        id_reservasi: id_reservasi
                    }
                })

                if (updateReservation) {
                    res.status(200).json({
                        success: true,
                        message: 'Reservation Canceled Successfully',
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Reservation failed to cancel'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Reservation not Found'
            })
        }
    } else {
        return res.redirect('/login')
    }
}
controllers.cancelReservation = cancelReservation

module.exports = controllers
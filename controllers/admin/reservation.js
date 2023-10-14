const {
    response
} = require('express')
const Reservasi = require('../../models/reservasi')
const controllers = {}
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken')

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

const reservationHistoryView = async (req, res) => {
        res.render('admin/history/history')
}
controllers.reservationHistoryView = [verifyToken, reservationHistoryView] 

const allReservationData = async (req, res) => {
    const allReservation = await Reservasi.findAll()

    if (allReservation.length > 0) {
        const data = allReservation.map((dataReservation) => ({
            id_reservasi: dataReservation.id_reservasi,
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

const done = async (req, res) => {
    const id_reservasi = req.params.id_reservasi

    const findReservasi = await Reservasi.findByPk(id_reservasi)

    if (findReservasi) {
        const statusReservasi = findReservasi.status


        if (findReservasi && statusReservasi != 'Completed' && statusReservasi != 'Canceled') {
            const updateReservasi = await Reservasi.update({
                status: 'Completed'
            }, {
                where: {
                    id_reservasi: id_reservasi
                }
            })

            const afterUpdate = await Reservasi.findByPk(id_reservasi)
            if (updateReservasi) {
                res.status(200).json({
                    success: true,
                    message: 'Reservation Completed',
                    status: 'Completed',
                    data: afterUpdate
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Reservation did not complete successfully'
                })
            }
        } else if (findReservasi && statusReservasi == 'Completed') {
            res.status(400).json({
                success: false,
                message: 'Fail, reservation has been completed'
            })
        } else if (findReservasi && statusReservasi == 'Canceled') {
            res.status(400).json({
                success: false,
                message: 'Fail, the reservation has been canceled'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Reservation data not found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Reservation data not found'
        })
    }

}
controllers.done = done

const reject = async (req, res) => {
    const id_reservasi = req.params.id_reservasi

    const findReservasi = await Reservasi.findByPk(id_reservasi)
    if (findReservasi) {
        const reservationTime = findReservasi.jam_mulai;
        const [hour, minute, second] = reservationTime.split(':');
        const formattedReservationTime = `${hour}:${minute}`;

        const now = moment().tz('Asia/Jakarta');
        const jamNow = now.format('HH:mm');

        const timeAfterSubtraction = moment(formattedReservationTime, 'HH:mm').subtract(30, 'minutes').format('HH:mm');


        const dateReservation = findReservasi.tanggal_reservasi

        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = String(nowDate.getMonth() + 1).padStart(2, '0');
        const day = String(nowDate.getDate()).padStart(2, '0');
        console.log('Tanggal sekarang:', `${year}-${month}-${day}`);
        const date = `${year}-${month}-${day}`

        const isTime1GreaterThanTime2 = moment(jamNow, 'HH:mm').isAfter(moment(timeAfterSubtraction, 'HH:mm'));

        const isSameDate = dateReservation === date;

        if (findReservasi.status == 'Reserved') {
            if (isSameDate) {
                if (isTime1GreaterThanTime2) {
                    res.status(400).json({
                        success: false,
                        message: 'Reservation fails to be cancelled, cancellation must be 30 minutes before reservation time'
                    })

                } else {
                    const rejectReservasi = await Reservasi.update({
                        status: 'Canceled',
                        tanggal_reservasi: '',
                        jam_mulai: '',
                        jam_selesai: '',
                        keterangan: 'Reservation was canceled due to priority guests from coffeenary'
                    }, {
                        where: {
                            id_reservasi: id_reservasi
                        }
                    })

                    if (rejectReservasi) {
                        res.status(200).json({
                            success: true,
                            message: 'Reservation was successfully cancelled'
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Reservation was usuccessfully cancelled'
                        })
                    }
                }
            } else {
                const rejectReservasi = await Reservasi.update({
                    status: 'Canceled',
                    tanggal_reservasi: '',
                    jam_mulai: '',
                    jam_selesai: ''
                }, {
                    where: {
                        id_reservasi: id_reservasi
                    }
                })

                if (rejectReservasi) {
                    res.status(200).json({
                        success: true,
                        message: 'Reservation was successfully cancelled'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Reservation was usuccessfully cancelled'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Reservations cannot be cancelled'
            })
        }

    } else {
        res.status(400).json({
            success: false,
            message: 'Reservation data not found'
        })
    }
}
controllers.reject = reject

module.exports = controllers
const {
    response
} = require('express')
const Reservasi = require('../../models/reservasi')
const User = require('../../models/user')
const Meja = require('../../models/meja')
const controllers = {}
const DetailPesanan = require('../../models/detailPesanan')
const Menu = require('../../models/menu')
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken')
const {
    Op
} = require('sequelize');
const Pesanan = require('../../models/pesanan')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        const role = decoded.role;
        if (role == 0) {
            next();
        } else {
            return res.redirect('/login');
        }

    } catch (error) {
        return res.redirect('/login');
    }
};

const reservationHistoryView = async (req, res) => {
    try {
        const findUser = await User.findOne({
            id_user: req.session.id_user
        })

        if (!findUser) {
            return res.redirect('/login')
        }
        const user = findUser.username;
        res.render('admin/history/history', {
            user
        })
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.reservationHistoryView = [verifyToken, reservationHistoryView]

const allReservationData = async (req, res) => {
    const allReservation = await Reservasi.findAll()

    if (allReservation.length > 0) {
        const reservationPromises = allReservation.map(async (dataReservation) => {
            const findUser = await User.findByPk(dataReservation.id_user)
            const full_name = findUser.full_name;

            const findMeja = await Meja.findByPk(dataReservation.id_meja)
            const nomor_meja = findMeja.nomor_meja;

            return {
                id_reservasi: dataReservation.id_reservasi,
                id_meja: dataReservation.id_meja,
                nomor_meja: nomor_meja,
                id_user: dataReservation.id_user,
                full_name: full_name,
                tanggal_reservasi: dataReservation.tanggal_reservasi,
                jam_mulai: dataReservation.jam_mulai,
                jam_selesai: dataReservation.jam_selesai,
                jumlah_orang: dataReservation.jumlah_orang,
                status: dataReservation.status,
                keterangan: dataReservation.keterangan,
                created_at: dataReservation.created_at,
                updated_at: dataReservation.updated_at
            }

        })
        const data = await Promise.all(reservationPromises);
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
controllers.allReservationData = [verifyToken, allReservationData]

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
controllers.done =[verifyToken, done] 

const reject = async (req, res) => {
    const id_reservasi = req.params.id_reservasi

    const findReservasi = await Reservasi.findByPk(id_reservasi)
    if (findReservasi) {
        const reservationTime = findReservasi.jam_mulai;
        const [hour, minute, second] = reservationTime.split(':');
        const formattedReservationTime = `${hour}:${minute}:${second}`;

        const now = moment().tz('Asia/Jakarta');
        const jamNow = now.format('HH:mm');

        const timeAfterSubtraction = moment(formattedReservationTime, 'HH:mm').subtract(10, 'minutes').format('HH:mm');
        const timeAfterSubtraction2 = moment(formattedReservationTime, 'HH:mm').subtract(30, 'minutes').format('HH:mm');

        const dateReservation = findReservasi.tanggal_reservasi

        const nowDate = new Date();
        const year = nowDate.getFullYear();
        const month = String(nowDate.getMonth() + 1).padStart(2, '0');
        const day = String(nowDate.getDate()).padStart(2, '0');
        console.log('Tanggal sekarang:', `${year}-${month}-${day}`);
        const date = `${year}-${month}-${day}`

        const isTime1GreaterThanTime = moment(jamNow, 'HH:mm').isAfter(moment(timeAfterSubtraction, 'HH:mm'));
        const isTime1GreaterThanTime2 = moment(jamNow, 'HH:mm').isAfter(moment(timeAfterSubtraction2, 'HH:mm'));

        const isSameDate = dateReservation === date;
        console.log(timeAfterSubtraction)
        console.log(timeAfterSubtraction2)
        if (findReservasi.status == 'Reserved') {
            if (isSameDate || date < dateReservation) {
                if (isTime1GreaterThanTime2) {
                    if (isTime1GreaterThanTime) {
                        const keterangan = req.body.keterangan
                        if (!keterangan) {
                            res.status(400).json({
                                success: false,
                                message: 'Please fill in information about who is coming'
                            })
                        } else {
                            if (keterangan == 'Prioritas' || keterangan == 'prioritas') {
                                const rejectReservasi = await Reservasi.update({
                                    status: 'Canceled',
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
                            } else {
                                res.status(400).json({
                                    success: false,
                                    message: 'Reservation fails to be cancelled, cancellation must be 30 minutes before reservation time'
                                })
                            }
                        }

                    } else {
                        const rejectReservasi = await Reservasi.update({
                            status: 'Canceled',
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
                res.status(400).json({
                    success: false,
                    message: 'Reservations cannot be canceled because they have exceeded the reservation date'
                })
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
controllers.reject = [verifyToken, reject]

const editReservationView = async (req, res) => {
    res.render('admin/history/editHistory')
}
controllers.editReservationView = [verifyToken, editReservationView]

const getDetailReservasi = async (req, res) => {
    const id_reservasi = req.params.id_reservasi
    const findReservasi = await Reservasi.findByPk(id_reservasi)

    if (findReservasi) {
        const id_user = findReservasi.id_user
        const id_meja = findReservasi.id_meja
        const tanggal_reservasi = findReservasi.tanggal_reservasi
        const jumlah_orang = findReservasi.jumlah_orang
        const jam_mulai = findReservasi.jam_mulai
        const jam_selesai = findReservasi.jam_selesai
        const status = findReservasi.status

        const findUser = await User.findByPk(id_user)
        if (findUser) {
            const full_name = findUser.full_name

            const findMeja = await Meja.findByPk(id_meja)
            if (findMeja) {
                const nomor_meja = findMeja.nomor_meja
                const foto_meja = findMeja.foto_meja
                const jumlah_kursi = findMeja.jumlah_kursi

                const findAllMeja = await Meja.findAll()
                if (findAllMeja.length > 0) {
                    const dataNomorMeja = findAllMeja.map((Meja) => ({
                        nomor_meja: Meja.nomor_meja
                    }))

                    const dataPesanan = await Pesanan.findOne({
                        where: {
                            id_reservasi: id_reservasi
                        }
                    })
                    if (dataPesanan) {
                        const id_pesanan = dataPesanan.id_pesanan
                        const detailPesanan = await DetailPesanan.findAll({
                            include: {
                                model: Menu,
                                attributes: ['Nama_menu', 'harga_menu'],
                                as: 'DataMenu'
                            }, where: {
                                id_pesanan: id_pesanan
                            }
                        })

                        if (detailPesanan.length > 0) {
                            res.status(200).json({
                                success: true,
                                dataReservasi: {
                                    full_name: full_name,
                                    nomor_meja: nomor_meja,
                                    foto_meja: foto_meja,
                                    jumlah_kursi: jumlah_kursi,
                                    jumlah_orang: jumlah_orang,
                                    tanggal_reservasi: tanggal_reservasi,
                                    jam_mulai: jam_mulai,
                                    jam_selesai: jam_selesai,
                                    status: status
                                },
                                dataNomorMeja: dataNomorMeja,
                                dataPesanan: dataPesanan,
                                dataDetailPesanan: detailPesanan
                            })
                        }
                    } else {
                        res.status(200).json({
                            success: true,
                            dataReservasi: {
                                full_name: full_name,
                                nomor_meja: nomor_meja,
                                foto_meja: foto_meja,
                                jumlah_kursi: jumlah_kursi,
                                jumlah_orang: jumlah_orang,
                                tanggal_reservasi: tanggal_reservasi,
                                jam_mulai: jam_mulai,
                                jam_selesai: jam_selesai,
                                status: status
                            },
                            dataNomorMeja: dataNomorMeja
                        })
                    }


                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Table not Found'
                    })
                }

            } else {
                res.status(400).json({
                    success: false,
                    message: 'Table not Found'
                })
            }


        } else {
            res.status(400).json({
                success: false,
                message: 'User not Found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Reservation Data not Found'
        })
    }
}
controllers.getDetailReservasi = [verifyToken, getDetailReservasi]

const editReservation = async (req, res) => {
    const id_reservasi = req.params.id_reservasi
    const nomor_meja = req.body.nomor_meja

    const findReservasi = await Reservasi.findByPk(id_reservasi)

    if (findReservasi) {
        const statusReservasi = findReservasi.status

        if (findReservasi && statusReservasi == 'Completed') {
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
            if (!nomor_meja) {
                res.status(400).json({
                    success: false,
                    message: 'Complete The Empty Data Input'
                })
            } else {
                const getTglReservasi = await Reservasi.findByPk(id_reservasi)
                if (getTglReservasi) {
                    const tanggalSekarang = new Date();
                    tanggalSekarang.setHours(0, 0, 0, 0);

                    const tanggal_reservasi = getTglReservasi.tanggal_reservasi
                    const tanggal_Reservasi_objek = new Date(tanggal_reservasi)
                    const tanggal_reservasi_database = new Date(tanggal_Reservasi_objek.toISOString());
                    console.log(tanggal_reservasi_database)

                    const jam_mulai = getTglReservasi.jam_mulai

                    const getIdMeja = await Meja.findOne({
                        where: {
                            nomor_meja: nomor_meja
                        }
                    })

                    if (tanggalSekarang == tanggal_reservasi_database) {
                        if (getIdMeja) {
                            const id_meja = getIdMeja.id_meja
    
                            const findReservasi = await Reservasi.findOne({
                                where: {
                                    id_meja: id_meja,
                                    tanggal_reservasi: tanggal_reservasi_database,
                                    jam_mulai: jam_mulai
                                }
                            })
    
                            if (findReservasi) {
                                res.status(400).json({
                                    success: false,
                                    message: 'The table has been booked'
                                })
                            } else {
                                const keterangan = `Your reservation table has been moved to number ${nomor_meja}`
                                const updateReservasi = await Reservasi.update({
                                    id_meja: id_meja,
                                    keterangan: keterangan
                                }, {
                                    where: {
                                        id_reservasi: id_reservasi
                                    }
                                })
    
                                if (updateReservasi) {
                                    res.status(200).json({
                                        success: true,
                                        message: 'Reservation data updated successfully',
                                        keterangan: keterangan
                                    })
                                } else {
                                    res.status(400).json({
                                        success: true,
                                        message: 'Reservation data was not updated successfully'
                                    })
                                }
                            }
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Table not Found'
                            })
                        }
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Cannot change data, reservation date has passed'
                        })
                    }
                    
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Reservation Date not Found'
                    })
                }
            }
        }
    }
}
controllers.editReservation = [verifyToken, editReservation] 

const detailHistoryPesanan = async (req,res) => {
    const id_pesanan = req.params.id_pesanan
    const dataPesanan = await Pesanan.findOne({
        include: {
            model: User,
            attributes: ['full_name'],
            as: 'DataUser'
        },
        where: {
            id_pesanan:id_pesanan
        }
    })
    if (dataPesanan) {
        const detailPesanan = await DetailPesanan.findAll({
            include: {
                model: Menu,
                attributes: ['nama_menu', 'harga_menu'],
                as: 'DataMenu'
            }, 
            where: {
                id_pesanan:id_pesanan
            }
        })

        if (detailPesanan.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Order data found',
                dataPesanan: dataPesanan,
                dataDetailPesanan: detailPesanan
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Order data not found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Order data not found'
        })
    }
}
controllers.detailHistoryPesanan = [verifyToken, detailHistoryPesanan]

const dataPesanan = async (req,res) => {
    const semuaPesanan = await Pesanan.findAll({
        include: {
            model: User,
            attributes: ['full_name'],
            as: 'DataUser'
        },
        where: {
            id_reservasi: null
        }
    })
    if (semuaPesanan.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Order data found',
            dataPesanan: semuaPesanan
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Order data not found',
            dataPesanan: []
        })
    }
}
controllers.dataPesanan = [verifyToken, dataPesanan]

const historyReservationView = async (req,res) => {
    res.render('admin/history/detailHistory')
}
controllers.historyReservationView = [historyReservationView]

const pesananDetail = async (req,res) => {
    res.render('admin/history/historyMenuDetail')
}
controllers.pesananDetail = [pesananDetail]

const dataPesananView = async (req,res) => {
    res.render('admin/history/historyMenu')
}
controllers.dataPesananView = [dataPesananView]


module.exports = controllers

const {
    response
} = require('express')
const User = require('../../models/user')
const Meja = require('../../models/meja')
const Menu = require('../../models/menu')
const Pesanan = require('../../models/pesanan')
const DetailPesanan = require('../../models/detailPesanan')
const Reservasi = require('../../models/reservasi')
const controllers = {}
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.id_user;
        const role = decoded.role;
        if (role == 1) {
            next();
        } else {
            return res.redirect('/login');
        }

    } catch (error) {
        return res.redirect('/login');
    }
};

const tableUserView = async (req, res) => {
    try {
        const findUser = await User.findOne({
            id_user: req.session.id_user
        })

        if (!findUser) {
            return res.redirect('/login')
        }
        const user = findUser.username;
        res.render('users/table/table', {
            user
        })
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.tableUserView = [verifyToken, tableUserView]

const allTableData = async (req, res) => {
    const findAllTable = await Meja.findAll()

    if (findAllTable.length > 0) {
        const data = findAllTable.map((table) => ({
            id_meja: table.id_meja,
            nomor_meja: table.nomor_meja,
            foto_meja: table.foto_meja,
            jumlah_kursi: table.jumlah_kursi
        }))

        res.status(200).json({
            success: true,
            data: data
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Table data not found',
        })
    }
}
controllers.allTableData = allTableData

const reservationView = async (req, res) => {
    res.render('users/table/reservation')
}
controllers.reservationView = [verifyToken, reservationView]

const getTableReservation = async (req, res) => {
    const id_meja = req.params.id_meja

    const findTable = await Meja.findOne({
        where: {
            id_meja: id_meja
        }
    })

    if (findTable) {
        res.status(200).json({
            success: true,
            data: findTable
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Table data not found'
        })
    }
}
controllers.getTableReservation = getTableReservation

const getJam = async (req, res) => {
    const id_meja = req.params.id_meja
    const tanggal = req.body.tanggal_reservasi
    const tanggal_reservasi = new Date(`${tanggal}T00:00:00Z`);

    const id_user = req.session.id_user

    const findUser = await User.findByPk(id_user)
    if (findUser) {
        let jam = ['07.00.00', '07.45.00', '08.30.00', '09.45.00', '10.30.00', '11.45.00', '12.30.00', '13.45.00', '14.30.00', '15.45.00', '16.30.00', '17.45.00', '18.30.00']

        const findReservasi = await Reservasi.findAll({
            where: {
                tanggal_reservasi: tanggal_reservasi,
                id_meja: id_meja
            }
        })

        if (findReservasi.length > 0) {
            const data = findReservasi.map((allReservasi) => ({
                jam_mulai: allReservasi.jam_mulai
            }))

            const jam_mulai = data.map((jamMulai) => jamMulai.jam_mulai)

            const jamTidakSamaDenganJamMulai = jam.filter((jamItem) => !jam_mulai.includes(jamItem.replace(/\./g, ':')));

            res.status(200).json({
                status: 'beberapa',
                data: jamTidakSamaDenganJamMulai
            })

        } else {
            res.status(200).json({
                status: 'semua',
                data: jam
            })
        }
    } else {
        return res.redirect('/login')
    }

}
controllers.getJam = getJam

const addReservation = async (req, res) => {
    const id_meja = req.params.id_meja
    const jumlah_orang = req.body.jumlah_orang
    const tanggal = req.body.tanggal_reservasi
    const jam_mulai = req.body.jam_mulai

    const tanggalSekarang = new Date();
    tanggalSekarang.setHours(0, 0, 0, 0);

    const tanggal_reservasi = new Date(`${tanggal}T00:00:00Z`);

    const selectedDateTime = new Date(`${tanggal_reservasi}T${jam_mulai}`);
    const currentDateTime = new Date();

   if (!jumlah_orang || !tanggal || !jam_mulai) {
       res.status(400).json({
           success: false,
           message: 'Complete The Empty Data Input'
       })
   } else if (tanggal_reservasi < tanggalSekarang) {
       res.status(400).json({
           success: false,
           message: 'Reservation date should not be earlier than today',
       });
   } else if (selectedDateTime.getTime() <= currentDateTime.getTime()) {
        res.status(400).json({
            success: false,
            message: 'Reservation time should not be earlier than current time',
        });
    } else {
        const jamObj = new Date(`2000-01-01T${jam_mulai}`);
        jamObj.setMinutes(jamObj.getMinutes() + 30);
        const jam_selesai = jamObj.toTimeString().slice(0, 8);

        const jamReservasi = new Date(`2000-01-01T${jam_mulai}`);
        const jamSekarang = new Date();
 
        if (tanggal_reservasi === tanggalSekarang && jamReservasi < jamSekarang) {
            res.status(400).json({
                success: false,
                message: 'Reservation time should not be earlier than current time',
            });
        } else {
            const id_user = req.session.id_user
            
            const findUser = await User.findByPk(id_user)
            if (findUser) {
                const findMeja = await Meja.findOne({
                    where: {
                        id_meja: id_meja
                    }
                })
                const jumlah_kursi = findMeja.jumlah_kursi
                
                let minimum

                if (jumlah_kursi >= 2 && jumlah_kursi <= 4) {
                    minimum = 2
                } else if (jumlah_kursi >= 4){
                    minimum = 4
                }

                if (jumlah_orang > jumlah_kursi) {
                    res.status(400).json({
                        success: false,
                        message: 'The number of people exceeds the table capacity'
                    })
                } else if (jumlah_orang < minimum) {
                    res.status(400).json({
                        success: false,
                        message: 'The number of people should not be less than 0'
                    })
                } else {
                    const addDataReservasi = await Reservasi.create({
                        id_user: id_user,
                        id_meja: id_meja,
                        jumlah_orang: jumlah_orang,
                        tanggal_reservasi: tanggal_reservasi,
                        jam_mulai: jam_mulai,
                        jam_selesai: jam_selesai,
                        status: 'Reserved'
                    })

                    if (addDataReservasi) {
                        const id_reservasi = addDataReservasi.id_reservasi

                        let pesanan = {};
                        let total_harga = 0
                        const dataPesanan = req.body.data_pesanan
                        if (dataPesanan) {
                            if (!Array.isArray(dataPesanan)) {
                                res.status(400).json({
                                    success: false,
                                    message: 'Order data must be in an array'
                                })
                            } else {
                                const addPesanan = await Pesanan.create({
                                    id_user: id_user,
                                    id_reservasi: id_reservasi,
                                    total_harga: 0
                                })
                                if (addPesanan) {
                                    const id_pesanan = addPesanan.id_pesanan
                                    console.log(id_pesanan)

                                    for (const item of dataPesanan) {
                                        const {
                                            id_menu,
                                            jumlah
                                        } = item

                                        if (!pesanan[id_menu]) {
                                            pesanan[id_menu] = {
                                                jumlah: 0,
                                                total_harga_menu: 0,
                                                total_harga: 0
                                            };
                                        }

                                        pesanan[id_menu].jumlah += jumlah;

                                        const findMenu = await Menu.findByPk(id_menu)
                                        if (!findMenu) {
                                            res.status(400).json({
                                                success: false,
                                                message: 'Menu data not found'
                                            })
                                        } else {
                                            const total_harga_menu = findMenu.harga_menu * jumlah
                                            pesanan[id_menu].total_harga_menu += total_harga_menu
                                            total_harga += pesanan[id_menu].total_harga_menu
                                            pesanan[id_menu].total_harga += total_harga


                                            const addDetailPesanan = await DetailPesanan.create({
                                                id_pesanan: id_pesanan,
                                                id_menu: id_menu,
                                                jumlah: pesanan[id_menu].jumlah,
                                                total_harga_menu: pesanan[id_menu].total_harga_menu
                                            })
                                        }
                                    }
                                    const updatePesanan = await Pesanan.update({
                                        total_harga: total_harga
                                    }, {
                                        where: {
                                            id_pesanan: id_pesanan
                                        }
                                    })

                                    if (updatePesanan) {
                                        res.status(200).json({
                                            success: true,
                                            message: 'Your order has been successfully added'
                                        })
                                    } else {
                                        res.status(400).json({
                                            success: false,
                                            message: 'Your order was not added successfully'
                                        })
                                    }

                                } else {
                                    res.status(400).json({
                                        success: false,
                                        message: 'Order not successful'
                                    })
                                }

                            }
                        } else {
                            res.status(400).json({
                                success: false,
                                message: "You haven't ordered any yet"
                            })
                        }

                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Reservation Unseccessful'
                        })
                    }

                }
            } else {
                return res.redirect('/login')
            }
        }
    }

}
controllers.addReservation = [verifyToken,addReservation]

const getDetailMeja = async (req, res) => {
    id_meja = req.params.id_meja

    const findMeja = await Meja.findByPk(id_meja)
    if (findMeja) {
        res.status(200).json({
            success: true,
            message: 'Data Table Found',
            data: findMeja
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data Table not Found'
        })
    }
}
controllers.getDetailMeja = getDetailMeja





module.exports = controllers
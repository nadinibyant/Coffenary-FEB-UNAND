const {
    response
} = require('express')
const User = require('../../models/user')
const Menu = require('../../models/menu')
const Pesanan = require('../../models/pesanan')
const DetailPesanan = require('../../models/detailPesanan')
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

const addpesanan = async (req, res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        let pesanan = {};
        let total_harga = 0
        const dataPesanan = req.body
        if (dataPesanan) {
            if (!Array.isArray(dataPesanan)) {
                res.status(400).json({
                    success: false,
                    message: 'Order data must be in an array'
                })
            } else {
                const addPesanan = await Pesanan.create({
                    id_user: id_user,
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
            message: 'User not found'
        })
    }
}
controllers.addpesanan = [verifyToken, addpesanan]

const allPesanan = async (req, res) => {
    const id_user = req.session.id_user
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const findAllPesanan = await Pesanan.findAll({
            include: {
                model: User,
                as: 'DataUser'
            },
            where: {
                id_user: id_user,
                id_reservasi: null
            }
        })
        if (findAllPesanan.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Order data found',
                data: findAllPesanan
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
            message: 'user not found'
        })
    }

}
controllers.allPesanan = [verifyToken, allPesanan]

const pesananDetailUser = async (req, res) => {
    const id_pesanan = req.params.id_pesanan
    const findDetail = await DetailPesanan.findAll({
        include: [{
            model: Pesanan,
            as: 'DataPesanan'
        },
        {
            model: Menu,
            as: 'DataMenu'
        }],
        where: {
            id_pesanan: id_pesanan
        }
    })
    if (findDetail && findDetail.length > 0) {
        res.status(200).json({
            success: true,
            message: 'Order data found',
            data: findDetail
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Order data not found'
        })
    }
}
controllers.pesananDetailUser = [verifyToken, pesananDetailUser]

const cekHarga = async (req, res) => {
    let pesanan = {};
    let total_harga = 0
    const dataPesanan = req.body
    if (dataPesanan) {
        if (!Array.isArray(dataPesanan)) {
            res.status(400).json({
                success: false,
                message: 'Order data must be in an array'
            })
        } else {
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
                }
            }
            res.status(200).json({
                success: true,
                message: 'Price check successful',
                total_harga: total_harga
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: "You haven't ordered any yet"
        })
    }
}
controllers.cekHarga = [verifyToken,cekHarga]

const tampilMenuUser = async (req, res) => {
    try {
        const allMenu = await Menu.findAll()
        if (allMenu) {
            res.status(200).json({
                success: true,
                message: 'Menu data found',
                data: allMenu

            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Menu data not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}
controllers.tampilMenuUser = [verifyToken, tampilMenuUser]

const menuView = async (req,res) => {
    res.render('users/menu/menu')
}
controllers.menuView = [menuView]

const pesananDetail = async (req,res) => {
    res.render('users/history/historyMenuDetail')
}
controllers.pesananDetail = [pesananDetail]

module.exports = controllers
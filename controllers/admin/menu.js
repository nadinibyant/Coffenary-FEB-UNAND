const {
    response
} = require('express')
const controllers = {}
const jwt = require('jsonwebtoken')
const Menu = require('../../models/menu')
const multer = require('multer')
const path = require('path')
const {
    rmSync
} = require('fs')

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

const tampilMenu = async (req, res) => {
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
controllers.tampilMenu = [verifyToken, tampilMenu]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'img', 'menu'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.mimetype)) {
        const error = new multer.MulterError('File Type Not Allowed, Only JPEG dan PNG');
        error.message = 'File Type Not Allowed, Only JPEG dan PNG'
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const uploadd = upload.single('file')

const tambahMenu = async (req, res) => {
    try {
        const foto_menu = req.file
        const nama_menu = req.body.nama_menu
        const harga_menu = req.body.harga_menu

        if (!foto_menu || !nama_menu || !harga_menu) {
            res.status(400).json({
                success: false,
                message: 'Please complete the menu data'
            })
        } else {
            const findMenu = await Menu.findOne({
                where: {
                    nama_menu: nama_menu
                }
            })
            if (findMenu) {
                res.status(400).json({
                    success: false,
                    message: 'The menu name is already available'
                })
            } else {
                const addMenu = await Menu.create({
                    foto_menu: foto_menu.originalname,
                    nama_menu: nama_menu,
                    harga_menu: harga_menu,
                    status: 'Available'
                })
                if (addMenu) {
                    res.status(200).json({
                        success: true,
                        message: 'Menu data added successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Data menu tidak berhasil ditambahkan'
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }

}
controllers.tambahMenu = [verifyToken, uploadd, tambahMenu]

const editMenu = async (req, res) => {
    try {
        const id_menu = req.params.id_menu
        const findMenu = await Menu.findByPk(id_menu)
        if (findMenu) {
            const foto_menu = req.file || findMenu.foto_menu
            const nama_menu = req.body.nama_menu || findMenu.nama_menu
            const harga_menu = req.body.harga_menu || findMenu.harga_menu
            const status = req.body.status || findMenu.status

            if (nama_menu && nama_menu !== findMenu.nama_menu) {

                const findNamaMenu = await Menu.findOne({
                    where: {
                        nama_menu: nama_menu
                    }
                })

                if (findNamaMenu) {
                    res.status(400).json({
                        success: false,
                        message: 'A menu with that name has already been added'
                    })
                } else {
                    const updateMenu = await Menu.update({
                        foto_menu: foto_menu.originalname,
                        nama_menu: nama_menu,
                        harga_menu: harga_menu,
                        status: status
                    }, {
                        where: {
                            id_menu: id_menu
                        }
                    })

                    if (updateMenu) {
                        res.status(200).json({
                            success: true,
                            message: 'Menu data updated successfully'
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Menu data was not updated successfully'
                        })
                    }
                }
            } else {
                const updateMenu = await Menu.update({
                    foto_menu: foto_menu.originalname,
                    nama_menu: nama_menu,
                    harga_menu: harga_menu,
                    status: status
                }, {
                    where: {
                        id_menu: id_menu
                    }
                })
                if (updateMenu) {
                    res.status(200).json({
                        success: true,
                        message: 'Menu data updated successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Menu data was not updated successfully'
                    })
                }

            }
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
controllers.editMenu = [verifyToken, uploadd, editMenu]

const detailMenu = async (req, res) => {
    try {
        const id_menu = req.params.id_menu
        const findMenu = await Menu.findByPk(id_menu)
        if (findMenu) {
            res.status(200).json({
                success: true,
                message: 'Menu data found',
                data: findMenu
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
controllers.detailMenu = [verifyToken,detailMenu]

const hapusMenu = async (req, res) => {
    const id_menu = req.params.id_menu
    const findMenu = await Menu.findByPk(id_menu)
    if (findMenu) {
        const hapus = await Menu.destroy({
            where: {
                id_menu: id_menu
            }
        })

        if (hapus) {
            res.status(200).json({
                success: true,
                message: 'Menu data has been successfully deleted'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Menu data was not deleted successfully'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Menu data not found'
        })
    }
}
controllers.hapusMenu =[verifyToken, hapusMenu] 

module.exports = controllers
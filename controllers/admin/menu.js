const {
    response
} = require('express')
const controllers = {}
const jwt = require('jsonwebtoken')
const Menu = require('../../models/menu')
const multer = require('multer')
const path = require('path')

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

module.exports = controllers
const {
    response
} = require('express')
const User = require('../../models/user')
const controllers = {}
const multer = require('multer')
const bcrypt = require('bcrypt')
const path = require('path')
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

const profileView = async (req,res) => {
    res.render('users/profile/profile')
}
controllers.profileView = [verifyToken,profileView]

const getDataProfileUser = async (req, res) => {
    const id_user = req.session.id_user

    const findData = await User.findByPk(id_user)

    if (findData) {
        res.status(200).json({
            success: true,
            data: findData
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data not found'
        })
    }
}
controllers.getDataProfileUser = getDataProfileUser


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'img', 'profile'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('File Type Not Allowed');
        error.statusCode = 400;
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
const uploadd = upload.single('file')

const editProfileUser = async (req, res) => {
    const id_user = 3

    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const oldFullName = findUser.full_name
        const oldUsername = findUser.username
        const oldPhone = findUser.no_telp
        const oldEmail = findUser.email
        const oldPassword = findUser.password
        const oldFoto = findUser.foto


        const foto = req.file || oldFoto
        const full_name = req.body.full_name || oldFullName
        const username = req.body.username || oldUsername
        const no_telp = req.body.no_telp || oldPhone
        const email = req.body.email || oldEmail
        const password = req.body.password || oldPassword
        const confirm = req.body.confirm || oldPassword

        const findUsername = await User.findOne({
            where: {
                username: username
            }
        })

        if (password == confirm) {
            if (email == oldEmail) {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                if (foto == null) {
                    const updateProfile = await User.update({
                        full_name: full_name,
                        username: username,
                        no_telp: no_telp,
                        foto: foto,
                        password: hashedPassword
                    }, {
                        where: {
                            id_user: id_user
                        }
                    })

                    if (updateProfile) {
                        res.status(200).json({
                            success: true,
                            message: 'Data updated successfully'
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Account change did not work'
                        })
                    }
                } else {
                    const updateProfile = await User.update({
                        full_name: full_name,
                        username: username,
                        no_telp: no_telp,
                        foto: foto.originalname,
                        password: hashedPassword
                    }, {
                        where: {
                            id_user: id_user
                        }
                    })

                    if (updateProfile) {
                        res.status(200).json({
                            success: true,
                            message: 'Data updated successfully'
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            message: 'Account change did not work'
                        })
                    }
                }

            } else if (findUsername) {
                res.status(400).json({
                    success: false,
                    message: 'username is already in use'
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                const updateProfile = await User.update({
                    full_name: full_name,
                    username: username,
                    no_telp: no_telp,
                    foto: foto.originalname,
                    password: hashedPassword,
                    email: email
                }, {
                    where: {
                        id_user: id_user
                    }
                })

                if (updateProfile) {
                    res.status(200).json({
                        success: true,
                        message: 'Data updated successfully'
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Account change did not work'
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Password and confirm password don't match"
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'User not found'
        })
    }
}
controllers.editProfileUser = [uploadd, editProfileUser]


module.exports = controllers
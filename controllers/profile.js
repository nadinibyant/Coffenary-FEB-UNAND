const {
    response
} = require('express')
const User = require('../models/user')
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

const getDataProfile = async (req, res) => {
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
controllers.getDataProfile = getDataProfile

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', 'public', 'img', 'profile'));
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

const editProfile = async (req, res) => {
    const id_user = req.session.id_user

    const findUser = await User.findByPk(id_user)
    if (findUser) {
        const oldFullName = findUser.full_name
        const oldUsername = findUser.username
        const oldPhone = findUser.no_telp
        const oldEmail = findUser.email
        const oldPassword = findUser.password


        const file = req.file
        const fullName = req.body.fullName || oldFullName
        const username = req.body.username || oldUsername
        const phoneNumber = req.body.phoneNumber || oldPhone
        const email = req.body.email || oldEmail
        const password = req.body.password || oldPassword
        const confirm = req.body.confirm || oldPassword

        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })
        if (password == confirm) {
            if (email == oldEmail) {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                const updateProfile = await User.update({
                    full_name: fullName,
                    username: username,
                    no_telp: phoneNumber,
                    foto: file.originalname,
                    password: hashedPassword
                }, {
                    where:{
                        id_user : id_user
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
            } else if (findEmail) {
                res.status(400).json({
                    success: false,
                    message: 'email is already in use'
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                const updateProfile = await User.update({
                    full_name: fullName,
                    username: username,
                    no_telp: phoneNumber,
                    foto: file.originalname,
                    password: hashedPassword,
                    email: email
                }, {
                    where:{
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
controllers.editProfile = [uploadd,editProfile]

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "logging out of account didn't work",
            });
        }

        res.clearCookie('sessionID'); 
        return res.status(200).json({
            success: true,
            message: 'logout was successful',
        });
    });
}

controllers.logout = [verifyToken, logout]

module.exports = controllers
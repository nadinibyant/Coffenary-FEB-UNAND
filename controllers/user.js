const {
    response
} = require('express')
const User = require('../models/user')
const controllers = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginView = async (req, res) => {
    res.render('login')
}
controllers.loginView = loginView

const indexView = async (req, res) => {
    res.render('index')
}
controllers.indexView = indexView

const registerView = async (req, res) => {
    res.render('register')
}
controllers.registerView = registerView

const register = async (req, res) => {
    const fullName = req.body.fullName
    const username = req.body.username
    const phoneNumber = req.body.phoneNumber
    const email = req.body.email
    const password = req.body.password
    const confirm = req.body.confirm

    if (fullName && username && phoneNumber && email && password && confirm) {
        if (password == confirm) {
            const findEmail = await User.findOne({
                where: {
                    email: email
                }
            })

            const findPhoneNumber = await User.findOne({
                where: {
                    no_telp: phoneNumber
                }
            })

            if (findEmail) {
                res.status(400).json({
                    success: false,
                    message: 'Email Already Used'
                })
            } else if (findPhoneNumber) {
                res.status(400).json({
                    success: false,
                    message: 'Phone Number Already Used'
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                const addUser = await User.create({
                    full_name: fullName,
                    username: username,
                    password: hashedPassword,
                    email: email,
                    no_telp: phoneNumber,
                })

                if (addUser) {
                    res.status(200).json({
                        success: true,
                        message: "Account Registration Successful"
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Registration Was Unsuccessful"
                    })
                }
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Confirmation password does not match'
            })
        }

    } else if (!fullName || !username || !phoneNumber || !email || !password || !confirm) {
        res.status(400).json({
            success: false,
            message: 'Complete The Empty Data Input'
        })
    }
}
controllers.register = register

const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (email && password) {
        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if (findEmail) {
            const getpass = findEmail.password
            const id_user = findEmail.id_user

            bcrypt.compare(password, getpass, async (err, result) => {
                if (err || !result) {
                    res.status(400).json({
                        success: false,
                        message: 'Password Wrong'
                    })
                } else {
                    const token = jwt.sign({
                            id_user: id_user,
                            email
                        },
                        process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '2h'
                        }
                    );

                    req.session.id_user = id_user

                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 2 * 60 * 60 * 1000,
                    });

                    res.status(200).json({
                        message: 'Login Successful',
                        token: token,
                        success: true,
                        id_user: req.session.id_user
                    });
                }
            })

        } else {
            res.status(400).json({
                success: false,
                message: 'Email not found'
            })
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Complete The Empty Data Input'
        })
    }
}
controllers.login = login

module.exports = controllers
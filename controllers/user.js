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
    const full_name = req.body.full_name
    const username = req.body.username
    const no_telp = req.body.no_telp
    const email = req.body.email
    const password = req.body.password
    const confirm = req.body.confirm

    if (full_name && username && no_telp && email && password && confirm) {
        if (password == confirm) {
            const findEmail = await User.findOne({
                where: {
                    email: email
                }
            })

            const findUsername = await User.findOne({
                where: {
                    username: username
                }
            })

            const findPhoneNumber = await User.findOne({
                where: {
                    no_telp: no_telp
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
            } else if (findUsername) {
                res.status(400).json({
                    success: false,
                    message: 'Username Already Used'
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(password, salt)

                const addUser = await User.create({
                    full_name: full_name,
                    username: username,
                    password: hashedPassword,
                    email: email,
                    no_telp: no_telp,
                    role: 1
                })

                if (addUser) {
                    res.status(200).json({
                        success: true,
                        message: "Account Registration Successful",
                        data: addUser
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

    } else if (!full_name || !username || !no_telp || !email || !password || !confirm) {
        res.status(400).json({
            success: false,
            message: 'Complete The Empty Data Input'
        })
    }
}
controllers.register = register

const login = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (username && password) {
        const findUsername = await User.findOne({
            where: {
                username: username
            }
        })

        if (findUsername) {
            const role = findUsername.role
            console.log(role)
            if (role == 0) {
                const getpass = findUsername.password
                const id_user = findUsername.id_user

                bcrypt.compare(password, getpass, async (err, result) => {
                    if (err || !result) {
                        res.status(400).json({
                            success: false,
                            message: 'Password Wrong'
                        })
                    } else {
                        const token = jwt.sign({
                                id_user: id_user,
                                username
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
                            id_user: req.session.id_user,
                            role: 'admin'
                        });
                    }
                })
            } else {
                const getpass = findUsername.password
                const id_user = findUsername.id_user

                bcrypt.compare(password, getpass, async (err, result) => {
                    if (err || !result) {
                        res.status(400).json({
                            success: false,
                            message: 'Password Wrong'
                        })
                    } else {
                        const token = jwt.sign({
                                id_user: id_user,
                                username
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
                            id_user: req.session.id_user,
                            role: 'user'
                        });
                    }
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Username not found',
                role: ''
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
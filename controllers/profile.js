const {
    response
} = require('express')
const User = require('../models/user')
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

const profileView = async (req, res) => {
    res.render('admin/profile/profile')
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

const editProfile = async (req, res) => {
    const id_user = 9

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
        const confirm = req.body.confirm

        // jika mengisi confirm
        if (confirm) {

            //jika confirm == password
            if (confirm == password) {
                //jika dia isi username, dan tidak sama dengan username lama
                if (username && username !== oldUsername) {
                    //periksa apakah username ini sama dengan yang lain

                    const findUsername = await User.findOne({
                        where: {
                            username: username
                        }
                    })

                    //jika ditemukan
                    if (findUsername) {
                        res.status(400).json({
                            success: false,
                            message: 'Username is already in use'
                        })

                        // jika tidak ditemukan
                    } else {

                        //jika email diisi dan tidak sama dengan email lama
                        if (email && email !== oldEmail) {

                            //periksa apakah ada email yang sama?
                            const findEmail = await User.findOne({
                                where: {
                                    email: email
                                }
                            })

                            //jika ada
                            if (findEmail) {
                                res.status(400).json({
                                    success: false,
                                    message: 'Email is already in use'
                                })
                            } else {

                                //foto tidak diisi
                                if (foto == null) {
                                    const salt = bcrypt.genSaltSync(10)
                                    const hashedPassword = bcrypt.hashSync(password, salt)

                                    //update
                                    const updateProfile = await User.update({
                                        full_name: full_name,
                                        username: username,
                                        email: email,
                                        no_telp: no_telp,
                                        foto: foto,
                                        password: hashedPassword
                                    })

                                    //cek berhasil update
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

                                    // foto diiisi  
                                } else {
                                    const salt = bcrypt.genSaltSync(10)
                                    const hashedPassword = bcrypt.hashSync(password, salt)

                                    //update
                                    const updateProfile = await User.update({
                                        full_name: full_name,
                                        username: username,
                                        email: email,
                                        no_telp: no_telp,
                                        foto: foto.originalname,
                                        password: hashedPassword
                                    }, {
                                        where: {
                                            id_user: id_user
                                        }
                                    })

                                    //cek berhasil update
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
                            }
                        } else {
                            //foto tidak diisi
                            if (foto == null) {
                                const salt = bcrypt.genSaltSync(10)
                                const hashedPassword = bcrypt.hashSync(password, salt)

                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto,
                                    password: hashedPassword
                                }, {
                                    where: {
                                        id_user: id_user
                                    }
                                })

                                //cek berhasil update
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

                                // foto diiisi  
                            } else {
                                const salt = bcrypt.genSaltSync(10)
                                const hashedPassword = bcrypt.hashSync(password, salt)

                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto.originalname,
                                    password: hashedPassword
                                }, {
                                    where: {
                                        id_user: id_user
                                    }
                                })

                                //cek berhasil update
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
                        }
                    }
                } else {
                    //jika email diisi dan tidak sama dengan email lama
                    if (email && email !== oldEmail) {

                        //periksa apakah ada email yang sama?
                        const findEmail = await User.findOne({
                            where: {
                                email: email
                            }
                        })

                        //jika ada
                        if (findEmail) {
                            res.status(400).json({
                                success: false,
                                message: 'Email is already in use'
                            })
                        } else {

                            //foto tidak diisi
                            if (foto == null) {
                                const salt = bcrypt.genSaltSync(10)
                                const hashedPassword = bcrypt.hashSync(password, salt)

                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto,
                                    password: hashedPassword
                                }, {
                                    where: {
                                        id_user: id_user
                                    }
                                })

                                //cek berhasil update
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

                                // foto diiisi  
                            } else {
                                const salt = bcrypt.genSaltSync(10)
                                const hashedPassword = bcrypt.hashSync(password, salt)

                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto.originalname,
                                    password: hashedPassword
                                }, {
                                    where: {
                                        id_user: id_user
                                    }
                                })

                                //cek berhasil update
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
                        }
                    } else {
                        //foto tidak diisi
                        if (foto == null) {
                            const salt = bcrypt.genSaltSync(10)
                            const hashedPassword = bcrypt.hashSync(password, salt)

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto,
                                password: hashedPassword
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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

                            // foto diiisi  
                        } else {
                            const salt = bcrypt.genSaltSync(10)
                            const hashedPassword = bcrypt.hashSync(password, salt)

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto.originalname,
                                password: hashedPassword
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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
                    }
                }

                // jika confirm tidak sama password
            } else {
                res.status(400).json({
                    success: false,
                    message: "Password and confirm password don't match"
                })
            }

            //jika tidak mengisi confirm
        } else {
            //jika dia isi username, dan tidak sama dengan username lama
            if (username && username !== oldUsername) {
                //periksa apakah username ini sama dengan yang lain

                const findUsername = await User.findOne({
                    where: {
                        username: username
                    }
                })

                //jika ditemukan
                if (findUsername) {
                    res.status(400).json({
                        success: false,
                        message: 'Username is already in use'
                    })

                    // jika tidak ditemukan
                } else {

                    //jika email diisi dan tidak sama dengan email lama
                    if (email && email !== oldEmail) {

                        //periksa apakah ada email yang sama?
                        const findEmail = await User.findOne({
                            where: {
                                email: email
                            }
                        })

                        //jika ada
                        if (findEmail) {
                            res.status(400).json({
                                success: false,
                                message: 'Email is already in use'
                            })
                        } else {

                            //foto tidak diisi
                            if (foto == null) {
                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto,
                                })

                                //cek berhasil update
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

                                // foto diiisi  
                            } else {

                                //update
                                const updateProfile = await User.update({
                                    full_name: full_name,
                                    username: username,
                                    email: email,
                                    no_telp: no_telp,
                                    foto: foto.originalname,
                                }, {
                                    where: {
                                        id_user: id_user
                                    }
                                })

                                //cek berhasil update
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
                        }
                    } else {
                        //foto tidak diisi
                        if (foto == null) {
                            const salt = bcrypt.genSaltSync(10)
                            const hashedPassword = bcrypt.hashSync(password, salt)

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto,
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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

                            // foto diiisi  
                        } else {
                            const salt = bcrypt.genSaltSync(10)
                            const hashedPassword = bcrypt.hashSync(password, salt)

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto.originalname,
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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
                    }
                }
            } else {
                //jika email diisi dan tidak sama dengan email lama
                if (email && email !== oldEmail) {

                    //periksa apakah ada email yang sama?
                    const findEmail = await User.findOne({
                        where: {
                            email: email
                        }
                    })

                    //jika ada
                    if (findEmail) {
                        res.status(400).json({
                            success: false,
                            message: 'Email is already in use'
                        })
                    } else {

                        //foto tidak diisi
                        if (foto == null) {

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto,
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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

                            // foto diiisi  
                        } else {

                            //update
                            const updateProfile = await User.update({
                                full_name: full_name,
                                username: username,
                                email: email,
                                no_telp: no_telp,
                                foto: foto.originalname,
                            }, {
                                where: {
                                    id_user: id_user
                                }
                            })

                            //cek berhasil update
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
                    }
                } else {
                    //foto tidak diisi
                    if (foto == null) {
                        //update
                        const updateProfile = await User.update({
                            full_name: full_name,
                            username: username,
                            email: email,
                            no_telp: no_telp,
                            foto: foto,
                        }, {
                            where: {
                                id_user: id_user
                            }
                        })

                        //cek berhasil update
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

                        // foto diiisi  
                    } else {


                        //update
                        const updateProfile = await User.update({
                            full_name: full_name,
                            username: username,
                            email: email,
                            no_telp: no_telp,
                            foto: foto.originalname,
                        }, {
                            where: {
                                id_user: id_user
                            }
                        })

                        //cek berhasil update
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
                }
            }
        }
    } else {
        return res.redirect('/login')
    }
}
controllers.editProfile = [uploadd, editProfile]


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

const getNama = async (req, res) => {
    const id_user = 3
    const findUser = await User.findByPk(id_user)
    if (findUser) {
        res.status(200).json({
            success: true,
            message: 'Data User Found',
            username: findUser.username
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Data User not Found',
            nama_awardee: ''
        })
    }
}
controllers.getNama = getNama

module.exports = controllers
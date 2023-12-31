const {
    response
} = require('express')
const controllers = {}
const jwt = require('jsonwebtoken')
const Meja = require('../../models/meja')
const User = require('../../models/user')
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

const manageView = async (req, res) => {
    try {
        const findUser = await User.findOne({
            id_user: req.session.id_user
        })

        if (!findUser) {
            return res.redirect('/login')
        }
        const user = findUser.username;
        res.render('admin/manage/readTable', {
            user
        })
    } catch (error) {
        return res.redirect('/login')
    }
}
controllers.manageView = [verifyToken, manageView]

const addTableView = async (req, res) => {
     res.render('admin/manage/createTable')
}
controllers.addTableView = [verifyToken, addTableView]

const editTableView = async (req, res) => {
        res.render('admin/manage/editTable')
}
controllers.editTableView = [verifyToken, editTableView]

const allTableData = async (req, res) => {
    try{
        const allTable = await Meja.findAll()

        if (allTable.length > 0) {
            const data = allTable.map((dataTable) => ({
                id_meja: dataTable.id_meja,
                nomor_meja: dataTable.nomor_meja,
                foto_meja: dataTable.foto_meja,
                jumlah_kursi: dataTable.jumlah_kursi,
                created_at: dataTable.created_at,
                updated_at: dataTable.updated_at
            }))
    
            res.status(200).json({
                success: true,
                data: data
            })
            
        } else {
            res.status(400).json({
                success: false,
                message: 'Table data is not available'
            })
        }
    } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server Eror'
        });
    }  
}
controllers.allTableData = allTableData

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'img', 'meja'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

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

const addTable = async (req, res) => {
    const file = req.file
    const numberTable = req.body.numberTable
    const numberSeats = req.body.numberSeats

    if (file && numberTable && numberSeats) {
        const findTable = await Meja.findOne({
            where: {
                nomor_meja: numberTable
            }
        })

        if (findTable) {
            res.status(400).json({
                success: false,
                message: 'Table data already exists'
            })
        } else {
            const addData = await Meja.create({
                nomor_meja: numberTable,
                foto_meja: file.originalname,
                jumlah_kursi: numberSeats
            })

            if (addData) {
                res.status(200).json({
                    success: true,
                    message: 'Data added successfully',
                    data: addData
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data was not added successfully'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Complete The Empty Data Input'
        })
    }
}
controllers.addTable = [uploadd, addTable]

// get data table berdasarkan id meja
const getDataTable = async (req, res) => {
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
controllers.getDataTable = getDataTable

const editTable = async (req, res) => {
    const id_meja = req.params.id_meja

    const findTable = await Meja.findByPk(id_meja)

    if (findTable) {
        const oldNumberTable = findTable.nomor_meja
        const oldNumberSeats = findTable.jumlah_kursi
        const oldFile = findTable.foto_meja

        const numberTable = req.body.numberTable || oldNumberTable
        const numberSeats = req.body.numberSeats || oldNumberSeats
        const file = req.file || oldFile

        const findNumberTable = await Meja.findOne({
            where: {
                nomor_meja: numberTable
            }
        })

        if (numberTable == oldNumberTable) {
            const updateData = await Meja.update({
                nomor_meja: numberTable,
                foto_meja: file.originalname,
                jumlah_kursi: numberSeats
            }, {
                where: {
                    id_meja: id_meja
                }
            })

            if (updateData) {
                res.status(200).json({
                    success: true,
                    message: 'Table data updated successfully',
                })
            } else if (findNumberTable) {
                res.status(400).json({
                    success: false,
                    message: 'Data was not updated successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data was not updated successfully'
                })
            }
        } else if (findNumberTable) {
            res.status(400).json({
                success: false,
                message: 'Table number is already in use'
            })
        } else {
            const updateData = await Meja.update({
                nomor_meja: numberTable,
                foto_meja: file.originalname,
                jumlah_kursi: numberSeats
            }, {
                where: {
                    id_meja: id_meja
                }
            })

            if (updateData) {
                res.status(200).json({
                    success: true,
                    message: 'Table data updated successfully',
                })
            } else if (findNumberTable) {
                res.status(400).json({
                    success: false,
                    message: 'Data was not updated successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Data was not updated successfully'
                })
            }
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Table data not found'
        })
    }
}
controllers.editTable = [uploadd, editTable]

const deleteTable = async (req, res) => {
    const id_meja = req.params.id_meja

    try{
        const findTable = await Meja.findByPk(id_meja)
        if (findTable) {
            const delTable = await Meja.destroy({
                where: {
                    id_meja: id_meja
                }
            })
    
            if (delTable) {
                res.status(200).json({
                    success: true,
                    message: 'Data deleted successfully'
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'data was not deleted successfully'
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Data not found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
    
}
controllers.deleteTable = deleteTable

module.exports = controllers

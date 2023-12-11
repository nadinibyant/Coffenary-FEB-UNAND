const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/menu')

router.get('/dataMenu', controllers.tampilMenu)
router.post('/addMenu', controllers.tambahMenu)
router.post('/editMenu/:id_menu', controllers.editMenu)
router.get('/detailMenu/:id_menu', controllers.detailMenu)
router.delete('/deleteMenu/:id_menu', controllers.hapusMenu)

module.exports = router
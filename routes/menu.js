const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/menu')

router.get('/dataMenu', controllers.tampilMenu)
router.get('/createMenu', controllers.createView)
router.post('/addMenu', controllers.tambahMenu)
router.get('/editMenuView/:id_menu', controllers.editView)
router.post('/editMenu/:id_menu', controllers.editMenu)
router.get('/detailMenu/:id_menu', controllers.detailMenu)
router.delete('/deleteMenu/:id_menu', controllers.hapusMenu)
router.get('/manageMenu', controllers.manageView)


module.exports = router
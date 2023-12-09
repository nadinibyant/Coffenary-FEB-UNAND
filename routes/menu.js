const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/menu')

router.get('/dataMenu', controllers.tampilMenu)
router.post('/addMenu', controllers.tambahMenu)

module.exports = router
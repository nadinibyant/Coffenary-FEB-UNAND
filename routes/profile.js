const express = require('express')
const router = express.Router()
const controllers = require('../controllers/profile')

router.get('/profile', controllers.profileView)
router.get('/dataProfile', controllers.getDataProfile)
router.post('/editProfile', controllers.editProfile)
router.post('/logout', controllers.logout)
router.get('/getNama', controllers.getNama)

module.exports = router
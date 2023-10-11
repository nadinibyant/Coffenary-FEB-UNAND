const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin')

router.get('/admin-reservation-history', controllers.manageReservationHistory)
router.get('/reservation-history', controllers.allReservationData)

module.exports = router
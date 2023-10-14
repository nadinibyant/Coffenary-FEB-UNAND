const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/reservation')

router.get('/reservation-history', controllers.allReservationData)
router.get('/reservationAdmin', controllers.reservationHistoryView)
router.get('/done/:id_reservasi', controllers.done)
router.get('/reject/:id_reservasi', controllers.reject)

module.exports = router
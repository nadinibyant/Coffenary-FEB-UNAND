const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/reservation')

router.get('/reservationAdmin', controllers.reservationHistoryView)
router.get('/reservation-history', controllers.allReservationData)
router.get('/done/:id_reservasi', controllers.done)
router.get('/reject/:id_reservasi', controllers.reject)
router.get('/editReservationView/:id_reservasi', controllers.editReservationView)
router.get('/getDetailReservasi/:id_reservasi', controllers.getDetailReservasi)
router.post('/editReservation/:id_reservasi', controllers.editReservation)

module.exports = router
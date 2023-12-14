const express = require('express')
const router = express.Router()
const controllers = require('../controllers/admin/reservation')

//reservasi yg otomatis pasti ada pesanan
router.get('/reservationAdmin', controllers.reservationHistoryView)
router.get('/reservation-history', controllers.allReservationData)
router.get('/done/:id_reservasi', controllers.done)
router.get('/reject/:id_reservasi', controllers.reject)
router.get('/editReservationView/:id_reservasi', controllers.editReservationView)
router.post('/editReservation/:id_reservasi', controllers.editReservation)
router.get('/getDetailReservasi/:id_reservasi', controllers.getDetailReservasi)
router.get('/detailReservasiView/:id_reservasi', controllers.historyReservationView)


//pesanan aja
router.get('/pesananDetail/:id_pesanan', controllers.pesananDetail)
router.get('/detailPesanan/:id_pesanan', controllers.detailHistoryPesanan)
router.get('/allDataPesanan', controllers.dataPesananView)
router.get('/dataPesanan', controllers.dataPesanan)

module.exports = router 
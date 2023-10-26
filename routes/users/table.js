const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/table')

router.get('/table', controllers.tableUserView)
router.get('/allTable', controllers.allTableData)
router.get('/getDataReservationTable/:id_meja', controllers.getTableReservation)
router.get('/reservationTable/:id_meja', controllers.reservationView)
router.post('/getJam/:id_meja', controllers.getJam)
router.post('/addReservation/:id_meja', controllers.addReservation)
router.get('/getDetailMeja/:id_meja', controllers.getDetailMeja)

module.exports = router
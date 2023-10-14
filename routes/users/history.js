const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/history')

router.get('/historyUser', controllers.historyView)
router.get('/allDataHistory', controllers.allDataHistory)
router.get('/cancelReservation/:id_reservasi', controllers.cancelReservation)

module.exports = router
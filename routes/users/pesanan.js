const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/pesanan')

router.post('/pesanan', controllers.addpesanan)
router.get('/allPesanan', controllers.allPesanan)
router.get('/detailPesananUser/:id_pesanan', controllers.detailPesananUser)
router.post('/cekHarga', controllers.cekHarga)


module.exports = router
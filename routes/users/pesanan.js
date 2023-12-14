const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/pesanan')

router.post('/pesanan', controllers.addpesanan) 
router.get('/allPesanan', controllers.allPesanan) 
router.get('/pesananDetailUser/:id_pesanan', controllers.pesananDetailUser) 
router.get('/pesananDetailView/:id_pesanan', controllers.pesananDetail)
router.post('/cekHarga', controllers.cekHarga) 
router.get('/allMenuUser', controllers.tampilMenuUser) 
router.get('/menuUser', controllers.menuView) 

module.exports = router
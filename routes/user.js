const express = require('express')
const router = express.Router()
const controllers = require('../controllers/user')

router.get('/', controllers.indexView)
router.get('/register', controllers.registerView)
router.get('/login',controllers.loginView)
router.post('/register', controllers.register)
router.post('/login', controllers.login)

module.exports = router
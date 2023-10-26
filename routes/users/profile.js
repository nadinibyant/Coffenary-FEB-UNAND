const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/profile')

router.get('/profileView', controllers.profileView)

module.exports = router
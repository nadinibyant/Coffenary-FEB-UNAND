const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/users/profile')

router.get('/profileView', controllers.profileView)
router.get('/dataProfileUser', controllers.getDataProfileUser)
router.post('/editProfileUser', controllers.editProfileUser)

module.exports = router
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/table')

router.get('/manageTable', controllers.manageView)
router.get('/createTable', controllers.addTableView)
router.get('/editTable', controllers.editTableView)
router.get('/allTableData', controllers.allTableData)
router.post('/addTable', controllers.addTable)
router.get('/getDataTable/:id_meja', controllers.getDataTable)
router.post('/editTable/:id_meja', controllers.editTable)
router.delete('/deleteTable/:id_meja', controllers.deleteTable)

module.exports = router
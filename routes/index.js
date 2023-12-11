const user = require('./user')
const table = require('./table')
const profile = require('./profile')
const reservasi = require('./reservation')
const tableUser = require('./users/table')
const historyUser = require('./users/history')
const profileUser = require('./users/profile')
const pesananUser = require('./users/pesanan')
const menu = require('./menu')

const server = {}
server.user = user
server.table = table
server.profile = profile
server.reservasi = reservasi
server.tableUser = tableUser
server.historyUser = historyUser
server.profileUser = profileUser
server.menu = menu
server.pesananUser = pesananUser

module.exports = server
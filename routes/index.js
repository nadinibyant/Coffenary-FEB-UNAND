const user = require('./user')
const table = require('./table')
const profile = require('./profile')
const admin = require('./admin')

const server = {}
server.user = user
server.table = table
server.profile = profile
server.admin = admin

module.exports = server

const user = require('./user')
const table = require('./table')
const profile = require('./profile')

const server = {}
server.user = user
server.table = table
server.profile = profile

module.exports = server

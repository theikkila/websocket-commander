const PORT = process.env.port || 3000

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')

const app = express()
const server = http.createServer(app)
const io = require('socket.io').listen(server)

// const pub = redis.createClient()
// const sub = redis.createClient()

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Parse application/json
app.use(bodyParser.json())

// A mock to store groups to a static groups object
const groups = {
  1: {online: 5},
  2: {online: 3}
}

// Returns true or false if a group belongs to groups
const hasGroup = (group) => group in groups

// Listen on the connection event for incoming sockets and join them a specified room.
io.on('connection', (socket) => {
  socket.on('OPEN', (msg) => {
    socket.join(msg)
  })
})

// GET /api/v0/:groupId/users
// See how many group's users are online
app.get('/api/v0/:groupId/users', (req, res) => {
  const groupId = parseInt(req.params.groupId, 10)

  if(!hasGroup(groupId)) {
    res.json({online: 0})
  }
  res.json(groups[groupId])
})

// POST /api/v0/:groupId/command
// Send a COMMAND message to group's users
app.post('/api/v0/:groupId/command', (req,res) => {
  const groupId = req.params.groupId
  const command = req.body.command

  if(!hasGroup(groupId)) {
    res.json({ack: false})
  }

  // Convey command message to a specified group
  io.to(groupId).emit('COMMAND', command)

  res.json({ack: true})
})

// Uses either environment variable port or default 3000 if none declared
server.listen(PORT, () => {
  console.log('Express listening on port ' + PORT + '!')
})

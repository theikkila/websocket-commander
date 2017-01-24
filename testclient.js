

const socket = require('socket.io-client')('http://localhost:3000');


socket.on('connect', (c) => {
  socket.emit('OPEN', process.argv[2] || 'group1')
  console.log("Connection established")
})
socket.on('disconnect', (c) => {
  console.log("Connection disconnected:", c)
})


socket.on('COMMAND', (c) => {console.log("COMMAND", c)})

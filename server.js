const express = require('express')
const app = express()
const PORT = process.env.port || 3000

// A mock to store groups to a static array
const groups = {
  1: {online: 5},
  2: {online: 3}
}

// GET /api/v0/:groupId/users
// See how many group's users are online
app.get('/api/v0/:groupId/users', (req, res) => {
  const groupId = parseInt(req.params.groupId, 10)
  const hasGroup = (group) => group in groups

  if(!hasGroup(groupId)) {
    res.json({online: 0})
  }
  res.json(groups[groupId])
})

// POST /api/v0/:groupId/command
// Send a COMMAND message to group's users
//app.post('/api/v0/:groupId/command', (req,res) => {
//
//})

// Uses either environment variable port or default 3000 if none declared
app.listen(PORT, () => {
  console.log('Express listening on port ' + PORT + '!')
})

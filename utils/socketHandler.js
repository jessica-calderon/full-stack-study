var { server, app } = require('./expressHandler')

var io = require('socket.io')(server); // {cors: {origin: "http://localhost:3000", method: ["GET", "POST"]}}
const users = {}

io.on('connection', socket => {
console.log("New connection?");
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

module.exports = { io };
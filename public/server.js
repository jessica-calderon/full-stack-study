var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http, {cors: {origin: "http://localhost:3000", method: ["GET", "POST"]}});
var port = process.env.PORT || 8080;


const users = {}

io.on('connection', socket => {
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
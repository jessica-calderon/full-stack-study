/*
    socketHandler.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:55:08
    
    Description:
        Handles the socket server.
    
    Documentation:
        io = socket server object
*/


var { server } = require('./expressHandler')
const listenerManager = require('../subsystems/chat/listenerManager');

var io = require('socket.io')(server); // {cors: {origin: "http://localhost:3000", method: ["GET", "POST"]}}

io.on('connection', socket => {
  console.log("New connection?");
  // listenerManager.addSocket(socket);
  socket.on('new-message', (msg)=> {
    console.log(msg)
    io.emit('new-message', msg);
  })
  
})

module.exports = { io };
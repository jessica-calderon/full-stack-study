var { server } = require('./expressHandler')
const listenerManager = require('../subsystems/chat/listenerManager');

var io = require('socket.io')(server); // {cors: {origin: "http://localhost:3000", method: ["GET", "POST"]}}

io.on('connection', socket => {
  console.log("New connection?");
  listenerManager.addSocket(socket);
})

module.exports = { io };
/*
    listenerManager.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:52:03
    
    Description:
        Module for managing the listener sockets.
    
    Documentation:
        .addSocket(socket : socket) : void
        -> Adds the socket to the listener manager.
*/

const ListenerSocket = require('./classes/ListenerSocket');

let listenerSockets = [];

module.exports = { listenerSockets, 
    addSocket: function(socket) {
        let listenerSocket = new ListenerSocket(socket);

        listenerSockets.push(listenerSocket);

        socket.on('disconnect', () => {
            listenerSockets.splice(listenerSockets.indexOf(listenerSocket), 1);
            listenerSocket.destroy();
            console.log("Listener socket disconnected.");
        });
        
        socket.on("set-groupid", (groupId) => {
            listenerSocket.groupId = groupId;
        });
    }
}
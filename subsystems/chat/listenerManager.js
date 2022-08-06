
const ListenerSocket = require('./classes/ListenerSocket');

let listenerSockets = [];

module.exports = { listenerSockets, 
    addSocket: function(socket) {
        let listenerSocket = new ListenerSocket(socket);

        listenerSockets.push(listenerSocket);

        socket.on('disconnect', () => {
            listenerSockets.splice(listenerSockets.indexOf(listenerSocket), 1);
            listenerSocket.destroy();
        });
        
        socket.on("set-groupid", (groupId) => {
            listenerSocket.groupId = groupId;
            let group = groups.find(targetGroup => targetGroup.id == groupId); 
            if (!group) {
                console.log("Tried to connect to an invalid group ID, disconnecting.");
                socket.disconnect(0);
            }
        });
    }
}
/*
    ListenerSocket.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:17:43
    
    Description:
        module for constructing the listener socket class. Mainly used by the listener manager.

    Documentation:
        new ListenerSocket(socket : socket) : ListenerSocket

        Outbound message data:
            new-message = {
                owner : {user data},
                contentType : string
                content : string
            }
            user-joined = {user data}
            user-left = {user data}
*/

class ListenerSocket {
    socket;
    groupId;

    constructor(socket) {
        this.socket = socket;
    }

    destroy() { 
        this.socket.disconnect(0);
        this.groupId = null;
    }
}

module.exports = ListenerSocket;
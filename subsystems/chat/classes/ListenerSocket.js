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
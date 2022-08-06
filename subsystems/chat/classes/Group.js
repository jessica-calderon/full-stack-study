/*
    Group.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:17:16
    
    Description:
        Module for constructing the group class
    
    Documentation:
        new Group(title : string, memberLimit : number?, password : string?) : Group
*/

const { randomUUID } = require('crypto'); 
const { listenerSockets } = require('../listenerManager');

class Group {
    users = [];
    messages = []; 

    constructor(title, memberLimit, password) {
        this.title = title || "New group";
        this.memberLimit = memberLimit || 10;
        this.password = password;
        this.id = randomUUID();
    }

    #sendData(name, data) {
        for (let listener of listenerSockets) {
            if (listener.groupId == this.id) {
                listener.socket.emit(name, data);
            }
        }
    }

    userSentMessage(user, message) {
        this.messages.push(message);
        this.#sendData("new-message", message.export());
    }

    addUser(user) {
        this.users.push(user);
        user.group = this;
        this.#sendData("user-joined", user.export());
    }

    removeUser(user) {
        this.users.splice(this.users.indexOf(user), 1);
        user.group = null;
        this.#sendData("user-left", user.export());
    }

    export() {
        return {
            title: this.title,
            memberLimit: this.memberLimit,
            //password: this.password,
            id: this.id,
            users: this.users.map(user => user.export()),
            messages: this.messages.map(message => message.export())
        }
    }
}

module.exports = Group;
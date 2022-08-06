/*
    ActiveUser.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:15:39
    
    Description:
        module for constructing the active user class
    
    Documentation:
        new User(cookie : string) : User
*/

const Message = require("./Message");
const { randomUUID } = require('crypto'); 

// Active user class
class ActiveUser {
    openConnections = 1;
    socket;
    cookie;
    group;
    chatSessionCookie;
    id = 1;

    constructor(cookie) {
        this.cookie = cookie;
        this.joined = new Date();
        this.initialized = false;
        this.chatSessionCookie = randomUUID();
    }

    async init() { 
        this.initialized = true;
    }

    setGroup(group) {
        this.group = group;
    }

    sendMessage(content) {
        if (this.group) {
            let message = new Message(this, content)
            this.group.userSentMessage(this, message);
        } else {
            console.log("Tried to send message to user without group.");
        }
    }

    destroy() { 
        this.initialized = false;
        if (this.group) {
            this.group.removeUser(this);
        }
    }
    
    export() {
        return {
            //cookie: this.cookie, // DONT EXPORT COOKIE
            //joined: this.joined,
            id: this.id,
            //chatSessionCookie: this.id,
            initialized: this.initialized,
            groupId: this.group ? this.group.id : null,
            username: "TODO",
            avatarUrl: "TODO"
        }
    }
}

module.exports = ActiveUser;
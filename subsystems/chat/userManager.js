/*
    userManager.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:53:27
    
    Description:
        Module for managing the user instances at a high level.
    
    Documentation:
        .newUser(username : string, password : string) : User
            -> Creates a new user and returns it.

        .getUser(username : string) : User
            -> Returns the user with the given username.
*/

const ActiveUser = require("./classes/ActiveUser");

let users = []; //TODO: clean up this array to prevent mem leaks from destroyed users

module.exports = { users, 
    addUser: function(cookie) {
        let user = new ActiveUser(cookie);
        users.push(user);
        return user;
    },
    getUserByCookie: function(cookie) { // First check, if doesnt exist then create new user
        for (let index in users) {
            if (users[index].chatSessionCookie == cookie) {
                return users[index];
            }
        }
        return null;
    },
    getUserByDatabaseId: function(id) { //???
        //TODO: implement
    }
}
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
            if (users[index].cookie === cookie) {
                return users[index];
            }
        }
        return null;
    },
    getUserByDatabaseId: function(id) { //???
        //TODO: implement
    }
}
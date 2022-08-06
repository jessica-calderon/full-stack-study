let socket = null; //TODO: auto get URL because it wont be the heroku URL
let URL = "http://localhost:3001";

// User functions 
async function login(username, password) {
  return fetch(URL+'/api/user/login',
    {
      method: "POST",
    }
  ).then(res => res.status == 200)
  .catch(error => {
    console.error(error);
    return false
  });
}

async function logout() {
  return fetch(URL+'/api/user/logout',
    {
      method: "POST",
    }
  ).then(res => res.status == 200)
  .catch(error => {
    console.error(error);
    return false
  });
}

// Group functions

function _joinedGroup(groupData) {
  console.log("Joined group:", groupData);
  if (socket) {
    socket.disconnect();
  }
  socket = io();
  socket.emit("set-groupid", groupData.id);

  socket.on("new-message", (messageData) => {
    console.log("New message:", messageData)
  });

  socket.on("user-joined", (userData) => {
    console.log("User joined:", userData)
  });

  socket.on("user-left", (userData) => {
    console.log("User left:", userData)
  });

  console.log("Joined new group!")
}

async function createGroup() {
  return fetch(URL+'/api/group/create', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: "TEST!"})
  }).then((response) => response.json())
      .then((data) => {
        _joinedGroup(data);
        return true
      }).catch((error) => {
        console.error(error);
        return false
      });
}

async function joinGroup(id) {
  return fetch(URL+'/api/group/join', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({groupId: id})
  }).then((response) => response.json())
      .then((data) => {
        _joinedGroup(data);
        return true
      }).catch((error) => {
        console.error(error);
        return false
      });
}

async function getAllGroups() {
  return fetch(URL+'/api/group/all', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => response.json())
      .then((data) => {
        return data
      }).catch((error) => {
        console.error(error);
        return [];
      });
}

// chat functions

async function sendMessage(message) {
  return fetch(URL+'/api/chat/send', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({content: message})
  }).then((response) => {
    return response.status == 200
  }).catch((error) => {
    console.error(error);
    return false
  });
}

// Execute

async function init() { // Example of how to use the functions
  let loggedin = await login("test", "test")
  if (loggedin) {
    let groupCreated = await createGroup();
    if (groupCreated) {
      sendMessage("Hello world!");
    }
  }
}

init();
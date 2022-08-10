// Dependencies
// saving this socket logic for last (jc)
// const {server, app} = require('./utils/expressHandler');
// const socketHandler = require('./utils/socketHandler');

// console.log("Server starting...")

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const http = require("http");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const hour = 1000 * 60 * 60;

const sess = {
  secret: "Super secret secret",
  // log out after 6 hours
  cookie: { maxAge: hour * 6, },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers/"));
// route to use images folder in handlebars
app.use(express.static("images"));

// Route to display dynamic src images
app.get("/dashboard", (req, res) => {
  imageList = [];
  imageList.push({ src: "/logo.png", name: "logo" });
  imageList.push({ src: "/brand.png", name: "brand" });
  // imageList.push({ src: "icons/react.png", name: "react" });
  res.render("/dashboard", { imageList: imageList });
})

sequelize.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, function () {
    console.log("Now listening...");
  });
});

// You're killing me smalls

var io = require('socket.io')(server); //{cors: {origin: "http://localhost:3000", method: ["GET", "POST"]}}
const users = {}

io.on('connection', socket => {
console.log("New connection?");
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
});
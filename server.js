// Dependencies
// saving this socket logic for last (jc)
// const {server, app} = require('./utils/expressHandler');
// const socketHandler = require('./utils/socketHandler');

// console.log("Server starting...")

const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  // log out after 5 min inactivity
  //TODO edit max age, make it at least an hour or more....(jc)
  cookie: { maxAge: 300000 },
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

sequelize.sync({ force: true }).then(() => {
  app.listen(process.env.PORT || 3001, function () {
    console.log("Now listening...");
  });
});

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
app.get("/", (req, res) => {
  imageList = [];
  imageList.push({ src: "/logo.png", name: "logo" });
  imageList.push({ src: "/brand.png", name: "brand" });
  imageList.push({ src: "/black_logo.png", name: "black_brand" });
  res.render("/", { imageList: imageList });
})
app.get("/post", (req, res) => {
  imageList = [];
  imageList.push({ src: "/logo.png", name: "logo" });
  imageList.push({ src: "/brand.png", name: "brand" });
  imageList.push({ src: "/black_logo.png", name: "black_brand" });
  res.render("/post", { imageList: imageList });
})

sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, function () {
    console.log("Now listening...");
  });
});

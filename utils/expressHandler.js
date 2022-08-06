/*
    expressHandler.js
    Harrison L. (@Stratiz)
    Created on 08/06/2022 @ 05:53:52
    
    Description:
        Module to handle the express server.
    
    Documentation:
        server = the main server object
        app = the express app object
*/


// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const http = require('http');
const routes = require('../controllers');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')

const hbs = exphbs.create({});

// Sets up the Express App
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(cookieParser());
//app.use(session({ secret: 'keyboard cat', saveUninitialized: true, cookie: { }}))
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.use(express.static(path.join(__dirname, '../public'), {
  extensions: ['html', 'htm'],
  // potentially other options here
}));

app.use(routes)

// Starts the server to begin listening

server.listen(3001, () => {
    console.log(`Server listening on: http://localhost:${3001}`);
});

module.exports = { server, app };
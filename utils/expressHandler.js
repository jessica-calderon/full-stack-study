// moved these back to root server.js along with refactored socket handler on 8/6/22
// // Dependencies
// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const http = require('http');
// const routes = require('../controllers');

// const hbs = exphbs.create({});

// // Sets up the Express App
// const app = express();
// const server = http.createServer(app);
// const PORT = process.env.PORT || 3001;

// // Set Handlebars as the default template engine.
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.static(path.join(__dirname, '../public'), {
//   extensions: ['html', 'htm'],
//   // potentially other options here
// }));

// app.use(routes)

// // Starts the server to begin listening

// server.listen(3001, () => {
//     console.log(`Server listening on: http://localhost:${3001}`);
// });

// module.exports = { server, app };
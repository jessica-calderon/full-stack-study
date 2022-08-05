// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');

const hbs = exphbs.create({});

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html', 'htm'],
  // potentially other options here
}));

app.use(routes)

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});


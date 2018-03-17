// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const request = require('request');
var logger = require("morgan");
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// Set up the express app
const app = express();
const PORT = process.env.PORT || 3000

// Require the routes and use them
var routes = require('./routes/index');

// // Require the routes in our controllers js file
// require("./controllers/fetch.js")(app);
// require("./controllers/headline.js")(app);
// require("./controllers/note.js")(app);

// View Engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(logger("dev"));

// body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// app.use(bodyParser.text());


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', function() {
  console.error("MongoDB Connection Error.  Make sure MongoDB is running.");
});

// Import Routes
app.use('/', routes);


// Starts the express app
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
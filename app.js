// Requiring the dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var todoController = require('./controllers/todoController');

var app = express();

// Setting up the template engine
app.set('view engine', 'ejs');

// Loading bodyParser and cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Loading the static files
app.use(express.static('./public'));

// Fire up controllers
todoController(app);

// Listening
app.listen(3000, function() {
    console.log('To-do App running on port 3000...');
});

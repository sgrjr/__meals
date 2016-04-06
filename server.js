// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var graphqlHTTP = require('express-graphql');
var mongoose    = require('mongoose'); 
var schema    = require('./graphql');

var app = express();                 // define our app using express

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// GraphqQL server route
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true
})));

// Connect mongo database
mongoose.connect('mongodb://localhost/graphql');

// START THE SERVER
// ==
var server = app.listen(port, () => {
  console.log('Listening at port', server.address().port);
});
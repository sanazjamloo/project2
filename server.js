// MODUELS
// ====================================================
var express         = require('express');
var mongoose        = require('mongoose');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var hbs             = require('hbs');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var usersController = require('./controllers/users.js');
// pry                 = require('pryjs');
// ===================================================
//  MODELS
// ====================================================
var User = require('./models/user');
var Book = require('./models/book');
// ====================================================
// Instantiate a new Express app:
var app  = express();
// ====================================================
// MIDDLEWARE/ CONFIGURATION
// ====================================================
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.use('/users', usersController);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
console.log(User);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===================================================

// ROOT ROUTE
app.get('/', function(req, res){
  res.send("WELCOME TO MY BOOKWORMS CLUB!!! root route");
});


// Specify the Mongo database in server.js.
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/bookworm';
mongoose.connect(mongoURI);

// Save that connection to the database in a variable.
var db  =    mongoose.connection;

// Will log an error if db cant connect to MongoDB.
db.on('error', function(err){
  console.log(err);
});
// Will log the message below if it succefully connects.
db.once('open', function(){
  console.log("Database Has Been Connected!");
});

app.listen(process.env.PORT || 4000, function(){
  console.log("APP IS LISTENING TO PORT 4000");
});

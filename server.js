// MODUELS
// ====================================================
var express         = require('express');
var mongoose        = require('mongoose');
mongoose.Promise    = global.Promise;


var hbs             = require('hbs');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var usersController = require('./controllers/usersController.js');
var booksController = require('./controllers/booksController.js');
// pry                 = require('pryjs');
var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/bookworm';
mongoose.connect(mongoURI);
// ===================================================
// Instantiate a new Express app:
var app  = express();
// ====================================================
// MIDDLEWARE/ CONFIGURATION
// ====================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public')); //css
// app.use(logger('dev'));

app.set("view engine", "hbs");

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: false
}));
//  MODELS
// ====================================================
var User = require('./models/user.js');
var Book = require('./models/book.js');

// database
// ====================================================
// Specify the Mongo database in server.js.
// Save that connection to the database in a variable.
var db  =    mongoose.connection;
// Will log an error if db cant connect to MongoDB.
db.on('error', function(err){
  // console.log(err);
});
// Will log the message below if it succefully connects.
db.once('open', function(){
  console.log("Database Has Been Connected!");
});

// PASSPORT
// ====================================================
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ===================================================

// ROUTES
// ===================================================
app.use('/users', usersController);
app.use('/books', booksController);
//app.use('/',require('./controllers/usersController.js'));
//app.listen(3000);

// ROOT ROUTE
app.get('/', function(req, res){
  //res.send("WELCOME TO BOOKWORMS CLUB!!! root route");
  res.render('homepage');
});






app.listen(process.env.PORT || 4000, function(){
  console.log("APP IS LISTENING TO PORT 4000");
});

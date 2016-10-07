// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// ======================================================
// DUMMIE TEST ROUTE
router.get('/test', (req, res) => {
  res.send('test route is working!');
});

// USERS INDEX ROUTE
router.get('/', (req, res) => {
  User.find({}, function(err, users){
  res.render('users/index', {users: users})
  });
});

// USERS NEW ROUTE
router.get('/new', function(req, res){
  // res.send("New is working");
  res.render('users/new');
});
// USERS SHOW ROUTE
router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    // console.log(user);
    // res.send(user);
    res.render('users/show', {user: user});
  });
});

// USERS CREATE ROUTE
router.post('/', function(req,res){
  var User = new User({
    name: req.body.name,
    book: req.body.book,
  });
  user.save(function(err, user){
    // console.log(user);
    res.redirect('/users');
  });
});

// USERS EDIT ROUTE
router.get('/:id/edit', function(req, res){
  User.findById(req.params.id, function(err, user){
    res.render('users/edit', {user: user});
  });
});



// SIGN UP ROUTE/CREATE NEW USER
router.get('/signup', function(req, res) {
  User.register(new User(
    {username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render('signup');
      }
      res.redirect('/');
    });
});


//POST/LOG IN
router.get('/login', function(req, res) {
  console.log(req.session)
  res.render('users/login');
});
router.post('/login', passport.authenticate('local'), function(req, res){
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('users');
  });
});
// A LITTLE PROMISE LOGIC
var auth = function(req, res, next){
  if(!req.user || req.user._id !=req.params.id){
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
};
router.get(':id', function(req,res){
  var query = User.findById({_id: req.params.id})
  query.then(function(user){
    res.json(user)
  })
  .catch(function(err){
    res.json({message: 'nope' + err});
  });
});

// DESTROY THE SESSION WHEN A USER LOGS OUT
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
});


module.exports = router

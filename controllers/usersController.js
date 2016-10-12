// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// var Schema          = require('../models/book.js');
// var User = UserSchema;
// var Book = BookSchema;
var Book            = require('../models/book.js');
// ======================================================
// //  TEST ROUTE
// router.get('/test', (req, res) => {
//   res.send('test route is working!');f
// });

// USER SIGN UP ROUTE
router.post('/signup', function(req, res){
  User.register(
    new User({
      username: req.body.username,
      email: req.body.username,
      // createdAt: new Date()
    }),
    req.body.password,
    function(err, user){
      if (err)
        {
// console.log('Error is as I say:'+ err);
        return res.status(400).send('Could not register');
      }
        passport.authenticate('local')(req, res, function(){
          res.redirect('/');
        });
    })
});

// USER SIGN UP Page
router.get('/signup', function(req, res) {
  // res.send('registering');
  res.render('users/signup.hbs');
});

// USER LOG IN ROUTE
router.get('/login', function(req, res) {
  console.log(req.session)
  res.render('users/login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  var user = {username: "derek"};
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.render('users/index', {user: user} );
  });
});

// router.get('/', function(req, res){
//   // res.send("WELCOME TO BOOKWORMS CLUB!!! root route");
//   res.render('homepage')
// });

// router.post('/signup', function(req, res) {
//   User.register(new User({
//      username: req.body.username}),
//     req.body.password, function(err, user) {
//       if (err) {
//         return res.json({user:user});
//       }
//         res.redirect('users/login');
//     });
// });

// LOG OUT ROUTE
router.get('/logout', function(req, res) {
  // console.log('logged out: ' + req.user);
  req.logout();
  res.redirect('/');
});

// if unauthorized
var authenticate = function(req, res, next) {
  if (!req.user || req.user.id != req.params.id) {
    res.json({status: 401, message: 'unauthorized'})
  } else {
    next()
  }
}






module.exports = router;

// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// ======================================================

// USERS INDEX ROUTE
router.get('/', (req, res) => {
  console.log('session', req.session)
  console.log('req.user', req.user)
  res.render('users/index', {user: req.user})
});

router.get('/test', (req, res) => {
  res.send('test route is working!');
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
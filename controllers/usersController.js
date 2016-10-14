// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// var Schema          = require('../models/book.js');
var Book            = require('../models/book.js');
// ======================================================
// //  TEST ROUTE
// router.get('/test', (req, res) => {
//   res.send('test route is working!');f
// });

//localhost:4000/users/
// [X] USER SIGN UP
// [X] USER login
// [X] USER LOGOUT
// [X] USER PROFILE PAGE (index/:id)
// [] CREATE NEW BOOK
// [] UPDATE SPECIFIC BOOK
// [] DELETE THIS BOOK

// USER HOME Page
//GET to localhost:4000/users/index
router.get('/index/:id', function(req, res){
  console.log(req.params.id);
  //Find the user and send the entire user object
  User.findById(req.params.id, function(err, user){
    console.log("This is the user ", user);
    //render the user-home.hbs Page
    res.render('users/index', {user: user})
  });
});


// USER SIGN UP ROUTE
//POST to localhost:4000/users/signup
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


// LOG IN ROUTE
router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/users/index/'+req.user._id);
  });
});


router.get('/login', function(req, res){
  console.log(req.session)
  res.render('/users')
});

//==============================
// CREATE NEW BOOK - POST
//===============================
//localhost:4000/users/new
// [] index.hbs form complete
// [] saving this book to the database
// [] render index.hbs
router.post('/new', function(req, res){
  //redirect back to the same view
  // var newBook = new Book [
  //   title: req.body.title,
  //   author: req.body.author,
  //   ISBN: req.body.ISBN,
  //   memo: req.body.memo
  // ]
  //first we create new book
  //then we have to find the user using the req.body.userId
  //then we have to add the new book to the users book array
User.findById(id, function(err, user){
  console.log(user);
  user.books.push(newBook);

})



  res.redirect('/users/index')
});

//==============================
// EDIT BOOK - SHOW PAGE FOR THE FORM (GET REQUEST)
//===============================
router.get('/:userId/edit', function(req,res){
  // render the edit page
});


//==============================
// EDIT BOOK - POST REQUEST
//==============================
router.post('/:userId',function(req,res){

});

//==============================
// DELETE BOOK - POST REQUEST
//===============================
// router.post('SOMETHING???', function(req, res){
//   //delete the book I am viewing
// });


// router.get('/users/index/:id', function(req, res) {
//   var userId = req.params.id;
//   //find user by id
//
//   var user = User.findById(id, function(err, user){
//     userId = req.params.id;
//       console.log(user);
//   }),

  //res.render user.index
  //send user

//   res.render('user/index', {user : user})
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

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
    res.redirect('/users/index/' +req.user._id);
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
router.post('/:userId/new', function(req, res){
  //redirect back to the same view
  //user / book / new book
  User.findById(req.params.userId, function(err, user){
    console.log("Posting new book for user: ", user);
    var newBook = new Book ({
      title: req.body.title,
      author: req.body.author,
      ISBN: req.body.ISBN,
      memo: req.body.memo
    })
    newBook.save(function(err){
      if (err)
      res.send(err);
    })
    user.books.push(newBook);
    user.save(function(err){
      res.redirect('/users/index/' + user._id)
    })
  })//end new route
});

//==============================
// EDIT BOOK - SHOW PAGE FOR THE FORM (GET REQUEST)
//===============================
router.get('/:userId/edit', function(req,res){
  // render the edit page
  // res.send("is it working?")
  res.render('users/edit')
});


//==============================
// EDIT BOOK - POST REQUEST
//==============================
router.put('/:userId/edit/:id',function(req,res){
//User/data from the form /save the book
// console.log(req.params.userId, req.params.bookId);
var user = User.findById({id: req.params.userId});
var bookId = Book.findById({id: req.params.bookId});

   User.findByIdAndUpdate(req.params.user._id, {
       title: req.body.title,
       author: req.body.author,
       ISBN: req.body.ISBN,
       memo: req.body.memo,
   }, {new: true}, function(err, newBook) {
     res.redirect('/users/index/' + user._id);
   });
 });

//==============================
// DELETE BOOK - POST REQUEST
//===============================
//router.delete('/:userId/delete/:id', function(req, res){
router.delete('/:userId/delete/:id', function(req, res){
  //var bookId = Book.findById({id: req.params.bookId});
  //console.log(req.body);
  console.log('This is a test book ID is '+req.params.id);
User.findOne({_id:req.params.id}).exec()
.then(function(user){
  var item=user.books.id(req.params.id);
  item.remove();
  user.save();


 res.redirect('/users/index/'+ req.params.userId);


})
});


  //
  // Book.findByIdAndRemove(req.params.books, function(err, books){
  //     if (err) console.log('Here is the error:'+err);
  //   //$pull:{
    //  books: {_id: req.params._id}
    //   title: req.body.title,
    //   author: req.body.author,
    //   ISBN: req.body.ISBN,
    //   memo: req.body.memo,
//    }
//  },
//res.send('This is a test')
  //function(err) {

//  }
// });
// });

  // function(err, newBook) {
  //   if (err) console.log(err);
  //   console.log('Book Deleted');
    // res.redirect('/users/index' + user._id);

// );
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

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

router.get('/', function(req, res){
   /// Using Mongoose, Option 1
   Book.find({}).exec()
  .then(function(allBooks){
    var viewData = allBooks;
    //{
    // bookIndex: allBook,
    //  title: 'brows book',
    //  isLoggedIn: req.user? true : false
    //};
    // console.log(bookIndex);
    res.render('books/index', viewData);
  })
  .catch(function(err){
     console.log(err);
   })
});


// BOOKS NEW ROUTE
router.get('/new', function(req, res){
  // res.send("New is working");
  res.render('books/new');
});


router.post('/new', function(req, res){
  var userId = req.body.id;
  var book = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    memo: req.body.memo
  };
  //user.findbyid, create and add book to books array
  Book.create(book, function(err, oneBook){
    if (err) {console.log(err)}
    else {
      console.log(book);
      res.render('books/new');
    }
  })
});





//
// // USERS CREATE ROUTE
// router.post('/', function(req,res){
//   var User = new User({
//     name: req.body.name,
//     book: req.body.book,
//   });
//   user.save(function(err, user){
//     // console.log(user);
//     res.redirect('/users');
//   });
// });

// // USERS EDIT ROUTE
// router.get('/:id/edit', function(req, res){
//   User.findById(req.params.id, function(err, user){
//     res.render('users/edit', {user: user});
//   });
// });
//
// // USERS UPDATE ROUTE
// router.put('/:id', function(req, res){
//   User.findByIdAndUpdate(req.params.id,{
//     name: req.body.name
//   }, {new: true}, function(err, user){
//     res.render('users/show', {user:user});
//   });
// });
//
//
// // USERS DELETE ROUTE
// router.get('/:id/delete', function(req, res){
//   User.findByIdAndRemove(req.params.id, function(err, user){
//     res.redirect('/users');
//   });
// });
//
//
// // CREATE A NEW BOOK FOR A USER
// router.post('/:id/book', function(req, res){
//     User.findById(req.params.id, function(err, user){
//         author.book.push(new Book({body: req.body.newBook}))
//         user.save(function(err){
//             res.redirect(`/users/${user.id}`);
//         });
//     });
// });
//
// // REMOVE A BOOK FROM THE LIST
// router.delete('/:userId/book/:id', function (req, res){
//   User.findByIdAndUpdate(req.params.userId, {
//     $pull: {
//       book: {_id: req.params.id}
//     }
//   }, function(err) {
//     res.redirect(`/users/${req.params.userId}`);
//   });
// });
//
//
//
//
// // DESTROY THE SESSION WHEN A USER LOGS OUT
// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/users');
// });
























module.exports = router;

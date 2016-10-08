// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// ======================================================
// //  TEST ROUTE
// router.get('/test', (req, res) => {
//   res.send('test route is working!');
// });

// router.get('/', function(req, res){
//   res.send('you are here!');
// })


// SIGN UP ROUTE/REGISTER WITH AUTHENTICATION
//for Admin
router.post('/register', function(req, res) {
  // console.log(req.user);
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    function(err, user) {
      if (err)
        {
        return res.status(400).send('Could not register');
        }
        passport.authenticate('local')(req, res, function(){
          res.redirect('/');
          console.log(req.user);
        });
    });
});












// router.post('/signup', function(req, res){
//   res.send('this is users sign up')
//   User.register(
//     new User({
//       username: req.body.username,
//       email: req.body.email,
//     }),
//     req.body.password,
//     function(err, user){
//       if (err) {
//         return res.status(400).send("Could not register");
//       }
//       res.redirect('/');
//       console.log(req.user);
//     }
//   )
// });



// //POST/LOG IN
// router.get('/login', function(req, res) {
//   console.log(req.session)
//   res.render('users/login');
// });
// router.post('/login', passport.authenticate('local'), function(req, res){
//   req.session.save(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('users');
//   });
// });
//
// // // A LITTLE PROMISE LOGIC
// // var auth = function(req, res, next){
// //   if(!req.user || req.user._id !=req.params.id){
// //     res.json({status: 401, message: 'unauthorized'})
// //   } else {
// //     next()
// //   }
// // };
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// // USERS NEW ROUTE
// router.get('/new', function(req, res){
//   // res.send("New is working");
//   res.render('users/new');
// });
//
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
//
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
// // USERS SHOW ROUTE
// router.get('/:id', function(req, res){
//   User.findById(req.params.id, function(err, user){
//     // console.log(user);
//     // res.send(user);
//     res.render('users/show', {user: user});
//   });
// });
//
//
//
//
//
// router.get(':id', function(req,res){
//   var query = User.findById({_id: req.params.id})
//   query.then(function(user){
//     res.json(user)
//   })
//   .catch(function(err){
//     res.json({message: 'nope' + err});
//   });
// });
//
// // DESTROY THE SESSION WHEN A USER LOGS OUT
// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/users');
// });
//

module.exports = router

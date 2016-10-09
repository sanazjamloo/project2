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

// router.get('/', function(req, res){
//   res.send('you are here!');
// })


router.post('/login',
passport.authenticate('local', {failureRedirect: '/'}), function(req, res){
  req.session.save(function(err){
    if (err) {
      console.log('error is here');
      return next(err);}
    User.findOne({username: req.session.passport.user}).exec()
    .then(function(user) {
      console.log('success'+req.user);
      res.redirect(`/user/${user._id}`);
    })
    .catch(function(err) {
      console.log('ERROR fasilure: ', err);
    })
  })
});











router.post('/signup', function(req, res){
  console.log(req.user);
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
console.log('Error is as Arvin says:'+ err);
        return res.status(400).send('Could not register');
      }
        passport.authenticate('local')(req, res, function(){
          res.redirect('/');
          console.log(req.user);
        });
    })
});





// if unauthorized
// var authenticate = function(req, res, next) {
//   if (!req.user || req.user.id != req.params.id) {
//     res.json({status: 401, message: 'unauthorized'})
//   } else {
//     next()
//   }
// } 


// Admin Sign Up page
router.get('/signup', function(req, res) {
  // res.send('registering');
  res.render('users/signup.hbs');
});



router.get('/', function(req, res){
  // res.send("WELCOME TO BOOKWORMS CLUB!!! root route");
  res.render('homepage')
});










  // console.log(req.user);

//   query.then(function(users) {
//     res.render('/homepage.hbs');
//   })
//   .catch(function(err) {
//     console.log(err)
//   });
// }); 







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






























// //LOG IN ROUTE
// router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
//   req.session.save(function(err) {
//     if (err) {return next(err);}
//     User.findOne({username: req.session.passport.user}).exec()
//     .then(function(user) {
//       console.log(req.user);
//       res.redirect('/');
//     })
//     .catch(function(err) {
//       console.log('ERROR: ', err);
//     })
//   })
// });



// LOG OUT ROUTE
router.delete('/signout', function(req, res) {
  console.log('logged out: ' + req.user);
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


router.post('/new', function(req, res){
  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    memo: req.body.memo
  })
  book.save(function(err, book){
    console.log(err)
    res.redirect('/new');
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

module.exports = router;

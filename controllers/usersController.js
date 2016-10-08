// MODULES
// ======================================================
var express         = require('express');
var router          = express.Router();
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user.js');
// ======================================================
// // DUMMIE TEST ROUTE
// router.get('/test', (req, res) => {
//   res.send('test route is working!');
// });

// USERS INDEX ROUTE
// router.get('/', (req, res) => {
//   // User.find({}, function(err, users){
//   res.render('users/index', {users: users})
//   //});
// });

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

// USERS UPDATE ROUTE
router.put('/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id,{
    name: req.body.name
  }, {new: true}, function(err, user){
    res.render('users/show', {user:user});
  });
});


// USERS DELETE ROUTE
router.get('/:id/delete', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    res.redirect('/users');
  });
});


// CREATE A NEW BOOK FOR A USER
router.post('/:id/book', function(req, res){
    User.findById(req.params.id, function(err, user){
        author.book.push(new Book({body: req.body.newBook}))
        user.save(function(err){
            res.redirect(`/users/${user.id}`);
        });
    });
});

// REMOVE A BOOK FROM THE LIST
router.delete('/:userId/book/:id', function (req, res){
  User.findByIdAndUpdate(req.params.userId, {
    $pull: {
      book: {_id: req.params.id}
    }
  }, function(err) {
    res.redirect(`/users/${req.params.userId}`);
  });
});


// SIGN UP ROUTE/REGISTER WITH AUTHENTICATION
router.post('/signup', function(req, res){
  console.log(req.body)
  User.signup(new User(
    {username: req.body.username}),
    req.body.password,
    function(err, user) {
      if (err) {
        // return res.json({user:user});
        return res.status(400).send("Could not register");
      } // end if
      passport.authenticate('local')(req, res, function(){
      res.redirect('/');
      console.log(req.user);
    });
  });
});




  // console.log('signup route');
  // User.signup(new User(
  //   {username: req.body.username }),
  //   req.body.password,
//     function(err, user) {
//      if (err) {
//        return res.status(400).send("Can not register");
//        }
//      res.redirect('/');
//      });
// });


// userRouter.route('/signup')
// .get(function(req, res){
//   res.render('signup', {flash: req.flash('signupMessage')})
// })
// .post(passport.authenticate('local-signup',{
//   successRedirect: '/main',
//   failureRedirect: '/signup'
// }))











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

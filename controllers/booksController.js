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



// BOOKS NEW ROUTE
router.get('/new', function(req, res){
  // res.send("New is working");
  res.render('books/new');
});





module.exports = router;

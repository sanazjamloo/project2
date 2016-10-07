var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project2');

var Schema = require('./schema.js');

var User = Schema.User
var Book = Schema.Book

User.remove({}, function(err){
  console.log(err)
});
Book.remove({}, function(err){
  console.log(err)
});

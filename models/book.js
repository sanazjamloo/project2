var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema  = mongoose.Schema;
var ObjectId     = Schema.ObjectId;

  var bookSchema = new Schema({
  title: String,
  author: String,
  date: Date,
  ISBN: String,
  memo: String
});


bookSchema.plugin(passportLocalMongoose);
var Book = mongoose.model("Book", bookSchema);



module.exports = Book

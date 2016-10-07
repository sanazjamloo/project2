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

var Book = mongoose.model("Book", bookSchema);

bookSchema.plugin(passportLocalMongoose);

module.exports = Book

var mongoose     = require('mongoose');
// mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;
//
var UserSchema = new Schema({
  name: String,
  email: String,
  created_at: Date,
  updated_at: Date,
  password: String
});



var BookSchema = new Schema({
  title: String,
  author: String,
  date: Date,
  ISBN: String,
  memo: String
});


var User = mongoose.model("User", UserSchema);
var Book = mongoose.model("Book", BookSchema);

UserSchema.plugin(passportLocalMongoose);
BookSchema.plugin(passportLocalMongoose);

module.exports = {
  User: UserModel,
  Book: BookModel
}

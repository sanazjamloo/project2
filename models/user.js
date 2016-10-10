// Plugin passport-local Mongoose into User schema
var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema       = mongoose.Schema;
//var ObjectId     = Schema.ObjectId;

// var User       = new Schema({})
var userSchema = new Schema({
  username: String,
  email: String,
  // created_at: Date,
  // updated_at: Date,
  password: String
});

userSchema.plugin(require('passport-local-mongoose'));
// Connection between the user collection and the user schema
var User = mongoose.model('User', userSchema);



module.exports = User

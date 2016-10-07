// Plugin passport-local Mongoose into User schema
var mongoose              = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema       = mongoose.Schema;
var ObjectId     = Schema.ObjectId;

// var User       = new Schema({})
var userSchema = new Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  created_at: Date,
  updated_at: Date,
  password: String
});

userSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
// Connection between the user collection and the user schema
var User = mongoose.model("User", userSchema);

userSchema.plugin(passportLocalMongoose);

module.exports = User
